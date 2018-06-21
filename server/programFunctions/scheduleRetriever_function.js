const WeeklyMatches = require("../../models/weeklyMatches_model.js");

function scheduleRetriever() {
  return WeeklyMatches
  .find()
  .populate({
    path: 'matches',
    model: 'FantasyMatch',
    populate: {
      path: 'homeClub awayClub',
      model: 'FantasyClub'
    }
  })
  .catch(error => {
    throw new Error(error);
  });
}

module.exports = {
  scheduleRetriever
};