const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate({ Message, Catalog, CatalogChat }) {
      Chat.hasMany(Message, {
        foreignKey: 'chatId',
      });
      Chat.belongsToMany(Catalog, { through: CatalogChat });
    }
  }

  Chat.init({}, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};
