// components/home.js
// imported into ./app.js

import React from 'react';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div>
          Welcome to the Fantasy Soccer-Football Super League!
          <br />
          Create your own team and compete against others to prove you are the best at fantasy footy!
        </div>
      </div>
    );
  }
}