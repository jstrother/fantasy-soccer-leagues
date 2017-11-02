// CRUD functions

const createData = (data, model) => {
  return model.create(data)
  .catch(error => {
    throw new Error(error);
  });
};

const readData = (data, model) => {
  return model.findOne(data)
  .exec()
  .catch(error => {
    throw new Error(error);
  });
};

const updateData = (data, newData, model) => {
  return model.findOneAndUpdate(data, newData, {new: true, upsert: true})
  .catch(error => {
    throw new Error(error);
  });
};

const deleteData = (data, model) => {
  return model.findOneAndRemove(data)
  .catch(error => {
    throw new Error(error);
  });
};

module.exports = {
  createData,
  readData,
  updateData,
  deleteData
};