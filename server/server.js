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
	userRoutes = require('./user-routes.js').userRouter,
	playerRoutes = require('./player-routes.js').playerRouter,
	loopArray = require('./programFunctions/loopArray_function.js'),
	playerStatsByLeague = require('./programFunctions/playerStatsByLeague_function.js'),
	leagueIdArray = require('./config.js').LEAGUE_ID_ARRAY,
	leagueLoopTime = require('./config.js').LEAGUE_LOOP_REPEAT_TIME;
	
app.use(jsonParser);
app.use(express.static('public'));
app.use(passport.initialize());
app.use('/user', userRoutes);
app.use('/player', playerRoutes);
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

console.log('Server Started');

const runServer = (database = database) => {
	return new Promise((resolve, reject) => {
		mongoose.connect(database, error => {
			if (error) {
				return reject(error);
			}
			app.listen(port, () => {
				resolve();
				console.log(`Listening on port: ${port}`);
			});
			// loopArray(leagueIdArray, playerStatsByLeague, leagueLoopTime, true);
			console.log('Do not forget to uncomment the loopArray function in server.js');
		})
		.catch(error => {
			throw new Error(error);
		});
	}
)};

if (require.main === module) {
	runServer();
}

exports.app = app;
exports.runServer = runServer;