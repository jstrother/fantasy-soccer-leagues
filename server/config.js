/* eslint-disable no-unused-vars */

exports.DATABASE_URL =
	'mongodb://gameUser:gamePassword@ds059125.mlab.com:59125/fantasy-soccer-leagues-restore';

exports.PORT = process.env.PORT || 8080;

exports.API_KEY =
	'?api_token=2GWcdMDb3ppwcmdLrkD8JcXaaR5RmR91dHbgA6TnyCA8ik8kj3jnaUY2Xga3';

exports.CLIENT_SECRET = 'yIs-UYd9Rqqe8GVS1DRB5Aij';

exports.CLIENT_ID =
	'37522725082-dlubl11l5pbgcibrtq5r40og5m1af9jd.apps.googleusercontent.com';

exports.LEAGUE_LOOP_REPEAT_TIME = 30 * 60 * 1000; // # of minutes league loop should repeat; also helps limit continuous looping of playerIdArrays to once per league loop

const DEV_DIRECTORY = 'http://127.0.0.1:8080';

exports.DIRECTORY = DEV_DIRECTORY;

// const PROD_DIRECTORY = 'https://the-fsfsl.herokuapp.com';

// exports.DIRECTORY = PROD_DIRECTORY;
