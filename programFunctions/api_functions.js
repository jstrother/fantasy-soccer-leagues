const rp = require('request-promise'),
    key = require('../config.js').API_KEY,
    baseURL = 'https://soccer.sportmonks.com/api/v2.0',
    toInclude = '&include=';

// this function is to get a list of leagues available to the player [returns array]
// split this into two separate functions, one to return endpoints for all pages, the other to finally return league IDs
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
    let leagueUriArray = [];
    
    for (let i = 1; i <= leagues.meta.pagination.total_pages; i++) {
      leagueUriArray.push(`${endpoint}${key}&page=${i}`);
    }
    
    return Promise.all(leagueUriArray.map(uri => {
      return rp({
        uri,
        json: true
      })
      .then(leaguePages => {
        for (let j = 0; j < leaguePages.data.length; j++) {
          leagueIdArray.push(leaguePages.data[j].id); // leagueIdArray is an array of arrays
        }
        return leagueIdArray;
      })
      .catch(error => {
        console.log(`allLeagues for loop error: ${error}`);
      });
    }));
  })
  .catch(error => {
    console.log(`allLeagues error: ${error}`);
  });
}

// allLeagueIds()
// .then(answer => {
//   console.log(answer);
// });

// this function returns the current season in a particular league
function seasonByLeague(leagueId) {
  const endpoint = `${baseURL}/leagues/`,
    league = {
      uri: `${endpoint}${leagueId}${key}`,
      json: true
    };
    
  return rp(league)
  .then(league => {
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
    included = `${toInclude}substitutions,lineup,localTeam,visitorTeam`,
    fixture = {
      uri: `${endpoint}${fixtureId}${key}${included}`,
      json: true
    };
  
  return rp(fixture)
  .then(fixture => {
    let lineup = fixture.data.lineup.data, // playerStats comes from this endpoint
      substitutions = fixture.data.substitutions.data,
      homeClub = fixture.data.localTeam,
      awayClub = fixture.data.visitorTeam,
      fixtureData = {
        lineup,
        substitutions,
        homeClub,
        awayClub
      };
    // console.log(fixtureData.homeClub);
    return fixtureData;
  })
  .catch(error => {
    console.log(`playerStatsByFixture error: ${error}`);
  });
}

playerStatsByFixture(237282);

exports.allLeagueIds = allLeagueIds;
exports.seasonByLeague = seasonByLeague;
exports.fixturesByLeagueSeason = fixturesByLeagueSeason;
exports.playerStatsByFixture = playerStatsByFixture;