function updateData(searchData, updateData, model) {
  return model.findOneAndUpdate(searchData, updateData, {new: true, upsert: true})
  .catch(error => {
    throw new Error(error);
  });
}

module.exports = {
  updateData
};