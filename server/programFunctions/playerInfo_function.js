function playerInfo(playerId) {
  return rp(results2)
  .then(results2 => {
    if(results2.data.sidelined.data !== []) {
      let i = results2.data.sidelined.data.length - 1;
      if (results2.data.sidelined.data[i].end_date === null) {
        this.sidelined.description = results2.data.sidelined.data[i].description;
        this.sidelined.startDate = results2.data.sidelined.data[i].start_date;
      }
    }
    return {
      idFromAPI: results2.data.player_id,
      commonName: results2.data.player_name,
      fullName: results2.data.fullname,
      firstName: results2.data.firstname,
      lastName: results2.data.lastname,
      position: results2.data.position.data.name,
      picture: results2.data.image_path,
      clubName: results2.data.team.data.name,
      clubId: results2.data.team.data.id,
      clubLogo: results2.data.team.data.logo_path,
      sidelined: {
        description: null,
        startDate: null
      }
    };
  });
}

module.exports = playerInfo;