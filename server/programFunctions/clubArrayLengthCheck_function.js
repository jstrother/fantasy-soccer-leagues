const mongoose = require('mongoose'),
  FantasyClub = require("../../models/fantasyClub_model.js");

function clubArrayLengthCheck(clubArray) {
  if (clubArray.length % 2 !== 0) {
    // this checks to make sure that there is only one averageClub in the clubArray
    let averageCheck = clubArray.filter(club => {
      if (club.clubName === 'Average') {
        return true;
      }
    });
    if (averageCheck.length === 0) {
      // we do this so that there is an even number of clubs in clubArray
      const averageClub = new FantasyClub({
        _id: new mongoose.Types.ObjectId(),
        clubName: 'Average'
      });
      
      clubArray.push(averageClub);
    }
  }
  return clubArray;
}

module.exports = {
  clubArrayLengthCheck
};