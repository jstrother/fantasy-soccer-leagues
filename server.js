// server.js

const path = require('path'),
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
	config = require('./config.js'),
	User = require('./models/user_model.js'),
	createData = require('./programFunctions/crud_functions.js').createData,
	readData = require('./programFunctions/crud_functions.js').readData,
	updateData = require('./programFunctions/crud_functions.js').updateData,
	deleteData = require('./programFunctions/crud_functions.js').deleteData,
	database = `${config.DATABASE_URL}`,
	playerInfo = require('./programFunctions/apiToDatabase_functions.js').playerInfo,
	routes = require('./routes.js').router;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.get('*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/index.html`));
});

console.log('Server Started');

mongoose.connect(database);

app.use('/user', routes);

let runServer = () => {
	mongoose.connect(config.DATABASE_URL, () => {
		app.listen(config.PORT, () => {
			console.log(`Listening on port: ${config.PORT}`);
		});
	})
	.catch(error => {
		console.error(`mongoose connect error: ${error.name}, code: ${error.code}, message: ${error.errmsg}`);
	});
};

if (require.main === module) {
	runServer();
}

exports.app = app;
exports.runServer = runServer;