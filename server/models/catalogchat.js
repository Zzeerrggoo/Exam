const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CatalogChat extends Model {
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
