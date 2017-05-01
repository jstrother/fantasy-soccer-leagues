// CRUD functions

const create = (model, data) => {
  model.create(data, (err, data) => {
    errorCheck(err, query);
    console.log(`Created ${data}`);
    mongoose.disconnect();
 });
};

const read = (model, query) => {
  model.findOne(query, (err, query) => {
    errorCheck(err, query);
    console.log(`Read ${query}`);
    mongoose.disconnect();
  });
};

const update = (model, query, newData) => {
  model.findOneAndUpdate(query, newData, (err, query) => {
    errorCheck(err, query);
    console.log(`Updated ${query}`);
    mongoose.disconnect();
    });
};

const del = (model, query) => {
  model.findOneAndRemove(query, (err, query) => {
    errorCheck(err, query);
    console.log(`Deleted ${query}`);
    mongoose.disconnect();
  });
};

const errorCheck = (err, query) => {
  if (err || !query) {
    console.error(`Could not delete: ${query}`);
    console.log(`Error: ${err}`);
    mongoose.disconnect();
    return;
  }
};

exports.create = create;
exports.read = read;
exports.update = update;
exports.del = del;