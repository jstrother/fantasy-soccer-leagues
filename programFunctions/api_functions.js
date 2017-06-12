const rp = require('request-promise'),
    key = require('../config.js').API_KEY,
    baseURL = 'https://soccer.sportmonks.com/api/v2.0',
    toInclude = '&include=';

// this function is to get a list of leagues available to the player [returns array]
// having issues getting league IDs to actually be returned
function allLeagueIds() {
  const endpoint = `${baseURL}/leagues`,
    leagues = {
      uri: `${endpoint}${key}`,
      json: true
    };
  let leagueIdArray;
  
  return rp(leagues)
  .then(leagues => {
    leagueIdArray = [];
    for (let i = 1; i <= leagues.meta.pagination.total_pages; i++) {
      let leaguePages = {
          uri: `${endpoint}${key}&page=${i}`,
          json: true
        },
        tempArray;
      
      rp(leaguePages)
      .then(leaguePages => {
        tempArray = [];
        for (let j = 0; j < leaguePages.data.length; j++) {
          tempArray.push(leaguePages.data[j].id);
        }
        leagueIdArray.push(tempArray); // leagueIdArray is an array of arrays
        console.log(`leagueIdArray.length: ${leagueIdArray.length}`);
        return leagueIdArray;
      })
      .catch(error => {
        console.log(`allLeagues for loop error: ${error}`);
      });
      console.log(`leagueIdArray: ${leagueIdArray}`); // leagueIdArray is empty
    }
  })
  .catch(error => {
    console.log(`allLeagues error: ${error}`);
  });
}

allLeagueIds();

// this function returns the current season in a particular league
function seasonByLeague(leagueId) {
  const endpoint = `${baseURL}/leagues/`,
    league = {
      uri: `${endpoint}${leagueId}${key}`,
      json: true
    };
    
  return rp(league)
  .then(league => {
    // console.log(`seasonId: ${league.data.current_season_id}`);
    return league.data.current_season_id;
  })
  .catch(error => {
    console.log(`seasonByLeague error: ${error}`);
  });
}

// seasonByLeague(779);

// this function is to retrieve fixtures in a league's season [returns array]
function fixturesByLeagueSeason(seasonId) {
  const endpoint = `${baseURL}/seasons/`,
    included = `${toInclude}fixtures`,
    fixtures = {
      uri: `${endpoint}${seasonId}${key}${included}`,
      json: true
    };
  
  rp(fixtures)
  .then(fixtures => {
    let fixtureIdList = [];
    for (let i = 0; i < fixtures.data.fixtures.data.length; i++) {
      fixtureIdList.push(fixtures.data.fixtures.data[i].id);
    }
    return fixtureIdList;
  })
  .catch(error => {
    console.log(`fixturesByLeague error: ${error}`);
  });
}

// fixturesByLeagueSeason(914);

// this function retrieves information about a particular fixture by its ID
function playerStatsByFixture(fixtureId) {
  const endpoint = `${baseURL}/fixtures/`,
    included = `${toInclude}substitutions,lineup`,
    fixture = {
      uri: `${endpoint}${fixtureId}${key}${included}`,
      json: true
    };
  
  return rp(fixture)
  .then(fixture => {
    let lineup = fixture.data.lineup.data,
      substitutions = fixture.data.substitutions.data,
      fixtureData = {
        lineup,
        substitutions,
      };
    console.log(fixtureData.lineup[21]);
  })
  .catch(error => {
    console.log(`fixtureById error: ${error}`);
  });
}

// playerStatsByFixture(237282);

exports.allLeagueIds = allLeagueIds;
exports.seasonByLeague = seasonByLeague;
exports.fixturesByLeagueSeason = fixturesByLeagueSeason;
exports.playerStatsByFixture = playerStatsByFixture;