/*eslint-disable no-unused-vars, no-console*/
// components/scheduleDisplay.js

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import FantasyMatch from './fantasyMatch.js';
import { getSchedule, matchResolve } from '../flow/subActions/fantasyScheduleActions.js';
import { getClub } from '../flow/subActions/fantasyClubActions.js';
import { compare } from '../server/programFunctions/compare_function.js';
import styles from '../scss/scheduleDisplay.scss';

const sevenDays = 1000 * 60 * 60 * 24 * 7,
  today = Date.now();

export class DisplaySchedule extends React.Component {
  componentDidMount() {
    if (this.props.clubFetched === false) {
      this.props.dispatch(getClub(this.props.accessToken, this.props.userId));
    }
    setTimeout(() => {
      if (this.props.leagueScheduleId !== undefined) {
        this.props.dispatch(getSchedule(this.props.leagueScheduleId));
        if (this.props.starters.length + this.props.benchwarmers.length === 18) {
          this.props.dispatch(matchResolve());
        }
      }
    }, 2000);
  }
  componentDidUpdate() {
    if (!this.props.leagueScheduleId && this.props.clubFetched === false) {
      this.props.dispatch(getClub(this.props.accessToken, this.props.userId));
    }
    if (this.props.leagueScheduleId !== undefined && this.props.scheduleFetched === false) {
      this.props.dispatch(getSchedule(this.props.leagueScheduleId));
      if (this.props.starters.length + this.props.benchwarmers.length === 18) {
        this.props.dispatch(matchResolve());
      }
    }
  }
  
  render() {
    if (this.props.fantasySchedule.weeklyMatches !== undefined) {
      let previousMatch,
        previousRound,
        nextMatch,
        nextRound;
      this.props.fantasySchedule.weeklyMatches.forEach(round => {
        const matchDates = new Date(round.datesToRun);
        if ((today - sevenDays) <= matchDates.getTime() && matchDates.getTime() < today) {
          previousRound = round;
          round.matches.forEach(match => {
            if (match.homeClub.manager === this.props.userId || match.awayClub.manager === this.props.userId) {
              previousMatch = match;
            }
          });
        }
        if(today <= matchDates.getTime() && matchDates.getTime() < today + sevenDays) {
          nextRound = round;
          round.matches.forEach(match => {
            if (match.homeClub.manager === this.props.userId || match.awayClub.manager === this.props.userId) {
              nextMatch = match;
            }
          });
        }
      });
      return(
        <div>
          <p>Previous Match:</p>
          <FantasyMatch 
            homeClub={previousMatch.homeClub.clubName}
            awayClub={previousMatch.awayClub.clubName}
            homeScore={previousMatch.homeScore}
            awayScore={previousMatch.awayScore}
            matchDate={previousRound.datesToRun}/>
          <br />
          <p>Next Match:</p>
          <FantasyMatch 
            homeClub={nextMatch.homeClub.clubName}
            awayClub={nextMatch.awayClub.clubName}
            homeScore={null}
            awayScore={null}
            matchDate={nextRound.datesToRun}/>
          <br />
          <p>Schedule:</p>
          <table>
            <thead>
              <tr>
                <th>Round</th>
                <th>Home</th>
                <th>Away</th>
                <th>Date/Result</th>
              </tr>
            </thead>
            {
              this.props.fantasySchedule.weeklyMatches
              // we sort the array to make sure it gets listed 'round 1, round 2, round 3...' and not 'round 12, round 5, round 28...'
              .sort((a, b) => compare(b.roundNumber, a.roundNumber)) // it is this way to sort in descending order
              .map(round => {
                const matches = round.matches;
                // create a table body for each round of the season
                return(
                  <tbody
                    key={round._id}
                    id={`rnd-${round._id}`}>
                    <tr>
                      <td>
                        {`Round ${round.roundNumber}`}
                      </td>
                    </tr>
                    {
                      matches
                      .map(match => {
                        if (match.final === false) {
                          return (
                            <tr
                              key={round._id + match.homeClub._id}>
                              <td></td>
                              <td>
                                {match.homeClub.clubName}
                              </td>
                              <td>
                                {match.awayClub.clubName}
                              </td>
                              <td>
                                {round.datesToRun}
                              </td>
                            </tr>
                          );
                        }
                        if (match.final === true) {
                          return (
                            <tr
                              key={round._id + match.homeClub._id}>
                              <td>
                                {match.homeClub.clubName}
                              </td>
                              <td>
                                {match.awayClub.clubName}
                              </td>
                              <td>
                                {match.homeScore}:{match.awayScore}
                              </td>
                            </tr>
                          );
                        }
                      })
                    }
                  </tbody>
                );
              })
            }
          </table>
        </div>
      );
    }
    else {
      return(
        <div>
          <p>No schedule yet.</p>
        </div>
      );
    }
  }
}

const mapDisplayStateToProps = state => ({
  userId: state.userReducer.userId,
  fantasySchedule: state.fantasyScheduleReducer.fantasySchedule,
	leagueScheduleId: state.fantasyClubReducer.leagueScheduleId,
	scheduleFetched: state.fantasyScheduleReducer.scheduleFetched,
	starters: state.fantasyClubReducer.starters,
	benchwarmers: state.fantasyClubReducer.benchwarmers,
	clubFetched: state.fantasyClubReducer.clubFetched
});

const ScheduleDisplay = connect(
  mapDisplayStateToProps
)(DisplaySchedule);

export default CSSModules(ScheduleDisplay, styles);