// api-interaction functions for fantasydata.com

const rp = require('request-promise'),
    config = require('./config.js');

function scheduleGrabber(roundId) {
    let options = {
        uri: `https://api.fantasydata.net/soccer/v2/json/Schedule/${roundId}`,
        headers: {
            'Ocp-Apim-Subscription-Key': config.API_KEY
        },
        json: true
        
    };
    
    return rp(options)
  .catch(error => {
    console.log(`error: ${error}`);
  });
}

exports.scheduleGrabber = scheduleGrabber;