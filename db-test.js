const mongoose = require('mongoose'),
			Player = require('./models/player_model.js');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');

mongoose.connection.on('error', err => {
    console.error('Could not connect.  Error:', err);
});

mongoose.connection.once('open', () => {
	console.log('player', player);
  const create = (playerUniqueID, playerName, playerURL, playerClub, playerPosition, playerStats, playerValue, playerSchedule) => {
  	let player = {
			playerUniqueID,
			playerName,
			playerURL,
			playerClub,
			playerPosition,
			playerStats: {
				gamesPlayed,
				gamesStarted,
				minutesPlayed,
				goals,
				assists,
				shotsTaken,
				shotsOnGoal,
				foulsCommitted,
				timesOffside,
				yellowCards,
				redCards
			},
			playerValue, // in millions of $$$'s
			playerSchedule
		};
  	Player.create(player, (err, player) => {
      if (err || !player) {
        console.error("Could not create player ", playerName);
        mongoose.disconnect();
        return;
      }
      console.log("Created player ", player.playerName);
      mongoose.disconnect();
   });
  };

	create(1, 'Jim Strother', `http://www.mlssoccer.com/players/${this.playerName}`, 'Seattle Sounders FC', 'Defender', {0,0,0,0,0,0,0,0,0,0,0}, 50, ['@ Portland', 'Vancouver']);
});