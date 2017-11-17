// server.js

const config = require('./config.js'),
	DATABASE = `${config.DATABASE_URL}`,
	PORT = `${config.PORT}`,
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
	loopFunction = require('./programFunctions/loopFunction_function.js'),
	playerStatsByLeague = require('./programFunctions/playerStatsByLeague_function.js'),
	leagues = require('./league_ids_names.js').LEAGUE_IDS_NAMES,
	leagueLoopTime = require('./config.js').LEAGUE_LOOP_REPEAT_TIME;
	
app.use(jsonParser);
app.use(express.static('public'));
app.use(passport.initialize());
app.use('/user', userRoutes);
app.use('/user/addLeague/:googleId', userRoutes);
app.use('/player', playerRoutes);
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

const runServer = (port = PORT, database = DATABASE) => {
	return new Promise((resolve, reject) => {
		console.log('Server Started');
		mongoose.connect(database, error => {
			if (error) {
				return reject(error);
			}
			app.listen(port, () => {
				resolve();
				console.log(`Listening on port: ${port}`);
			});
			loopFunction(leagues, playerStatsByLeague, leagueLoopTime, true);
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

module.exports = {
	app,
	runServer
};