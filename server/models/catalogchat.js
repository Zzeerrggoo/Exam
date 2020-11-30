const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CatalogChat extends Model {
    static associate({ Catalog, Chat }) {
      CatalogChat.belongsTo(Catalog, { foreignKey: 'catalogId' });
      CatalogChat.belongsTo(Chat, { foreignKey: 'chatId' });
    }
  }

  CatalogChat.init({
    catalogId: {
      type: DataTypes.INTEGER,
      unique: 'catalogChat',
    },
    chatId: {
      type: DataTypes.INTEGER,
      unique: 'catalogChat',
    },
  }, {
    sequelize,
    modelName: 'CatalogChat',
  });
  return CatalogChat;
};
