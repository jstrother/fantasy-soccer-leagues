// server.js

const path = require('path'),
	express = require('express'),
	bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	mongoose = require('mongoose'),
	app = express(),
	server = require('http').Server(app),
	config = require('./config.js');

app.use(bodyParser.json());
app.use(express.static('public'));
app.get('*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/index.html`));
});

console.log('Server Started');

app.post('/user', jsonParser, (req, res) => {
	switch (req.body) {
		case (!req.body):
			return res.status(400).json({
				message: 'No request body'
			});
		case (!('name' in req.body)):
			return res.status(422).json({
				message: 'Missing field: Name'
			});
		case (!('userName' in req.body)):
			return res.status(422).json({
				message: 'Missing field: User Name'
			});
		case (!('userPassword' in req.body)):
			return res.status(422).json({
				message: 'Missing field: User Password'
			});
		case (!('userEmail' in req.body)):
			return res.status(422).json({
				message: 'Missing field: User Email'
			});
		case (!('teamName' in req.body)):
			return res.status(422).json({
				message: 'Missing field: Team Name'
			});
	}
});

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