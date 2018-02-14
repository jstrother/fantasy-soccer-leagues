function updateData(searchData, updateData, model) {
  return model.findOneAndUpdate(searchData, updateData, {new: true, upsert: true})
  .catch(error => {
    throw new Error(error);
  });
}

function updateArrayData(searchData, field, updateData, model) {
  return model.findOneAndUpdate(searchData, {$push: {field: updateData}}, {new: true, upsert: true})
  .catch(error => {
    throw new Error(error);
  });
}

module.exports = {
  updateData,
  updateArrayData
};