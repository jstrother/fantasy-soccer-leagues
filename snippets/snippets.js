const mongoose = require('mongoose'),
			Player = require('../models/player_model.js'),
			Schedule = require('../models/schedule_model.js'),
			Club = require('../models/club_model.js'),
			Match = require('../models/match_model.js'),
			User = require('../models/user_model.js'),
			FantasyClub = require('../models/fantasyClub_model.js'),
			FantasySchedule = require('../models/fantasySchedule_model.js'),
			FantasyMatch = require('../models/fantasyMatch_model.js'),
			samplePlayer = require('../sample-player.js'),
			sampleClub = require('../sample-club.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/');

mongoose.connection.on('error', err => {
	console.error(`Could not connect.  Error: ${err}`);
});

let Type;

const typeSelector = model => {
	switch (model.schemaType) {
		case 'Player':
			Type = Player;
			break;
		case 'Schedule':
			Type = Schedule;
			break;
		case 'Club':
			Type = Club;
			break;
		case 'Match':
			Type = Match;
			break;
		case 'User':
			Type = User;
			break;
		case 'FantasyClub':
			Type = FantasyClub;
			break;
		case 'FantasySchedule':
			Type = FantasySchedule;
			break;
		case 'FantasyMatch':
			Type = FantasyMatch;
	}
};

mongoose.connection.once('open', () => {
	const create = model => {
  	Type.create(model, (err, model) => {
      if (err || !model) {
        console.error(`Could not create: ${model}`);
        console.log(`Error: ${err}`);
        mongoose.disconnect();
        return;
      }
      console.log(`Created ${model}`);
      mongoose.disconnect();
   });
  };
  const read = model => {
    Type.findOne(model, (err, model) => {
      if (err || !model) {
        console.error(`Could not read: ${model}`);
        console.log(`Error: ${err}`);
        mongoose.disconnect();
        return;
      }
      console.log(`Read ${model}`);
	    mongoose.disconnect();
    });
	};
	const update = (model, field) => {
	  Type.findOneAndUpdate(model, {fields: field}, (err, model) => {
      if (err || !model) {
        console.error(`Could not update: ${model}`);
        console.log(`Error: ${err}`);
        mongoose.disconnect();
        return;
      }
      console.log(`Updated ${model}`);
      mongoose.disconnect();
	    });
	};
  const del = model => {
    Type.findOneAndRemove(model, (err, model) => {
      if (err || !model) {
      	console.error(`Could not delete: ${model}`);
        console.log(`Error: ${err}`);
  	    mongoose.disconnect();
	      return;
      }
      console.log(`Deleted ${model}`);
      mongoose.disconnect();
    });
  };
  const creating = model => {
  	typeSelector(model);
  	create(model);
  };
  const reading = model => {
  	typeSelector(model);
  	read(model);
  };
  const updating = (model, field) => {
  	typeSelector(model);
  	update(model, field);
  };
  const deleting = model => {
  	typeSelector(model);
  	del(model);
  };
  // creating(samplePlayer);
  // reading(samplePlayer);
  // updating(samplePlayer, samplePlayer.playerValue = 55);
  deleting(samplePlayer);
});