// scraper.js - pulls info from site for processing
// only needed for player and schedule models

const scrape = require('scrape-it'),
	scheduleURL = 'https://www.mlssoccer.com/schedule?month=all&year=2017&club=select&club_options=9&op=Update&form_build_id=form-9Aex6ESUxF6RgJMLqz_Mfhbfd1R-np53jgjQfvkaujU&form_id=mp7_schedule_hub_search_filters_form',
	playersURL = 'https://www.mlssoccer.com/players?page=',
	playerStatsURL = 'https://www.mlssoccer.com/players/',
	playerName = 'osvaldo-alonso'; //temporary until i can build the loop to iterate over player names in db

// MLS schedule scraper
function mlsScheduleScraper(url) {
	scrape(url, {
		matches: {
			listItem: '.row',
			data: {
				match_date: '.match_date',
				match_status: '.match_status',
				home_club: '.home_club .club_name a',
				home_score: '.home_club .match_score',
				away_club: '.vs_club .club_name a',
				away_score: '.vs_club .match_score'
			}
		}
	})
	.then(schedule => {
		console.log(schedule);
		return (schedule);
	});
}


// player list scraper
function playerListScraper(url) {
	for (let i = 0; i < 21; i++) {
		scrape(`${url}${i}`, {
			players: {
				listItem: '.row',
				data: {
					playerName: '.name_link',
					playerTeam: '.club',
				  playerPosition: '.position'
				}
			}
		})
		.then(players => {
			console.log(players);
			return (players);
		});
	};
}


// player stats scraper
// the url variable is to be taken from the playerURL in each player's model
function playerStatsScraper(url) {
	scrape(url, {
		playerStats: {
			listItem: 'div.stats_tables.expanded',
			data: {
				gamesPlayed: {
					selector: 'table.responsive tbody tr td',
					eq: 2
				},
				gamesStarted: {
					selector: 'table.responsive tbody tr td',
					eq: 3
				},
				goals: {
					selector: 'table.responsive tbody tr td',
					eq: 4
				},
				minutesPlayed: {
					selector: 'table.responsive tbody tr td',
					eq: 5
				},
				assists: {
					selector: 'table.responsive tbody tr td',
					eq: 6
				},
				shotsTaken: {
					selector: 'table.responsive tbody tr td',
					eq: 7
				},
				shotsOnGoal: {
					selector: 'table.responsive tbody tr td',
					eq: 8
				},
				foulsCommitted: {
					selector: 'table.responsive tbody tr td',
					eq: 9
				},
				timesOffside: {
					selector: 'table.responsive tbody tr td',
					eq: 10
				},
				yellowCards: {
					selector: 'table.responsive tbody tr td',
					eq: 11
				},
				redCards: {
					selector: 'table.responsive tbody tr td',
					eq: 12
				}
			}
		}
	})
	.then(playerStats => {
		console.log(playerStats);
		return (playerStats);
	});
}

// mlsScheduleScraper(scheduleURL);
// playerListScraper(playersURL);
// playerStatsScraper(playerStatsURL + playerName);

exports.mlsScheduleScraper = mlsScheduleScraper;
exports.playerListScraper = playerListScraper;
exports.playerStatsScraper = playerStatsScraper;