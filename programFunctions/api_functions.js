const rp = require('request-promise'),
    key = require('../config.js').API_KEY,
    baseURL = 'https://soccer.sportmonks.com/api/v2.0',
    toInclude = '&include=';

// this function is to get a list of leagues available to the player [returns array]
// rewrite this to get list of leagues by country using all countries endpoint (paginated)
function allLeaguesInfo() {
  const endpoint = `${baseURL}/leagues`,
    leagues = {
      uri: `${endpoint}${key}`,
      json: true
    };
  let leagueInfoArray;
  return rp(leagues)
  .then(leagues => {
    leagueInfoArray = [];
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
          let leagueInfo = {
            id: leaguePages.data[j].id,
            name: leaguePages.data[j].name,
            countryId: leaguePages.data[j].country_id
          };
          leagueInfoArray.push(leagueInfo); // leagueInfoArray is an array of arrays
        }
        // console.log(leagueInfoArray[0]);
        return leagueInfoArray;
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

// allLeaguesInfo()
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

// this function is to retrieve matches in a league's season [returns array]
// match and fixture are interchangeable
function matchesByLeagueSeason(seasonId) {
  const endpoint = `${baseURL}/seasons/`,
    included = `${toInclude}fixtures`, // fixture must be left here as it is a part of the api json return
    matches = {
      uri: `${endpoint}${seasonId}${key}${included}`,
      json: true
    };
  
  return rp(matches)
  .then(matches => {
    let matchIdList = [];
    for (let i = 0; i < matches.data.fixtures.data.length; i++) { // fixture must be left here as it is a part of the api json return
      matchIdList.push(matches.data.fixtures.data[i].id); // fixture must be left here as it is a part of the api json return
    }
    return matchIdList;
  })
  .catch(error => {
    console.log(`matchesByLeague error: ${error}`);
  });
}

// matchesByLeagueSeasonmatchesByLeagueSeason(914);

// this function retrieves information about a particular match by its ID
function playerStatsByMatch(matchId) {
  const endpoint = `${baseURL}/fixtures/`, // fixture must be left here as it is a part of the api json return
    included = `${toInclude}substitutions,lineup,localTeam,visitorTeam`,
    match = {
      uri: `${endpoint}${matchId}${key}${included}`,
      json: true
    };
  
  return rp(match)
  .then(match => {
    let lineup = match.data.lineup.data,
      substitutions = match.data.substitutions.data,
      homeClub = match.data.localTeam.data,
      awayClub = match.data.visitorTeam.data,
      matchData = {
        lineup,
        substitutions,
        homeClub,
        awayClub
      };
    console.log(matchData.homeClub);
    return matchData;
  })
  .catch(error => {
    console.log(`playerStatsByMatch error: ${error}`);
  });
}

playerStatsByMatch(237282);

function playerById(playerId) {
  // fetch general player info
}

exports.allLeaguesInfo = allLeaguesInfo;
exports.seasonByLeague = seasonByLeague;
exports.matchesByLeagueSeason = matchesByLeagueSeason;
exports.playerStatsByMatch = playerStatsByMatch;