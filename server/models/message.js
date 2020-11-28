const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ User, Chat, UserChat }) {
      Message.belongsTo(User, { foreignKey: 'userId' });
      Message.belongsTo(Chat, { foreignKey: 'chatId' });
      Message.belongsTo(UserChat, { foreignKey: 'chatId' });
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
