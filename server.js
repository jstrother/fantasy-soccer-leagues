// server.js

const path = require('path'),
			express = require('express'),
			bodyParser = require('body-parser'),
			mongoose = require('mongoose'),
			app = express(),
			server = require('http').Server(app),
			playersURL = 'http://www.mlssoccer.com/players?page=', // playersURL ends as it does so that a for loop from 0-20 can be used via concatenation, there are 30 players per page max
			config = require('./config.js');

app.use(bodyParser.json());
app.use(express.static('public'));
app.get('*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/index.html`));
});

console.log('Server Started');

let runServer = callback => {
	mongoose.connect(config.DATABASE_URL, err => {
		if (err && callback) {
			return callback(err);
		}
		app.listen(config.PORT, () => {
			console.log(`Listening on localhost: ${config.PORT}`);
			if (callback) {
				callback();
			}
		});
	});
};

if (require.main === module) {
	runServer(err => {
		if (err) {
			console.error(err);
		}
	});
};

exports.app = app;
exports.runServer = runServer;

// let scheduleGrabber = scheduleURL => {
// 	request(scheduleURL, (error, response, body) => {
// 		if (error) {
// 			console.log(`The following error was encountered: ${error}`);
// 		} else {
// 			// trying to catch the full schedule
// 			let $ = cheerio.load(body);
// 			this.schedule = $('schedule_list').html();

// 			for (i = 0; i <= 374; i++) {
// 				masterListMatches.push() // use newId function to create unique matcheIds, max length is set by the first count, when displaying schedule (general, team, and player) 
// 			};
// 		}
// 	})
// };