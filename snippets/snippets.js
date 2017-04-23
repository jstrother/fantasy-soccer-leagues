const mongoose = require('mongoose'),
			// model imports
			Player = require('../models/player_model.js'),
			Schedule = require('../models/schedule_model.js'),
			Club = require('../models/club_model.js'),
			Match = require('../models/match_model.js'),
			User = require('../models/user_model.js'),
			FantasyClub = require('../models/fantasyClub_model.js'),
			FantasySchedule = require('../models/fantasySchedule_model.js'),
			FantasyMatch = require('../models/fantasyMatch_model.js'),
			// sample imports
			samplePlayer = require('../sample-player.js'),
			sampleClub = require('../sample-club.js'),
			sampleMatch = require('../sample-match.js'),
			sampleSchedule = require('../sample-schedule.js'),
			sampleUser = require('../sample-user.js'),
			sampleFantasyClub = require('../sample-fantasy-club.js'),
			sampleFantasyMatch = require('../sample-fantasy-match.js'),
			sampleFantasySchedule = require('../sample-fantasy-schedule.js'),
			// crud functions
			typeSelector = require('../crud-file.js').typeSelector(),
			create = require('../crud-file.js').create(),
			read = require('../crud-file.js').read(),
			update = require('../crud-file.js').update(),
			del = require('../crud-file.js').del();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fantasy-league');

mongoose.connection.on('error', err => {
	console.error(`Could not connect.  Error: ${err}`);
});

mongoose.connection.once('open', () => {
  const creating = model => {
  	typeSelector(model.schemaType);
  	create(model);
  };
  const reading = model => {
  	typeSelector(model.schemaType);
  	read(model);
  };
  const updating = (model, newData) => {
  	typeSelector(model.schemaType);
  	update(model, newData);
  };
  const deleting = model => {
  	typeSelector(model.schemaType);
  	del(model);
  };
  // creating(samplePlayer);
  // reading(samplePlayer);
  // updating(samplePlayer, {playerValue: 75});
  // deleting(samplePlayer);
});