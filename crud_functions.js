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

exports.create = create;
exports.read = read;
exports.update = update;
exports.del = del;