const { QueryTypes } = require('sequelize');
const _ = require('lodash');
const controller = require('../socketInit');
const {
  User,
  Chat,
  Catalog,
  CatalogChat,
  Message,
  UserChat,
  Sequelize,
  sequelize,
} = require('../models');

function getUser(userId) {
  return User.findOne({
    where: {
      id: userId,
    },
    attributes: {
      exclude: ['role', 'balance', 'password'],
    },
    raw: true,
  });
}

async function getChatInfo(chatId, userId, interlocutorId) {
  const userChat = UserChat.findOrCreate({
    where: {
      chatId,
      userId,
    },
    returning: true,
  });
  const interlocutor = getUser(interlocutorId);

  const [chat, user] = await Promise.all([userChat, interlocutor]);
  const chatData = chat[0].get({ plain: true });
  return { chatData, interlocutor: user };
}

async function setChatStatus(updateOptions, userId, chatId, t) {
  const rawData = await UserChat.update(updateOptions, {
    where: { userId, chatId }, returning: true, transaction: t,
  });

  return rawData[1][0].get({ plain: true });
}

async function addChatIntoCatalog(data) {
  const { catalogId, chatId } = data;
  await CatalogChat.findOrCreate({ where: { catalogId, chatId } });
}

module.exports.getChatsPreview = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload;

    const conversations = await UserChat.findAll({
      where: { userId },
      order: [['chatId', 'DESC']],
      include: [
        {
          model: UserChat,
          as: 'Interlocutor',
          attributes: [],
          on: [
            { userId: { [Sequelize.Op.ne]: userId } },
            { chatId: { [Sequelize.Op.eq]: sequelize.col('UserChat.chatId') } },
          ],
          include: {
            model: User,
            attributes: {
              exclude: ['role', 'balance', 'password'],
            },
          },
          required: true,
        },
      ],
      raw: true,
      nest: true,
    });

    const chatsId = conversations.map((item) => item?.chatId);
    const preparedChatsIs = chatsId[0] ? chatsId : null;
    const previewMessages = await sequelize.query(`
            SELECT *
            FROM "Messages" AS m
            WHERE m."createdAt" IN (SELECT MAX("createdAt") AS "createdAt"
                                    FROM "Messages"
                                    WHERE "chatId" IN (${preparedChatsIs})
                                    GROUP BY "chatId")
            ORDER BY m."chatId" DESC;`, {
      plain: false,
      raw: false,
      type: QueryTypes.SELECT,
    });

    const data = {
      conversations: conversations.map((item, index) => {
        if (item?.chatId === previewMessages[index]?.chatId) {
          // eslint-disable-next-line no-param-reassign
          item.message = previewMessages[index];
        }
        return item;
      }),
    };

    res.status(200).send({ data });
  } catch (err) {
    next(err);
  }
};

module.exports.postNewMessage = async (req, res, next) => {
  const senderId = req.tokenPayload.userId;
  const recipientId = req.body.recipient;
  const tryChatId = req.body?.chatId ?? null;
  const { messageBody } = req.body;

  try {
    const chat = await Chat.findOrCreate({
      where: {
        id: tryChatId,
      },
    });
    const chatId = chat[0].dataValues.id;

    const promises = [];
    promises.push(getChatInfo(chatId, senderId, recipientId));
    promises.push(getChatInfo(chatId, recipientId, senderId));
    promises.push(Message.create({
      userId: senderId,
      chatId,
      body: messageBody,
    }));
    const [senderChatInfo, recipientChatInfo, newMessage] = await Promise.all(promises);
    const message = newMessage.get({ plain: true });

    controller.getChatController().emitNewMessage(recipientId, {
      message,
      ...recipientChatInfo,
    });

    res.status(201).send({
      data: {
        message,
        ...senderChatInfo,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  try {
    const recipientId = req.query.interlocutorId;
    const chatId = Number(req.params.chatId) || null;

    const messages = await Message.findAll({
      where: {
        chatId,
      },
      raw: true,
    });
    const interlocutor = await getUser(recipientId);
    const data = { messages, interlocutor };
    res.status(200).send({ data });
  } catch (err) {
    next(err);
  }
};

module.exports.setChatBlocked = async (req, res, next) => {
  const { userId } = req.tokenPayload;
  const { interlocutorId } = req.body;
  const { blackListFlag } = req.body;
  const { chatId } = req.params;

  const t = await sequelize.transaction();
  try {
    const userData = await setChatStatus({ isInBlackList: blackListFlag }, userId,
      chatId, t);
    const interlocutorData = await setChatStatus({ isBlocked: blackListFlag },
      interlocutorId, chatId, t);

    await t.commit();
    controller.getChatController()
      .emitChangeBlockStatus(interlocutorId, interlocutorData);

    res.status(200).send({ data: userData });
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

module.exports.setChatFavorite = async (req, res, next) => {
  const { userId } = req.tokenPayload;
  const isFavorite = req.body.favoriteFlag;
  const { chatId } = req.params;

  try {
    const data = await setChatStatus({ isFavorite }, userId, chatId);

    res.status(200).send({ data });
  } catch (err) {
    next(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  const { userId } = req.tokenPayload;
  const { catalogName } = req.body;
  const { chatId } = req.body;

  try {
    const newCatalog = await Catalog.create({ userId, catalogName });
    await addChatIntoCatalog({ chatId, catalogId: newCatalog.id });
    const data = { catalog: newCatalog };
    res.status(201).send({ data });
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload;
    const catalogs = await Catalog.findAll({
      where: { userId },
      include: [
        {
          model: CatalogChat,
          attributes: ['chatId'],
        },
      ],
      raw: true,
      nested: true,
    });

    const groupedData = _.groupBy(catalogs, 'id');
    const data = Object.values(groupedData).map((item) => {
      const catalog = _.omit(item[0], 'CatalogChats.chatId');
      catalog.chats = _.compact(
        item.map((chat) => chat['CatalogChats.chatId']),
      );
      return catalog;
    });

    res.status(200).send({ data });
  } catch (err) {
    next(err);
  }
};

module.exports.addChatToExistingCatalog = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload;
    const { catalogId } = req.body;
    const { chatId } = req.body;

    await addChatIntoCatalog({ catalogId, chatId });
    const catalog = await Catalog.findOne({ where: { userId, id: catalogId } });
    const data = { catalog };
    res.send({ data });
  } catch (err) {
    next(err);
  }
};

module.exports.changeCatalogName = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload;
    const { catalogName, catalogId } = req.body;

    const catalog = await Catalog.update({ catalogName }, {
      where: { userId, id: catalogId }, returning: true,
    });

    const chats = await catalog[1][0].getCatalogChats(
      { attributes: ['chatId'], raw: true },
    );
    const data = catalog[1][0].get({ plain: true });
    data.chats = _.compact(chats.map((item) => item.chatId));

    res.status(200).send({ data });
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload;
    const { chatId, catalogId } = req.params;

    await CatalogChat.destroy({ where: { chatId, catalogId } });
    const catalog = await Catalog.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });

    const chats = await catalog.getCatalogChats(
      { attributes: ['chatId'], raw: true },
    );
    const data = catalog.get({ plain: true });
    data.chats = _.compact(chats.map((item) => item.chatId));

    res.status(200).send({ data });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const { catalogId } = req.params;
    const { userId } = req.tokenPayload;
    await Catalog.destroy({ where: { id: catalogId, userId } });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
