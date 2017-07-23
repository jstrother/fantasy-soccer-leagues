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
	loopArray = require('./programFunctions/loopArray_function.js'),
	playerStatsByLeague = require('./programFunctions/playerStatsByLeague_function.js'),
	leagueIdArray = require('./config.js').LEAGUE_ID_ARRAY,
	leagueLoopTime = require('./config.js').LEAGUE_LOOP_REPEAT_TIME;

app.use(jsonParser);
app.use(express.static('public'));
app.use(passport.initialize());
app.use('/user', routes);
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

console.log('Server Started');

const runServer = () => {
	mongoose.connect(database, () => {
		app.listen(port, () => {
			console.log(`Listening on port: ${port}`);
		});
		loopArray(leagueIdArray, playerStatsByLeague, leagueLoopTime, true);
	})
	.catch(error => {
		console.error(`mongoose connect error: ${error}`);
	});
};

if (require.main === module) {
	runServer();
}

exports.app = app;
exports.runServer = runServer;