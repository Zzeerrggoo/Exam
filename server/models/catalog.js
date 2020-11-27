const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate({ User, Chat, CatalogChat }) {
      Catalog.belongsTo(User, { foreignKey: 'userId' });
      Catalog.belongsToMany(Chat,
        { through: CatalogChat, foreignKey: 'catalogId', otherKey: 'chatId' });
    }
  }

  Catalog.init({
    catalogName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Catalog',
  });
  return Catalog;
};
