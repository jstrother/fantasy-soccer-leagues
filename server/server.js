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
	playerStatsByLeague = require('./programFunctions/api_functions.js').playerStatsByLeague,
	leagueSelector = require('./programFunctions/api_functions.js').leagueSelector;

app.use(jsonParser);
app.use(express.static('public'));
app.use(passport.initialize());
app.use('/user', routes);
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

console.log('Server Started');

let runServer = () => {
	mongoose.connect(database, () => {
		app.listen(port, () => {
			console.log(`Listening on port: ${port}`);
			playerStatsByLeague(779);
		});
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