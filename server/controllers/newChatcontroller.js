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

/// ///////////////////////////////////////////////////////////
