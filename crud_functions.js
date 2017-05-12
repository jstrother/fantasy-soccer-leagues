// CRUD functions

const createData = (data, model) => {
  return model.create(data);
};

const readData = (data, model) => {
  return model.findOne(data);
};

const updateData = (data, newData, model) => {
  return model.findOneAndUpdate(data, newData, {new: true});
};

const deleteData = (data, model) => {
  return model.findOneAndRemove(data);
};

exports.createData = createData;
exports.readData = readData;
exports.updateData = updateData;
exports.deleteData = deleteData;