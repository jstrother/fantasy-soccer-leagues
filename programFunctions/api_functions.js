const rp = require('request-promise'),
    key = require('../config.js').API_KEY,
    baseURL = 'https://soccer.sportmonks.com/api/v2.0',
    toInclude = '&include=';

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
    let matchList = [],
      match = {};
    matches.data.fixtures.data.forEach(fixture => { // fixtures must be left here as it is a part of the api json return
      match = {
        matchId: fixture.id,
        homeClubId: fixture.localteam_id,
        awayClubId: fixture.visitorteam_id,
        matchStatus: fixture.time.status
      };
      matchList.push(match);
    });
    return matchList;
  })
  .catch(error => {
    console.log(`matchesByLeagueSeason error: ${error}`);
  });
}

// matchesByLeagueSeason(914);

// this function retrieves player stats from a particular match by its ID
function playerStatsByMatch(matchId) {
  const endpoint = `${baseURL}/fixtures/`, // fixture must be left here as it is a part of the api json return
    included = `${toInclude}substitutions,lineup,localTeam,visitorTeam,goals`,
    match = {
      uri: `${endpoint}${matchId}${key}${included}`,
      json: true
    };
  
  return rp(match)
  .then(match => {
    let lineup = match.data.lineup.data,
      substitutions = [],
      homeClub = {
        id: match.data.localTeam.data.id,
        name: match.data.localTeam.data.name,
        logo: match.data.localTeam.data.logo_path,
        score: match.data.scores.localteam_score
      },
      awayClub = {
        id: match.data.visitorTeam.data.id,
        name: match.data.visitorTeam.data.name,
        logo: match.data.visitorTeam.data.logo_path,
        score: match.data.scores.visitorteam_score
      },
      matchData = {
        lineup,
        substitutions,
        homeClub,
        awayClub
      };
      match.data.substitutions.data.forEach(substitution => {
        let sub = {
          playerOut: substitution.player_out_name,
          playerOutId: substitution.player_out_id,
          playerIn: substitution.player_in_name,
          playerInId: substitution.player_in_id
        };
        substitutions.push(sub);
      });
    return matchData;
  })
  .catch(error => {
    console.log(`playerStatsByMatch error: ${error}`);
  });
}

// playerStatsByMatch(237283);

function teamPlayerIdsBySeason(seasonId) {
  const endpoint = `${baseURL}/teams/season/`,
    included = `${toInclude}squad`,
    teams = {
      uri: `${endpoint}${seasonId}${key}${included}`,
      json: true
    };
  
  return rp(teams)
  .then(teams => {
    let playerIdList = [];
    teams.data.forEach(team => {
      if(team.squad.data.length > 0) {
        team.squad.data.forEach(player => {
          playerIdList.push(player.player_id);
        });
      }
    });
    return playerIdList;
  })
  .catch(error => {
    console.log(`teamPlayerIdsBySeason error: ${error}`);
  });
}

// teamPlayerIdsBySeason(914);

function playerByIdBySeason(playerId, seasonId) {
  const endpoint = `${baseURL}/players/`,
    included = `${toInclude}stats,position,team`,
    playerInfo = {
      uri: `${endpoint}${playerId}${key}${included}`,
      json: true
    };
  
  return rp(playerInfo)
  .then(playerInfo => {
    // console.log(playerInfo.data.stats.data);
    let player = {};
    playerInfo.data.stats.data.forEach(stat => {
      if (stat.season_id === seasonId) {
        // console.log(stat);
        player = {
          playerCommonName: playerInfo.data.common_name,
          playerFirstName: playerInfo.data.firstname,
          playerLastName: playerInfo.data.lastname,
          playerPictureLink: playerInfo.data.image_path,
          playerIdFromAPI: playerInfo.data.player_id,
          playerClubIdFromAPI: playerInfo.data.team.data.id,
          playerClub: playerInfo.data.team.data.name,
          playerClubLogo: playerInfo.data.team.data.logo_path,
          playerPositionId: playerInfo.data.position.data.id,
          playerPosition: playerInfo.data.position.data.name,
  				playerStats: {
  				  gamesPlayed: stat.appearences,
  				  gamesStarted: stat.lineups,
  					minutesPlayed: null,
  	        goalsScored: null,
  	        goalsConceded: null,
  	        assists: null,
  	    		shotsTaken: null,
  	    		shotsOnGoal: null,
  	    		foulsDrawn: null,
  	    		foulsCommitted: null,
  	    		yellowCards: null,
  	    		yellowRedCards: null,
  	    		redCards: null,
  	    		passes: null,
  	    		passingAccuracy: null,
  	    		crosses: null,
  	    		crossingAccuracy: null,
  	    		timesOffside: null,
  	    		saves: null,
  	    		penaltiesScored: null,
  	    		penaltiesMissed: null,
  	    		tackles: null,
  	    		blocks: null,
  	    		interceptions: null,
  	    		clearances: null
  				},
  				playerValue: null, // in millions of $$$'s
  				playerSchedule: null,
  				playerFantasyPointsWeek: null,
          playerFantasyPointsTotal: null
        };
      }
    });
    // console.log(player);
    return player;
  })
  .catch(error => {
    console.log(`playerByIdBySeason error: ${error}`);
  });
}

// playerByIdBySeason(918, 914);

exports.seasonByLeague = seasonByLeague;
exports.matchesByLeagueSeason = matchesByLeagueSeason;
exports.playerStatsByMatch = playerStatsByMatch;
exports.playerByIdBySeason = playerByIdBySeason;
exports.teamPlayerIdsBySeason = teamPlayerIdsBySeason;