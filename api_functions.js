// api-interaction functions for fantasydata.com

const rp = require('request-promise'),
    key = require('./config.js').API_KEY;

function scheduleGrabber(roundId) {
  let options = {
    uri: `https://api.fantasydata.net/soccer/v2/json/Schedule/${roundId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': key
    },
    json: true
  };
  
  return rp(options)
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

function playerGrabber() {
  
}

exports.scheduleGrabber = scheduleGrabber;
exports.playerGrabber = playerGrabber;