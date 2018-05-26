function save(item) {
  return item
  .save()
  .catch(error => {
    throw new Error(error);
  });
}

module.exports = {
  save
};