exports.DATABASE_URL =
	'mongodb://gameUser:gamePassword@ds059125.mlab.com:59125/fantasy-soccer-leagues-restore';

exports.PORT = process.env.PORT || 8080;

exports.API_KEY =
	'?api_token=2GWcdMDb3ppwcmdLrkD8JcXaaR5RmR91dHbgA6TnyCA8ik8kj3jnaUY2Xga3';

exports.CLIENT_SECRET = 'yIs-UYd9Rqqe8GVS1DRB5Aij';

exports.CLIENT_ID =
	'37522725082-dlubl11l5pbgcibrtq5r40og5m1af9jd.apps.googleusercontent.com';

exports.LEAGUE_LOOP_REPEAT_TIME = 30 * 60 * 1000; // # of minutes league loop should repeat; also helps limit continuous looping of playerIdArrays to once per league loop

exports.GOOGLE_ACCESSTOKEN =
	'ya29.Gl3vBP_DwCPG10kREzfknjRrfnLpGconcOme8xAf0A3SAREnkP3IMg4S97B1KNn7n5TWyysdj4z3aD9yRPD9z72K0RCtl0OY5ujzij4zN2HR11HWHONXqzujpVQ_T8U';

exports.DEV_DIRECTORY = 'http://127.0.0.1:8080';

exports.PROD_DIRECTORY = 'https://the-fsfsl.herokuapp.com';
