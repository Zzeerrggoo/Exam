const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate({ User, Chat, CatalogChat }) {
      Catalog.belongsTo(User);
      Catalog.belongsToMany(Chat, { through: CatalogChat });
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
