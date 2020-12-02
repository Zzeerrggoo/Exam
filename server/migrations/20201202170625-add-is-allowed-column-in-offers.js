module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('Offers',
    'isAllowed',
    { type: Sequelize.BOOLEAN, defaultValue: null }),

  down: async (queryInterface, Sequelize) => queryInterface.removeColumn(
    'Offers', 'isAllowed',
  ),
};
