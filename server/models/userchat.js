const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserChat extends Model {
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
