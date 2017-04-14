// server.js

const path = require('path'),
			express = require('express'),
			app = express(),
			server = require('http').Server(app),
			PORT = 8080,
			scheduleURL = 'http://www.mlssoccer.com/schedule?month=all&year=2017&club=select&club_options=9&op=Update&form_build_id=form-ORn_kjWBAHvfd2ahH5gk9xi5HZpp0OTYpCYHbemGCFs&form_id=mp7_schedule_hub_search_filters_form',
			playersURL = 'http://www.mlssoccer.com/players?page=',
			playerStatsURL = 'http://www.mlssoccer.com/players/';
// playersURL ends as it does so that a for loop from 0-20 can be used via concatenation
// playerStatsURL will have the player's name concatenated to the end of it

app.use(express.static('public'));
app.get('*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/index.html`));
});

console.log('Server Started');

let masterListMatches = []  // complete list of match Ids

 // let player = {
 // 	playerName: ,
 // 	playerClub,
 // 	playerPosition,
 //   playerStatistics,
 // 	matchDayList // this is an array of unique matchDayIDs
 // };

let scheduleGrabber = scheduleURL => {
	request(scheduleURL, (error, response, body) => {
		if (error) {
			console.log(`The following error was encountered: ${error}`);
		} else {
			// trying to catch the full schedule
			let $ = cheerio.load(body);
			this.schedule = $('schedule_list').html();

			for (i = 0; i <= 374; i++) {
				masterListMatches.push() // use newId function to create unique matcheIds, max length is set by the first count, when displaying schedule (general, team, and player) 
			};
		}
	})
};