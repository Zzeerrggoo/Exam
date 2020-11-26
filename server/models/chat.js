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
      Chat.belongsToMany(Catalog, { through: CatalogChat });
      Chat.belongsToMany(User, { through: UserChat });
    }
  }

  Chat.init({}, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};
