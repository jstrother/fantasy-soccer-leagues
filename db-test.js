const mongoose = require('mongoose'),
			Player = require('./models/player_model.js');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/players');

mongoose.connection.on('error', err => {
    console.error('Could not connect.  Error:', err);
});

let player = {
	playerName: 'Jim Strother',
	playerURL: `http://www.mlssoccer.com/players/jim-strother`,
	playerClub: 'Seattle Sounders FC',
	playerPosition: 'Midfielder',
	gamesPlayed: 0,
	gamesStarted: 0,
	minutesPlayed: 0,
	goals: 0,
	assists: 0,
	shotsTaken: 0,
	shotsOnGoal: 0,
	foulsCommitted: 0,
	timesOffside: 0,
	yellowCards: 0,
	redCards: 0,
	playerValue: 50, // in millions of $$$'s
	playerSchedule: [
		'@ Portland',
		'Vancouver'
	]
};

mongoose.connection.once('open', () => {
	console.log('player', player);
  const create = player => {
  	Player.create(player, (err, player) => {
      if (err || !player) {
        console.error("Could not create player", player);
        console.log('Error:', err);
        mongoose.disconnect();
        return;
      }
      console.log("Created player", player);
      mongoose.disconnect();
   });
  };
  const read = player => {
    Player.findOne(player, (err, player) => {
        if (err || !player) {
            console.error("Could not read player", player);
    console.log('Error:', err);
            mongoose.disconnect();
            return;
        }
        console.log("Read player", player);
        mongoose.disconnect();
    });
	};
	const update = player => {
	    Player.findOneAndUpdate({playerName: 'Jim Strother'} ,player, (err, player) => {
	        if (err || !player) {
	            console.error("Could not update player", player);
	    console.log('Error:', err);
	            mongoose.disconnect();
	            return;
	        }
	        console.log("Updated player", player);
	        mongoose.disconnect();
	    });
	};
  const del = player => {
    Player.findOneAndRemove(player, (err, player) => {
        if (err || !player) {
            console.error("Could not delete player", player);
        console.log('Error:', err);
            mongoose.disconnect();
            return;
        }
        console.log("Deleted player", player);
        mongoose.disconnect();
    });
  };

	// create(player);
	// read({});
	update(player);
	// del(player);
});