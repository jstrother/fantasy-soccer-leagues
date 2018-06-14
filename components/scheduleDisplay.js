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
      }
    }, 2000);
  }
  componentDidUpdate() {
    if (!this.props.leagueScheduleId && this.props.clubFetched === false) {
      this.props.dispatch(getClub(this.props.accessToken, this.props.userId));
    }
    if (this.props.leagueScheduleId !== undefined && this.props.scheduleFetched === false) {
      this.props.dispatch(getSchedule(this.props.leagueScheduleId));
    }
  }
  
  render() {
    let previousHomeClub,
      previousHomeScore,
      previousAwayClub,
      previousAwayScore,
      previousRoundDates,
      nextHomeClub,
      nextAwayClub,
      nextRoundDates;
    if (this.props.fantasySchedule.weeklyMatches !== undefined) {
      this.props.fantasySchedule.weeklyMatches.forEach(week => {
        console.log('frontEnd week:', week);
        const matchDates = new Date(week.datesToRun).getTime();
        if ((today - sevenDays) <= matchDates && matchDates < today) {
          previousRoundDates = week.datesToRun;
          week.matches.forEach(match => {
            if (match.homeClub.manager === this.props.userId || match.awayClub.manager === this.props.userId) {
              previousHomeClub = match.homeClub.clubName;
              previousHomeScore = match.homeScore;
              previousAwayClub = match.awayClub.clubName;
              previousAwayScore = match.awayScore;
            }
          });
        }
        if(today <= matchDates && matchDates < today + sevenDays) {
          nextRoundDates = week.datesToRun;
          week.matches.forEach(match => {
            if (match.homeClub.manager === this.props.userId || match.awayClub.manager === this.props.userId) {
              nextHomeClub = match.homeClub.clubName;
              nextAwayClub = match.awayClub.clubName;
            }
          });
        }
      });
      return(
        <div>
          <p>Previous Match:</p>
          <FantasyMatch 
            homeClub={previousHomeClub}
            awayClub={previousAwayClub}
            homeScore={previousHomeScore}
            awayScore={previousAwayScore}
            matchDate={previousRoundDates}/>
          <br />
          <p>Next Match:</p>
          <FantasyMatch 
            homeClub={nextHomeClub}
            awayClub={nextAwayClub}
            homeScore={null}
            awayScore={null}
            matchDate={nextRoundDates}/>
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
              .map(week => {
                const matches = week.matches;
                // create a table body for each round of the season
                return(
                  <tbody
                    key={week._id}
                    id={`rnd-${week._id}`}>
                    <tr>
                      <td
                        key={`round${week.roundNumber}`}>
                        {`Round ${week.roundNumber}`}
                      </td>
                    </tr>
                    {
                      matches
                      .map(match => {
                        if (match.final === false) {
                          return (
                            <tr
                              key={`${week._id}${match._id}`}>
                              <td></td>
                              <td
                                key={`${week._id}${match._id}${match.homeClub._id}`}>
                                {match.homeClub.clubName}
                              </td>
                              <td
                                key={`${week._id}${match._id}${match.awayClub._id}`}>
                                {match.awayClub.clubName}
                              </td>
                              <td
                                key={`${week._id}${match._id}dates`}>
                                {week.datesToRun}
                              </td>
                            </tr>
                          );
                        }
                        if (match.final === true) {
                          return (
                            <tr
                              key={`${week._id}${match._id}`}>
                              <td></td>
                              <td
                                key={`${week._id}${match._id}${match.homeClub._id}`}>
                                {match.homeClub.clubName}
                              </td>
                              <td
                                key={`${week._id}${match._id}${match.awayClub._id}`}>
                                {match.awayClub.clubName}
                              </td>
                              <td
                                key={`${week._id}${match._id}scores`}>
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
	clubFetched: state.fantasyClubReducer.clubFetched
});

const ScheduleDisplay = connect(
  mapDisplayStateToProps
)(DisplaySchedule);

export default CSSModules(ScheduleDisplay, styles);