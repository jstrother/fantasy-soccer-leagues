// scraper.js - pulls info from site for processing
// only needed for player, match, and schedule models

const unirest = require('unirest');

unirest.get('http://www.mlssoccer.com').end(response => {
	console.log(`MLS Fetch Status: ${response.statusCode}`);
	console.log(`MLS Fetch Headers: ${response.headers}`);
	console.log(`MLS Fetch Body: ${response.body}`);
});