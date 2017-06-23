// server.js

const config = require('./config.js'),
	database = `${config.DATABASE_URL}`,
	path = require('path'),
	fs = require('fs'),
	express = require('express'),
	bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	gStrategy = require('passport-google-oauth20').Strategy,
	bStrategy = require('passport-http-bearer').Strategy,
	app = express(),
	server = require('http').Server(app),
	User = require('./models/user_model.js'),
	createData = require('./programFunctions/crud_functions.js').createData,
	readData = require('./programFunctions/crud_functions.js').readData,
	updateData = require('./programFunctions/crud_functions.js').updateData,
	deleteData = require('./programFunctions/crud_functions.js').deleteData,
	routes = require('./routes.js').router,
	playerInfo = require('./programFunctions/apiToDatabase_functions.js').playerInfo;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
// app.use('/user', routes);
app.get('*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/index.html`));
});

console.log('Server Started');

let runServer = () => {
	mongoose.connect(database, () => {
		app.listen(config.PORT, () => {
			console.log(`Listening on port: ${config.PORT}`);
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