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
    const userData = await setChatStatus({ isInBlackList: blackListFlag }, userId, chatId, t);
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

  try {
    const rawData = await UserChat.update({ isFavorite }, {
      where: { userId }, returning: true,
    });
    // CHECK FOR RETURNING DATA;
    const data = rawData[1][0].get({ plain: true });
    res.status(200).send({ data });
  } catch (err) {
    next(err);
  }
};
/// ///////////////////////////////////////////////////////////
