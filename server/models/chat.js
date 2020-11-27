const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate({
      Message, Catalog, CatalogChat, User, UserChat,
    }) {
      Chat.hasMany(Message, {
        foreignKey: 'chatId',
      });
      Chat.belongsToMany(Catalog,
        { through: CatalogChat, foreignKey: 'chatId', otherKey: 'catalogId' });
      Chat.belongsToMany(User,
        { through: UserChat, foreignKey: 'chatId', otherKey: 'userId' });
    }
  }

  Chat.init({}, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};
