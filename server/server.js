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
	loopFunction = require('./programFunctions/loopFunction_function.js'),
	playerStatsByLeague = require('./programFunctions/playerStatsByLeague_function.js'),
	leagues = require('./league_ids_names.js').LEAGUE_IDS_NAMES,
	leagueLoopTime = require('./config.js').LEAGUE_LOOP_REPEAT_TIME;
	
app.use(jsonParser);
app.use(express.static('public'));
app.use(passport.initialize());
app.use('/user', userRouter);
app.use('/player', playerRouter);
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
			server.listen(port, () => {
				resolve();
				console.log(`Listening on port: ${port}`);
			});
			// loopFunction(leagues, playerStatsByLeague, leagueLoopTime, true);
			console.log('Do not forget to uncomment the loopFunction in server.js');
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
        // so we don't also call `resolve()`
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