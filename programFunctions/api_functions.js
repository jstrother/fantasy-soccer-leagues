const rp = require('request-promise'),
    key = require('../config.js').API_KEY,
    baseURL = 'https://soccer.sportmonks.com/api/v2.0',
    toInclude = '&include=';

//this function is to get a list of leagues available to the player
function leagueGrabber() {
  const endpoint = `${baseURL}/leagues`,
    leagues = {
      uri: `${endpoint}${key}`,
      json: true
    };
  
  return rp(leagues)
  .then(leagues => {
    // console.log(leagues);
    return leagues;
  });
}

//this function is to get the current season or most recent season of a league
function playersByLeagueGrabber(leagueId) {
  const endpoint = `${baseURL}/leagues/`,
    included = `${toInclude}season,seasons`,
    league = {
      uri: `${endpoint}${leagueId}${key}${included}`,
      json: true
    };
  
  return rp(league)
  .then(league => {
    // console.log(league.data.seasons.data[0].id);
    return league.data.seasons.data[0].id;
  })
  .then(seasonId => {
    const endpoint = `${baseURL}/teams/season/`,
      included = `${toInclude}squad,stats,transfers`,
      teams = {
        uri: `${endpoint}${seasonId}${key}${included}`,
        json: true
      };
    
    return rp(teams)
    .then(teams => {
      // writing another function to retrieve players until i can get access to an active league
      // will come back to this once i can, but i need to get to working on players
      // console.log(teams.data[0].squad.data);
      return teams.data[0].squad.data;
    })
    .catch(error => {
      console.log(`error from teams in seasonGrabber: ${error}`);
    });
  })
  .catch(error => {
    console.log(`playersByLeagueGrabber error: ${error}`);
  });
}

// playersByLeagueGrabber(501);

// the following code block is only to get players while i'm waiting for access to an active league
// i would rather get players by team than by fixture lineup, which this block is doing
function playersByFixtureGrabber(seasonId) {
  const endpoint = `${baseURL}/seasons/`,
    included = `${toInclude}fixtures`,
    season = {
      uri: `${endpoint}${seasonId}${key}${included}`,
      json: true
    };
  
  return rp(season)
  .then(season => {
    // console.log(season.data.fixtures.data[0]);
    console.log(season.data.fixtures.data.length);
    for (let i = 0; i < season.data.fixtures.data.length; i++) {
      // console.log(season.data.fixtures.data[i].id);
      let fixtureId = season.data.fixtures.data[i].id;
      const endpoint = `${baseURL}/fixtures/`,
        included = `${toInclude}lineup,bench,stats,goals,cards,events,other`,
        fixture = {
          uri: `${endpoint}${fixtureId}${key}${included}`,
          json: true
        };
      
      rp(fixture)
      .then(fixture => {
        // console.log(fixture);
      })
      .catch(error => {
        console.log(`playersByFixtureGrabber for loop error: ${error}`);
      });
    }
  })
  .catch(error => {
    console.log(`playersByFixtureGrabber error: ${error}`);
  });
}

playersByFixtureGrabber(825);

exports.leagueGrabber = leagueGrabber;
exports.playersByLeagueGrabber = playersByLeagueGrabber;