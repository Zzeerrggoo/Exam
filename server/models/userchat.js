const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserChat extends Model {
    static associate({ User, Message }) {
      UserChat.hasMany(UserChat, { as: 'Interlocutor', foreignKey: 'chatId' });
      UserChat.belongsTo(User, { foreignKey: 'userId' });
      UserChat.hasMany(Message, { as: 'message', foreignKey: 'chatId' });
    }
  }

  UserChat.init({
    userId: {
      type: DataTypes.INTEGER, unique: 'userChat',
    },
    chatId: {
      type: DataTypes.INTEGER, unique: 'userChat',
    },
    isBlocked: DataTypes.BOOLEAN,
    isInBlackList: DataTypes.BOOLEAN,
    isFavorite: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'UserChat',
  });
  return UserChat;
};
