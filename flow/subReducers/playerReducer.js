// ./flow/subReducers/playerReducer.js
// imported into ./flow/reducers.js

import { SET_STARTER_SUCCESS, SET_STARTER_FAIL, SET_BENCHWARMER_SUCCESS, SET_BENCHWARMER_FAIL, SET_RESERVE_SUCCESS, SET_RESERVE_FAIL } from '../subActions/playerActions.js';

export const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_STARTER_SUCCESS:
      return Object.assign({}, state,
        {
          fullName: action.player.fullName,
          firstName: action.player.firstName,
          lastName: action.player.lastName,
          picture: action.player.picture,
          position: action.player.position,
          club: action.player.club,
          leagueId: action.player.leagueId,
          shotsTotal: action.player.stats.shots.shotsTotal,
          shotsOnGoal: action.player.stats.shots.shotsOnGoal,
          goalsScored: action.player.stats.goals.scored,
          goalsConceded: action.player.stats.goals.conceded,
          ownGoals: action.player.stats.goals.ownGoals,
          foulsDrawn: action.player.stats.fouls.drawn,
          foulsCommitted: action.player.stats.fouls.committed,
          yellowCards: action.player.stats.cards.yellowCards,
          redCards: action.player.stats.cards.redCards,
          totalCrosses: action.player.stats.passing.totalCrosses,
          crossingAccuracy: action.player.stats.passing.crossingAccuracy,
          totalPasses: action.player.stats.passing.totalPasses,
          passingAccuracy: action.player.stats.passing.passingAccuracy,
          penaltiesScored: action.player.stats.other.penaltiesScored,
          penaltiesMissed: action.player.stats.other.penaltiesMissed,
          penaltiesSaved: action.player.stats.other.penaltiesSaved,
          assists: action.player.stats.other.assists,
          offsides: action.player.stats.other.offsides,
          saves: action.player.stats.other.saves,
          tackles: action.player.stats.other.tackles,
          blocks: action.player.stats.other.blocks,
          interceptions: action.player.stats.other.interceptions,
          clearances: action.player.stats.other.clearances,
          minutesPlayed: action.player.stats.other.minutesPlayed,
          fixturePoints: action.player.fantasyPoints.fixture,
          seasonPoints: action.player.fantasyPoints.season
        }
      );
    case SET_BENCHWARMER_SUCCESS:
      return Object.assign({}, state,
        {
          fullName: action.player.fullName,
          firstName: action.play.firstName,
          lastName: action.player.lastName,
          picture: action.player.picture,
          position: action.player.position,
          club: action.player.club,
          leagueId: action.player.leagueId,
          shotsTotal: action.player.stats.shots.shotsTotal,
          shotsOnGoal: action.player.stats.shots.shotsOnGoal,
          goalsScored: action.player.stats.goals.scored,
          goalsConceded: action.player.stats.goals.conceded,
          ownGoals: action.player.stats.goals.ownGoals,
          foulsDrawn: action.player.stats.fouls.drawn,
          foulsCommitted: action.player.stats.fouls.committed,
          yellowCards: action.player.stats.cards.yellowCards,
          redCards: action.player.stats.cards.redCards,
          totalCrosses: action.player.stats.passing.totalCrosses,
          crossingAccuracy: action.player.stats.passing.crossingAccuracy,
          totalPasses: action.player.stats.passing.totalPasses,
          passingAccuracy: action.player.stats.passing.passingAccuracy,
          penaltiesScored: action.player.stats.other.penaltiesScored,
          penaltiesMissed: action.player.stats.other.penaltiesMissed,
          penaltiesSaved: action.player.stats.other.penaltiesSaved,
          assists: action.player.stats.other.assists,
          offsides: action.player.stats.other.offsides,
          saves: action.player.stats.other.saves,
          tackles: action.player.stats.other.tackles,
          blocks: action.player.stats.other.blocks,
          interceptions: action.player.stats.other.interceptions,
          clearances: action.player.stats.other.clearances,
          minutesPlayed: action.player.stats.other.minutesPlayed,
          fixturePoints: action.player.fantasyPoints.fixture,
          seasonPoints: action.player.fantasyPoints.season
        }
      );
    case SET_RESERVE_SUCCESS:
      return Object.assign({}, state,
        {
          fullName: action.player.fullName,
          firstName: action.player.firstName,
          lastName: action.player.lastName,
          picture: action.player.picture,
          position: action.player.position,
          club: action.player.club,
          leagueId: action.player.leagueId,
          shotsTotal: action.player.stats.shots.shotsTotal,
          shotsOnGoal: action.player.stats.shots.shotsOnGoal,
          goalsScored: action.player.stats.goals.scored,
          goalsConceded: action.player.stats.goals.conceded,
          ownGoals: action.player.stats.goals.ownGoals,
          foulsDrawn: action.player.stats.fouls.drawn,
          foulsCommitted: action.player.stats.fouls.committed,
          yellowCards: action.player.stats.cards.yellowCards,
          redCards: action.player.stats.cards.redCards,
          totalCrosses: action.player.stats.passing.totalCrosses,
          crossingAccuracy: action.player.stats.passing.crossingAccuracy,
          totalPasses: action.player.stats.passing.totalPasses,
          passingAccuracy: action.player.stats.passing.passingAccuracy,
          penaltiesScored: action.player.stats.other.penaltiesScored,
          penaltiesMissed: action.player.stats.other.penaltiesMissed,
          penaltiesSaved: action.player.stats.other.penaltiesSaved,
          assists: action.player.stats.other.assists,
          offsides: action.player.stats.other.offsides,
          saves: action.player.stats.other.saves,
          tackles: action.player.stats.other.tackles,
          blocks: action.player.stats.other.blocks,
          interceptions: action.player.stats.other.interceptions,
          clearances: action.player.stats.other.clearances,
          minutesPlayed: action.player.stats.other.minutesPlayed,
          fixturePoints: action.player.fantasyPoints.fixture,
          seasonPoints: action.player.fantasyPoints.season
        }
      );
    case SET_BENCHWARMER_FAIL:
    case SET_STARTER_FAIL:    
    case SET_RESERVE_FAIL:
    default:
      return state;
  }  
};