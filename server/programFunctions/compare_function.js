function compare(a, b) {
  if(a < b) {
    return 1;
  }
  if(a > b) {
    return -1;
  }
  if( a === b) {
    return 0;
  }
}

module.exports = compare;