let Type;

function typeSelector(schemaType) {
  switch (schemaType) {
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
}

function create(model) {
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
  }

  function read(model) {
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
  }

  function update(model, newData) {
    Type.findOneAndUpdate(model, {newData}, (err, model) => {
      if (err || !model) {
        console.error(`Could not update: ${model}`);
        console.log(`Error: ${err}`);
        mongoose.disconnect();
        return;
      }
      console.log(`Updated ${model}`);
      mongoose.disconnect();
      });
  }
  
  function del(model) {
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
  }

  exports.typeSelector = typeSelector();
  exports.create = create();
  exports.read = read();
  exports.update = update();
  exports.del = del();