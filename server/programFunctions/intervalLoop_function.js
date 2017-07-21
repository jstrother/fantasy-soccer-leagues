const minLoopTime = require('../config.js').LEAGUE_LOOP_REPEAT_TIME;

function intervalLoop(loopFunction, loopArray, arrayKey, loopTime){
  if (loopArray && loopArray.length > 0) {
    console.log(loopArray.length);
    loopFunction(loopArray[arrayKey]);
    if (arrayKey < loopArray.length){
      console.log(`arrayKey before increment: ${arrayKey}`);
      arrayKey++;
      console.log(`arrayKey after increment: ${arrayKey}`);
      setTimeout(intervalLoop, loopTime, loopFunction, loopArray, arrayKey, loopTime);
      if (arrayKey === loopArray.length && loopTime < minLoopTime) {
      	let arrayKey = 0;
      	setTimeout(intervalLoop, loopTime, loopFunction, loopArray, arrayKey, loopTime);
      }
    }
  }
  else {
    console.log('Nothing assigned to array');
    return;
  }
}

module.exports = intervalLoop;