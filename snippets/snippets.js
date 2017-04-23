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
			sampleFantasySchedule = require('../sample-fantasy-schedule.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fantasy-league');

mongoose.connection.on('error', err => {
	console.error(`Could not connect.  Error: ${err}`);
});

// CRUD functions

const create = (model, data) => {
  model.create(data, (err, data) => {
    if (err || !data) {
      console.error(`Could not create: ${data}`);
      console.log(`Error: ${err}`);
      mongoose.disconnect();
      return;
    }
    console.log(`Created ${data}`);
    mongoose.disconnect();
 });
};

const read = (model, query) => {
  model.findOne(query, (err, query) => {
    if (err || !query) {
      console.error(`Could not read: ${query}`);
      console.log(`Error: ${err}`);
      mongoose.disconnect();
      return;
    }
    console.log(`Read ${query}`);
    mongoose.disconnect();
  });
};

const update = (model, query, newData) => {
  model.findOneAndUpdate(query, newData, (err, query) => {
    if (err || !query) {
      console.error(`Could not update: ${query}`);
      console.log(`Error: ${err}`);
      mongoose.disconnect();
      return;
    }
    console.log(`Updated ${query}`);
    mongoose.disconnect();
    });
};

const del = (model, query) => {
  model.findOneAndRemove(query, (err, query) => {
    if (err || !query) {
      console.error(`Could not delete: ${query}`);
      console.log(`Error: ${err}`);
      mongoose.disconnect();
      return;
    }
    console.log(`Deleted ${query}`);
    mongoose.disconnect();
  });
};

mongoose.connection.once('open', () => {
 // create(Player, samplePlayer);
 // read(Player, samplePlayer);
 update(Player, samplePlayer, {playerValue: 75});
 // del(Player, {playerFirstName: 'Jim'});
});