const mongoose = require('mongoose'),

  playerSchema = mongoose.Schema({
    id: Number,
    commonName: String,
    fullName: String,
    firstName: String,
    lastName: String,
    position: String,
    picture: String,
    clubName: String,
    clubId: Number,
    clubLogo: String,
    stats: {
      shots: {
        shotsTotal: Number,
        shotsOnGoal: Number
      },
      goals: {
        scored: Number,
        conceded: Number,
        ownGoals: Number
      },
      fouls: {
        drawn: Number,
        committed: Number
      },
      cards: {
        yellowCards: Number,
        redCards: Number
      },
      passing: {
        totalCrosses: Number,
        crossesAccuracy: Number,
        passes: Number,
        passingAccuracy: Number
      },
      other: {
        assists: Number,
        offsides: Number,
        saves: Number,
        penaltiesScored: Number,
        penaltiesMissed: Number,
        penaltiesSaved: Number,
        tackles: Number,
        blocks: Number,
        interceptions: Number,
        clearances: Number,
        minutesPlayed: Number
      }
    },
    fantasyPoints: Number
  }),
  
  Player = mongoose.model('Player', playerSchema);

module.exports = Player;