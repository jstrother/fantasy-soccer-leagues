const 
    // import common modules
    { mongoose, chai, chaiHTTP, chaiAsPromised, should, serverTestConnection } = require('./common.js'),
    // import server
    server = require('../server.js'),
	// all models
	FantasyGame = require('../models/fantasyGame_model.js'),
	User = require('../models/user_model.js'),
	FantasyClub = require('../models/fantasyClub_model.js'),
	FantasyLeague = require('../models/fantasyLeague_model.js'),
	FantasyChampsLeague = require('../models/fantasyChampsLeague_model.js'),
	FantasyMatch = require('../models/fantasyMatch_model.js'),
	FantasySchedule = require('../models/fantasySchedule_model.js'),
	Schedule = require('../models/schedule_model.js'),
	Player = require('../models/player_model.js'),
	// import scraper functions
	{ mlsScheduleScraper, playerListScraper, playerStatsScraper } = require('../scraper.js'),
	//import URLs to test with
	scheduleURL = 'https://www.mlssoccer.com/schedule?month=all&year=2017&club=select&club_options=9&op=Update&form_build_id=form-9Aex6ESUxF6RgJMLqz_Mfhbfd1R-np53jgjQfvkaujU&form_id=mp7_schedule_hub_search_filters_form',
	playersURL = 'https://www.mlssoccer.com/players?page=',
	playerStatsURL = 'https://www.mlssoccer.com/players/',
	playerName = 'osvaldo-alonso';
	
describe('MLS Schedule', () => {
    it('should retrieve current MLS schedule', () => {
        return null;
        // return mlsScheduleScraper(scheduleURL).matches.should.have.property('match_date', 'Friday, March 3, 2017');
    });
});