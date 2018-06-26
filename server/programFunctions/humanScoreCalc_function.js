function humanScoreCalc(club) {
  let score = 0;
  club.starters.forEach(starter => {
    score += starter.fantasyPoints.fixture;
  });
  return score;
}

module.exports = {
  humanScoreCalc
};