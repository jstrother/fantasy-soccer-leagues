// api-interaction functions for fantasydata.com

const jsdom = require('jsdom'),
    { JSDOM } = jsdom,
    { window } = new JSDOM(`<!DOCTYPE html>`),
    $ = require('jquery')(window),
    config = require('./config.js');

function scheduleGrabber(roundId) {
    let url = `https://api.fantasydata.net/soccer/v2/json/Schedule/${roundId}`;
    
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
            console.log('success', data);
        })
        .fail(error => {
            console.log('fail');
        });
    });
}

exports.scheduleGrabber = scheduleGrabber;