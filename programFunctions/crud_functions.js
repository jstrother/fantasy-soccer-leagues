// CRUD functions

const createData = (data, model) => {
  return model.create(data)
  .catch(error => {
    console.log(`createData error: ${error}`);
  });
};

const readData = (data, model) => {
  return model.findOne(data)
  .exec()
  .catch(error => {
    console.log(`readData error: ${error}`);
  });
};

const updateData = (data, newData, model) => {
  return model.findOneAndUpdate(data, newData, {new: true})
  .catch(error => {
    console.log(`updateData error: ${error}`);
  });
};

const deleteData = (data, model) => {
  return model.findOneAndRemove(data)
  .catch(error => {
    console.log(`deleteData error: ${error}`);
  });
};

exports.createData = createData;
exports.readData = readData;
exports.updateData = updateData;
exports.deleteData = deleteData;