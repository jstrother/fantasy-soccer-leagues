const mongoose = require('mongoose'),
			playerSchema = require('../models/player_model.js'),
			scheduleSchema = require('../models/schedule_model.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');

mongoose.connection.on('error', err => {
	console.error(`Could not connect.  Error: ${err}`);
});

// moving schema into separate model files
mongoose.connection.once('open', () => {
				matchSchema = mongoose.Schema({
					matchUniqueID: {type: String, unique: true},
					homeClub: {type: String, unique: true},
					awayClub: {type: String, unique: true},
					homeScore: Number,
					awayScore: Number,
					matchDate: Date
				}),
				clubSchema = mongoose.Schema({
					clubName: {type: String, unique: true}, // taken from an array of player.playerClub
					clubRoster: {type: Array, unique: true}, // .push(player.playerUniqueID)
					matchDayList: {type: Function, unique: true}  // sorted out from schedule.masterMatchList
				}),
				userSchema = mongoose.Schema({
					userName: {type: String, unique: true},
					userPassword: String,
					fantasyClub: {type: Object, unique: true},
					fantasyLeague: String,
					fantasyDivision: String,
					fantasyChampsLeague: Boolean
				}),
				fantasyClub
				fantasyMatch = mongoose.Schema({
					matchUniqueID: {type: String, unique: true}
					homeClub: {type: String, unique: true},
					awayClub: {type: String, unique: true},
					homeScore: Number,
					awayScore: Number
				}),
				fantasyRegSeasonSchedule = mongoose.Schema({
					masterMatchList: {type: Array, unique: true}, // listed by fantasyMatch.matchUniqueID
					numRegSeasonMatches: Number
				}),
				fantasyLeagueCupSchedule = mongoose.Schema({
					masterMatchList: {type: Array, unique: true}, // listed by fantasyMatch.matchUniqueID
					roundTracker: Function
				}),
				fantasyChampsLeagueSchedule = mongoose.Schema({
					masterMatchList: {type: Array, unique: true}, // listed by fantasyMatch.matchUniqueID
					roundTracker: Function,
					groupStage: Boolean
				});
});