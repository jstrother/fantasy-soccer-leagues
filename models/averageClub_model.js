const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  
  averageClubSchema = Schema({
    _id: Schema.Types.ObjectId,
    averageClubName: String,
    averageClubManager: String,
    points: Number,
    wins: Number,
    draws: Number,
    losses: Number,
    goalsFor: Number,
    goalsAgainst: Number,
    goalDifferential: Number
  }),
  
  AverageClub = mongoose.model('AverageClub', averageClubSchema);

module.exports = AverageClub;