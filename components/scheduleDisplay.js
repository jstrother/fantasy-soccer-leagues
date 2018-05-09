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

export class DisplaySchedule extends React.Component {
  componentDidMount() {
    this.props.dispatch(getClub(this.props.accessToken, this.props.userId));
    setTimeout(() => {
      if (this.props.leagueScheduleId !== undefined) {
        this.props.dispatch(getSchedule(this.props.leagueScheduleId));
        this.props.dispatch(matchResolve());
      }
    }, 2000);
  }
  componentDidUpdate() {
    if (!this.props.leagueScheduleId) {
      this.props.dispatch(getClub(this.props.accessToken, this.props.userId));
    }
    if (this.props.leagueScheduleId !== undefined && this.props.scheduleFetched === false) {
      this.props.dispatch(getSchedule(this.props.leagueScheduleId));
      this.props.dispatch(matchResolve());
    }
  }
  
  render() {
    return(
      <div>
        <p>Previous Match:</p>
        <FantasyMatch />
        <br />
        <p>Next Match:</p>
        <FantasyMatch />
        <br />
        {/*schedule display needs to be its own component*/}
        <p>Schedule:</p>
        <table>
          <thead>
            <tr>
              <th>Home</th>
              <th>Away</th>
              <th>Date/Result</th>
            </tr>
          </thead>
          {
            this.props.fantasySchedule.weeklyMatches
            // we sort the array to make sure it gets listed 'round 1, round 2, round 3...' and not 'round 12, round 5, round 28...'
            .sort((a, b) => compare(a.name, b.name))
            .map(round => {
              const matches = round.matches;
              // create a table body for each round of the season
              return(
                <tbody
                  key={round._id}
                  id={`rnd-${round._id}`}>
                  <tr>
                    {round.name}
                  </tr>
                  {
                    matches
                    .map(match => {
                      if (match.final === false) {
                        return (
                          <tr>
                            <td>
                              {match.homeClub}
                            </td>
                            <td>
                              {match.awayClub}
                            </td>
                            <td>
                              {round.datesToRun.toDateString()}
                            </td>
                          </tr>
                        );
                      }
                      if (match.final === true) {
                        return (
                          <tr>
                            <td>
                              {match.homeClub}
                            </td>
                            <td>
                              {match.awayClub}
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
}

const mapDisplayStateToProps = state => ({
  userId: state.userReducer.userId,
  fantasySchedule: state.fantasyScheduleReducer.fantasySchedule,
	leagueScheduleId: state.fantasyClubReducer.leagueScheduleId,
	scheduleFetched: state.fantasyScheduleReducer.scheduleFetched
});

const ScheduleDisplay = connect(
  mapDisplayStateToProps
)(DisplaySchedule);

export default CSSModules(ScheduleDisplay, styles);