const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ User, Chat }) {
      Message.belongsTo(User);
      Message.belongsTo(Chat);
    }
  }

  Message.init({
    userId: DataTypes.INTEGER,
    chatId: DataTypes.INTEGER,
    body: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
