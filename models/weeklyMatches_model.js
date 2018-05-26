const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  
  weeklyMatchesSchema = Schema({
    _id: Schema.Types.ObjectId,
    roundNumber: Number,
    matches: [{type: Schema.Types.ObjectId, ref: 'FantasyMatch'}],
    datesToRun: Date
  }),
  
  WeeklyMatches = mongoose.model('WeeklyMatches', weeklyMatchesSchema);

module.exports = WeeklyMatches;