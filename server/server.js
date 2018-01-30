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
	userRouter = require('./user-routes.js').userRouter,
	playerRouter = require('./player-routes.js').playerRouter,
	leagueRouter = require('./league-routes.js').leagueRouter,
	fantasyClubRouter = require("./fantasyClub-routes.js").fantasyClubRouter,
	loopFunction = require('./programFunctions/loopFunction_function.js'),
	playerStatsByLeague = require('./programFunctions/playerStatsByLeague_function.js'),
	leagues = require('./league_ids_names.js').LEAGUE_IDS_NAMES,
	leagueLoopTime = 30 * 60 * 1000; // first number is number of minutes loop repeats
	
app.use(jsonParser);
app.use(express.static('public'));
app.use(passport.initialize());
app.use('/user', userRouter);
app.use('/player', playerRouter);
app.use('/league', leagueRouter);
app.use('/fantasyClub', fantasyClubRouter);
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

mongoose.Promise = Promise;

const runServer = (port = PORT, database = DATABASE) => {
	return new Promise((resolve, reject) => {
		console.log('Server Started');
		mongoose.connect(database,
		{
			useMongoClient: true
		},
		error => {
			if (error) {
				return reject(error);
			}
			server.listen(port, () => {
				resolve();
				console.log(`Listening on port: ${port}`);
			});
			// loopFunction(leagues, playerStatsByLeague, leagueLoopTime, true);
			console.log('Do not forget to uncomment the loopFunction in server.js: line 43');
			console.log('No longer using API as cost jumped to $200/month. Can\'t afford that as a student.');
		})
		.catch(error => {
			throw new Error(error);
		});
	}
)};

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