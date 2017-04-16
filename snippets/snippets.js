const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');

mongoose.connection.on('error', err => {
	console.error(`Could not connect.  Error: ${err}`);
});

mongoose.connection.once('open', () => {
	const scheduleSchema = mongoose.Schema({
					masterMatchList: {type: Array, uniquie: true},
					numSeasonMatches: Number // simple .length
				}),
				playerSchema = mongoose.Schema ({
					playerUniqueID: {type: String, unique: true},
					playerName: {type: String, unique: true},
					playerClub: String,
					playerPosition: String,
					playerStatistics: Array,
					playerValue: Number, // in millions of $$$'s
					matchDayList: Function  // based off playerClub.matchDayList
				}),
				matchSchema = mongoose.Schema({
					matchUniqueID: {type: String, unique: true},
					homeClub: {type: String, unique: true},
					awayClub: {type: String, unique: true},
					homeScore: Number,
					awayScore: Number,
					matchDate: Date,
					totalPayroll: Number
				}),
				clubSchema = mongoose.Schema({
					clubName: {type: String, unique: true}, //
					clubRoster: {type: Array, unique: true}, // sorted out from player.playerClub
					matchDayList: {type: Function, unique: true}  // sorted out from schedule.masterMatchList
				}),
				userSchema = mongoose.Schema({
					userName: {type: String, unique: true},
					userPassword: String,
					fantasyClub: {type: String, unique: true},
					fantasyLeague: String,
					fantasyDivision: String,
					fantasyChampsLeague: Boolean
				}),
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