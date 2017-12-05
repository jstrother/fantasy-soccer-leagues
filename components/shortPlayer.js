// components/shortPlayer.js
// this shows player name, position, and club for roster selection via dropdown menu

import React from 'react';
import { LEAGUE_IDS_NAMES } from '../server/league_ids_names.js';

export default class ShortTeammate extends React.Component {
  render() {
    return (
      <div>
        <p className={'short-player-name'}>{`${this.props.fullName}`}</p>
        <p className={'short-player-position'}>{`${this.props.position}`}</p>
        <p className={'short-player-club'}>{`${this.props.club}`}</p>
      </div>
    );
  }
}