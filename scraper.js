// scraper.js - pulls info from site for processing
// only needed for player, match, and schedule models

const scrape = require('scrape-it'),
	scheduleURL = 'https://www.mlssoccer.com/schedule?month=all&year=2017&club=select&club_options=9&op=Update&form_build_id=form-9Aex6ESUxF6RgJMLqz_Mfhbfd1R-np53jgjQfvkaujU&form_id=mp7_schedule_hub_search_filters_form',
	playersURL = '',
	playerStatsURL = 'https://www.mlssoccer.com/players/';

// scrape(scheduleURL, {
// 	matches: {
// 		listItem: '.row',
// 		data: {
// 			match_date: '.match_date',
// 			match_status: '.match_status',
// 			home_club: '.home_club .club_name a',
// 			home_score: '.home_club .match_score',
// 			away_club: '.vs_club .club_name a',
// 			away_score: '.vs_club .match_score'
// 		}
// 	}
// })
// .then(schedule => {
// 	console.log(schedule);
// });

for (i = 0; i < 21; i++) {
	scrape(`https://www.mlssoccer.com/players?page=${i}`, {
		players: {
			listItem: '.row',
			data: {
				playerName: '.name_link'
			}
		}
	})
	.then(schedule => {
		console.log(schedule);
	});
};