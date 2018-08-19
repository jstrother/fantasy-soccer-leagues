function localeDate(dateString) {
  return new Date(Date.parse(dateString)).toLocaleDateString();
}

module.exports = {
  localeDate
};