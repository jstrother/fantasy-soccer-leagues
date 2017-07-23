// this function returns the api leagueId for the selected leagueName, to be used when user selects type of fantasy league to play in

function leagueSelectorFrontEnd(leagueName) {
  let leagueId;
  switch(leagueName) {
    case 'Premiere League (England)':
      leagueId = 8;
      break;
    case 'Championship (England)':
      leagueId = 9;
      break;
    case 'League One (England)':
      leagueId = 12;
      break;
    case 'League Two (England)':
      leagueId = 14;
      break;
    case 'Eredivise (Netherlands)':
      leagueId = 72;
      break;
    case 'Eerste Divisie (Netherlands)':
      leagueId = 74;
      break;
    case 'Bundesliga (Germany)':
      leagueId = 82;
      break;
    case '2.Bundesliga (Germany)':
      leagueId = 85;
      break;
    case 'Bundesliga (Austria)':
      leagueId = 181;
      break;
    case 'Jupiler Pro League (Belgium)':
      leagueId = 208;
      break;
    case 'Superliga (Denmark)':
      leagueId = 271;
      break;
    case 'Ligue 1 (France)':
      leagueId = 301;
      break;
    case 'Ligue 2 (France)':
      leagueId = 304;
      break;
    case 'Super League (Greece)':
      leagueId = 325;
      break;
    case 'Urvalsdeild (Iceland)':
      leagueId = 345;
      break;
    case 'Premiere Division (Ireland)':
      leagueId = 360;
      break;
    case 'Serie A (Italy)':
      leagueId = 384;
      break;
    case 'Serie B (Italy)':
      leagueId = 387;
      break;
    case 'Premiership (Northern Ireland)':
      leagueId = 438;
      break;
    case 'Tippeligaen (Norway)':
      leagueId = 444;
      break;
    case 'Ekstraklasa (Poland)':
      leagueId = 453;
      break;
    case 'Primeira Liga (Portugal)':
      leagueId = 462;
      break;
    case 'Premiere League (Russia)':
      leagueId = 486;
      break;
    case 'Premiership (Scotland)':
      leagueId = 501;
      break;
    case 'Championship (Scotland)':
      leagueId = 504;
      break;
    case 'La Liga (Spain)':
      leagueId = 564;
      break;
    case 'Segunda Division (Spain)':
      leagueId = 567;
      break;
    case 'Allsvenskan (Sweden)':
      leagueId = 573;
      break;
    case 'Superettan (Sweden)':
      leagueId = 579;
      break;
    case 'Super League (Switzerland)':
      leagueId = 591;
      break;
    case 'Super Lig (Turkey)':
      leagueId = 600;
      break;
    case 'Premiere League (Wales)':
      leagueId = 624;
      break;
    case 'Primera Division (Argentina)':
      leagueId = 636;
      break;
    case 'Primera B (Argentina)':
      leagueId = 639;
      break;
    case 'Serie A (Brazil)':
      leagueId = 648;
      break;
    case 'Serie B (Brazil)':
      leagueId = 651;
      break;
    case 'Primera Division (Chile)':
      leagueId = 663;
      break;
    case 'Primera A: Apertura (Colombia)':
      leagueId = 672;
      break;
    case 'Primera A: Clausura (Colombia)':
      leagueId = 675;
      break;
    case 'Primera A: Apertura (Ecuador)':
      leagueId = 693;
      break;
    case 'Primera A: Clausura (Ecuador)':
      leagueId = 696;
      break;
    case 'Liga MX (Mexico)':
      leagueId = 743;
      break;
    case 'Major League Soccer (USA)':
      leagueId = 779;
      break;
    case 'J-League (Japan)':
      leagueId = 968;
      break;
    case 'Super League (China)':
      leagueId = 989;
      break;
    case 'Indian Super League (India)':
      leagueId = 1007;
      break;
    case 'Liga de Futbol Profesional (Bolivia)':
      leagueId = 1098;
      break;
    case 'A-League (Australia)':
      leagueId = 1356;
      break;
  }
  return leagueId;
}

exports.leagueSelectorFrontEnd = leagueSelectorFrontEnd;