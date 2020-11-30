const { QueryTypes } = require('sequelize');
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

async function getChatInfo(chatId, userId, interlocutorId) {
  const userChat = await UserChat.findOrCreate({
    where: {
      chatId,
      userId,
    },
    returning: true,
  });
  const chatData = userChat[0].get({ plain: true });
  const interlocutor = await User.findOne({
    where: {
      id: interlocutorId,
    },
    attributes: {
      exclude: ['role', 'balance', 'password'],
    },
    raw: true,
  });

  return { chatData, interlocutor };
}

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

    const senderChatInfo = await getChatInfo(chatId, senderId, recipientId);
    const recipientChatInfo = await getChatInfo(chatId, recipientId, senderId);

    const newMessage = await Message.create({
      userId: senderId,
      chatId,
      body: messageBody,
    });
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

    const interlocutor = await User.findOne({
      where: {
        id: recipientId,
      },
      attributes: {
        exclude: ['role', 'balance', 'password'],
      },
      raw: true,
    });

    const data = { messages, interlocutor };
    res.status(200).send({ data });
  } catch (err) {
    next(err);
  }
};

async function setChatStatus(updateOptions, userId, chatId, t) {
  const rawData = await UserChat.update(updateOptions, {
    where: { userId, chatId }, returning: true, transaction: t,
  });

  return rawData[1][0].get({ plain: true });
}

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

async function addChatIntoCatalog(data) {
  const { catalogId, chatId } = data;
  await CatalogChat.findOrCreate({ where: { catalogId, chatId } });
}

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
    const catalogs = await sequelize.query(`
                      WITH cc AS (SELECT "catalogId", count(*) AS "chatNumber" 
                                  FROM "CatalogChats" GROUP BY "catalogId")
                      SELECT c.id, c."userId", c."catalogName", cc."chatNumber"
                      FROM "Catalogs" AS c
                               JOIN cc ON c.id = cc."catalogId"
                      WHERE c."userId" = ${userId}`,
    {
      plain: false,
      raw: false,
      type: QueryTypes.SELECT,
    });

    res.status(200).send({ data: catalogs });
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

/// ///////////////////////////////////////////////////////////

module.exports.changeCatalogName = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload;
    const { catalogName } = req.body;

    const catalog = await Catalog.update({ catalogName }, {
      where: { userId }, returning: true,
    });
    // CHECK FOR RETURNING DATA;
    const data = catalog[1][0].get({ plain: true });
    res.send({ data });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const { catalogId } = req.body;
    const { userId } = req.tokenPayload;
    await Catalog.destroy({ where: { id: catalogId, userId } });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const { userId } = req.tokenPayload;
    const { chatId } = req.body;
    const { catalogId } = req.body;

    await CatalogChat.destroy({ where: { chatId, catalogId } });
    const catalog = Catalog.findOne({
      where: {
        id: catalogId,
        userId,
      },
      raw: true,
    });

    res.status(200).send({ data: catalog });
  } catch (err) {
    next(err);
  }
};
