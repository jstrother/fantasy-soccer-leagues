// api-interaction functions for fantasydata.com

const $ = require('jquery')(require('node-jsdom').jsdom().parentWindow),
    config = require('./config.js');

function scheduleGrabber(roundId) {
    let url = `https://api.fantasydata.net/soccer/v2/json/Schedule/{$roundid}`;
    
    $(() => {
        $.ajax({
            url,
            beforeSend: xhrObj => {
                xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', config.API_KEY);
            },
            type: 'GET',
            data: '{body}'
        })
        .done(data => {
            console.log('success');
        })
        .fail(error => {
            console.log('fail');
        });
    });
}

exports.scheduleGrabber = scheduleGrabber;