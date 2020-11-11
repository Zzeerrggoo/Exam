const bd = require('../models/index');
const CONSTANTS = require('../constants');

function getPredicateTypes(type) {
  return { [bd.Sequelize.Op.or]: type.split(',') };
}

module.exports.createWhereForAllContests = (
  typeIndex,
  contestId,
  industry,
  awardSort,
) => {
  const object = {
    where: {},
    order: [],
  };
  if (typeIndex) {
    Object.assign(object.where,
      { contestType: getPredicateTypes(typeIndex) });
  }
  if (contestId) Object.assign(object.where, { id: contestId });
  if (industry) Object.assign(object.where, { industry });
  if (awardSort) object.order.push(['prize', awardSort]);

  Object.assign(object.where, {
    status: {
      [bd.Sequelize.Op.or]: [
        CONSTANTS.CONTEST_STATUS_FINISHED,
        CONSTANTS.CONTEST_STATUS_ACTIVE,
      ],
    },
  });
  object.order.push(['id', 'desc']);
  return object;
};
