// server.js

const config = require('./config.js'),
	database = `${config.DATABASE_URL}`,
	port = `${config.PORT}`,
	path = require('path'),
	express = require('express'),
	bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	app = express(),
	server = require('http').Server(app),
	routes = require('./routes.js').router,
	intervalLoop = require('./programFunctions/intervalLoop_function.js'),
	playerStatsByLeague = require('./programFunctions/playerStatsByLeague_function.js'),
	timeFrame = require('./config.js').LEAGUE_LOOP_REPEAT_TIME,
	leagueIdArray = require('./config.js').LEAGUE_ID_ARRAY;

app.use(jsonParser);
app.use(express.static('public'));
app.use(passport.initialize());
app.use('/user', routes);
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

console.log('Server Started');

let runServer = () => {
	mongoose.connect(database, () => {
		app.listen(port, () => {
			console.log(`Listening on port: ${port}`);
		});
		playerStatsByLeague(779);
		// call loop function starting at 0 to properly iterate through leagueIdArray.length
		intervalLoop(playerStatsByLeague, leagueIdArray, 0, timeFrame);
	})
	.catch(error => {
		console.error(`mongoose connect error: ${error}`);
	});
};

// this function is to call any function and feed it 1 key of an array once every loopTime

if (require.main === module) {
	runServer();
}

exports.app = app;
exports.runServer = runServer;