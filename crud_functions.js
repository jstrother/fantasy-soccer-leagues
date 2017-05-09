// CRUD functions

const mongoose = require('mongoose');

const createData = (data, model) => {
  return model.create(data);
};

const readData = (data, model) => {
  return model.findOne(data);
};

const updateData = (data, updatedKey, updatedValue, model) => {
  return model.findOneAndUpdate(data, {$set: {updatedKey: updatedValue}}, {new: true});
};

const deleteData = (data, model) => {
  return model.findOneAndRemove(data._id);
};

exports.createData = createData;
exports.readData = readData;
exports.updateData = updateData;
exports.deleteData = deleteData;