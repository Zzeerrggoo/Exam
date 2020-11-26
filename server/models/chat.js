const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate({ Message }) {
      Chat.hasMany(Message, {
        foreignKey: 'chatId',
      });
    }
  }

  Chat.init({}, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};
