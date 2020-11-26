const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {

  }

  Chat.init({}, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};
