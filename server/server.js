/*eslint-disable no-unused-vars, no-console*/

// server.js

const config = require('./config.js'),
	DATABASE = `${config.DATABASE_URL}`,
	PORT = `${config.PORT}`,
	path = require('path'),
	express = require('express'),
	jsonParser = require('body-parser').json(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	app = express(),
	server = require('http').Server(app),
	{ userRouter } = require('./user-routes.js'),
	{ playerRouter } = require('./player-routes.js'),
	{ leagueRouter } = require('./league-routes.js'),
	{ fantasyClubRouter } = require('./fantasyClub-routes.js'),
	{ fantasyScheduleRouter } = require('./fantasySchedule-routes.js'),
	{ leagueStandingsRouter } = require('./leagueStandings-routes.js'),
	{ matchResolver } = require("./programFunctions/matchResolver_function.js"),
	{ scheduleRetriever } = require("./programFunctions/scheduleRetriever_function.js"),
	loopFunction = require('./programFunctions/loopFunction_function.js'),
	playerStatsByLeague = require('./programFunctions/playerStatsByLeague_function.js'),
	leagues = require('./league_ids_names.js').LEAGUE_IDS_NAMES,
	leagueLoopTime = `${config.LEAGUE_LOOP_REPEAT_TIME}`;

app.use(jsonParser);
app.use(express.static('public'));
app.use(passport.initialize());
app.use('/user', userRouter);
app.use('/player', playerRouter);
app.use('/league', leagueRouter);
app.use('/fantasyClub', fantasyClubRouter);
app.use('/fantasySchedule', fantasyScheduleRouter);
app.use('/leagueStandings', leagueStandingsRouter);
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

mongoose.Promise = Promise;

const runServer = (database = DATABASE, port = PORT) => {
	return new Promise((resolve, reject) => {
		console.log('Server Started');
		mongoose.connect(database,
		error => {
			if (error) {
				return reject(error);
			}
			server.listen(port, () => {
				resolve();
				console.log(`Listening on port: ${port}`);
			});
			// loopFunction(leagues, playerStatsByLeague, leagueLoopTime, true);
			console.log('Do not forget to uncomment the loopFunction in server.js: line 55');
			console.log('No longer using API as cost jumped to $200/month. Can\'t afford that as a student.');
		})
		.catch(error => {
			throw new Error(error);
		});
	});
};

const closeServer = () => {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call resolve()
        return;
      }
      resolve();
    });
  });
};



if (require.main === module) {
	runServer();
}

module.exports = {
	app,
	runServer,
	closeServer
};