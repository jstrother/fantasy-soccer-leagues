function standingsStatsCalc(matchArray) {
  let resolvedMatchArray = matchArray.map(match => {
    if (match.final === false) {
      let resolvedMatch = {
        _id: match._id,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
        final:  true,
        homeClub: clubStats(match.homeClub, match.homeScore, match.awayScore),
        awayClub: clubStats(match.awayClub, match.awayScore, match.homeScore)
      };
      return resolvedMatch;
    }
    if (match.final === true) {
      return match;
    }
  });
  console.log('standingsStatsCalc resolvedMatchArray:', resolvedMatchArray);
  return resolvedMatchArray;
  
  function clubStats(club, clubScore, opponentScore) {
    let clubArray = [club];
    
    let updatedClubArray = clubArray.map(club => {
      if (clubScore > opponentScore) {
        let updatedClub = {
          _id: club._id,
          clubName: club.clubName,
          manager: club.manager,
          leagueScheduleId: club.leagueScheduleId,
          goalkeepers: club.goalkeepers,
          defenders: club.defenders,
          midfielders: club.midfielders,
          forwards: club.forwards,
          starters: club.starters,
          benchwarmers: club.benchwarmers,
          wins: club.wins + 1,
          draws: club.draws,
          losses: club.losses,
          points: club.points + 3,
          goalsFor: club.goalsFor + clubScore,
          goalsAgainst: club.goalsAgainst + opponentScore,
          goalDifferential: club.goalDifferential,
          gamesPlayed: club.gamesPlayed + 1
        };
        
        updatedClub.goalDifferential = updatedClub.goalsFor - updatedClub.goalsAgainst;
        
        return updatedClub;
      }
      
      if (opponentScore > clubScore) {
        let updatedClub = {
          _id: club._id,
          clubName: club.clubName,
          manager: club.manager,
          leagueScheduleId: club.leagueScheduleId,
          goalkeepers: club.goalkeepers,
          defenders: club.defenders,
          midfielders: club.midfielders,
          forwards: club.forwards,
          starters: club.starters,
          benchwarmers: club.benchwarmers,
          wins: club.wins,
          draws: club.draws,
          losses: club.losses + 1,
          points: club.points,
          goalsFor: club.goalsFor + clubScore,
          goalsAgainst: club.goalsAgainst + opponentScore,
          goalDifferential: club.goalDifferential,
          gamesPlayed: club.gamesPlayed + 1
        };
        
        updatedClub.goalDifferential = updatedClub.goalsFor - updatedClub.goalsAgainst;
        
        return updatedClub;
      }
      
      if (clubScore === opponentScore) {
        let updatedClub = {
          _id: club._id,
          clubName: club.clubName,
          manager: club.manager,
          leagueScheduleId: club.leagueScheduleId,
          goalkeepers: club.goalkeepers,
          defenders: club.defenders,
          midfielders: club.midfielders,
          forwards: club.forwards,
          starters: club.starters,
          benchwarmers: club.benchwarmers,
          wins: club.wins,
          draws: club.draws + 1,
          losses: club.losses,
          points: club.points + 1,
          goalsFor: club.goalsFor + clubScore,
          goalsAgainst: club.goalsAgainst + opponentScore,
          goalDifferential: club.goalDifferential,
          gamesPlayed: club.gamesPlayed + 1
        };
        
        updatedClub.goalDifferential = updatedClub.goalsFor - updatedClub.goalsAgainst;
        
        return updatedClub;
      }
    });
    
    return updatedClubArray[0];
  }
}

module.exports = {
  standingsStatsCalc
};