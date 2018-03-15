const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  
  weeklyMatchesSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    matches: [{type: Schema.Types.ObjectId, ref: 'FantasyMatch'}]
  }),
  
  WeeklyMatches = mongoose.model('WeeklyMatches', weeklyMatchesSchema);

module.exports = WeeklyMatches;