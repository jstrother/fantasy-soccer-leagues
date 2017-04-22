const mongoose = require('mongoose'),
			Player = require('./models/player_model.js'),
			Club = require('./models/club_model.js');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/players');

mongoose.connection.on('error', err => {
    console.error('Could not connect.  Error:', err);
});

mongoose.connection.once('open', () => {
  

	// create();
	// read();
	// update();
	// del();
});