const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');

mongoose.connection.on('error', err => {
	console.error(`Could not connect.  Error: ${err}`);
});

mongoose.connection.once('open', () => {
	const scheduleSchema = mongoose.Schema({
			masterMatchList: {type: Array, uniquie: true},
			numSeasonMatches: {type: Number} // simple .length
		});

	const playerSchema = mongoose.Schema ({
		playerUniqueID: {type: String, unique: true},
		playerName: {type: String, unique: true},
		playerClub: {type: String} // reference to info scrapped from MLS
		playerPosition: {type: String},
		playerStatistics: {type: Array},
		matchDayList: {type: Function}  // based off playerClub.matchDayList
	});

	const matchSchema = mongoose.Schema({
		matchUniqueID: {type: String, unique: true},
		homeClub: {type: String, unique: true},
		awayClub: {type: String, unique: true},
		homeScore: {type: Number},
		awayScore: {type: Number}
	});

	const clubSchema = mongoose.Schema({
		clubName: {type: String, unique: true}, //
		clubRoster: {type: Array, unique: true}, // sorted out from player.playerClub
		matchDayList: {type: Function, unique: true}  // sorted out from schedule.masterMatchList
	});

	const userSchema = mongoose.Schema({
		userName: {type: String, unique: true},
		userPassword: {type: String},
		fantasyClub: {type: String, unique: true},
		fantasyLeague: {type: String},
		fantasyDivision: {type: String},
		fantasyChampsLeague: {type: Boolean}
	});
});