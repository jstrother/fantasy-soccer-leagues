// server.js

const path = require('path'),
	express = require('express'),
	bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	app = express(),
	server = require('http').Server(app),
	config = require('./config.js'),
	User = require('./models/user_model.js'),
	createData = require('./programFunctions/crud_functions.js').createData;

app.use(bodyParser.json());
app.use(express.static('public'));
app.get('*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/index.html`));
});

console.log('Server Started');

// creates a new user
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
	
	let name = req.body.name,
		userName = req.body.userName,
		userPassword = req.body.userPassword,
		userEmail = req.body.userEmail,
		teamName = req.body.teamName;
		
	if (typeof name !== 'string') {
		return res.status(422).json({
			message: 'Incorrect field type: Name'
		});
	}
	else if (name === '') {
		return res.status(422).json({
			message: 'Incorrect field length: Name'
		});
	}
	
	if (typeof userName !== 'string') {
		return res.status(422).json({
			message: 'Incorrect field type: User Name'
		});
	}
	else if (userName === '') {
		return res.status(422).json({
			message: 'Incorrect field length: User Name'
		});
	}
	
	if (typeof userPassword !== 'string') {
		return res.status(422).json({
			message: 'Incorrect field type: User Password'
		});
	}
	else if (userPassword === '') {
		return res.status(422).json({
			message: 'Incorrect field length: User Password'
		});
	}
	
	if (typeof userEmail !== 'string') {
		return res.status(422).json({
			message: 'Incorrect field type: User Email'
		});
	}
	else if (userEmail === '') {
		return res.status(422).json({
			message: 'Incorrect field length: User Email'
		});
	}
	
	if (typeof teamName !== 'string') {
		return res.status(422).json({
			message: 'Incorrect field type: Team Name'
		});
	}
	else if (teamName === '') {
		return res.status(422).json({
			message: 'Incorrect field length: Team Name'
		});
	}
	
	let user = {
		name,
		userName,
		userPassword,
		userEmail,
		teamName
	};
	
	createData(user, User);
	
	user.save(() => {
		return res.status(201).json({
			message: 'User Create'
		});
	})
	.catch(error => {
		return res.status(500).json({
			message: 'Internal Server Error'
		});
	});
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