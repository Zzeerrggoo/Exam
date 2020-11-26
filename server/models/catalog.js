const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate({ User }) {
      Catalog.belongsTo(User);
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
