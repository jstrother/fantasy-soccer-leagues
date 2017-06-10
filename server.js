// server.js

const path = require('path'),
	fs = require('fs'),
	express = require('express'),
	bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
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
	database = `${config.DATABASE_URL}/collections/users`;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.get('*', (req, res) => {
	res.sendFile(path.join(`${__dirname}/public/index.html`));
});

console.log('Server Started');

// the following 2 passport.use and then the first 3 app.get for secure login
passport.use(new gStrategy({
	clientID: '37522725082-dlubl11l5pbgcibrtq5r40og5m1af9jd.apps.googleusercontent.com',
	clientSecret: config.SECRET,
	callbackURL: `${process.env.IP}${config.PORT}/auth/google/callback`
},
	(accessToken, refreshToken, profile) => {
		let user = database[accessToken] = {
			googleId: profile.id,
			accessToken
		};
		return user;
	}	
));

passport.use(new bStrategy((token, done) => {
	return (token in database) ? done(null, database[token]) : done(null, false);
}));

app.get('/auth/google', passport.authenticate('google', {scope: 'profile'}));

app.get('auth/google/callback', passport.authenticate('google', {
	failureRedirect: '/login',
	session: false
}),(req, res) => {
	fs.readFile('/user/logged-in.html', html => {
		html = html.toString();
		html = html.replace('<!--{script}-->', `<script>let AUTH_TOKEN=${req.user.accessToken}; history.replaceState(null, null, '/logged-in.html';</script>`);
		res.send(html);
	})
	.catch(error => {
		res.status(500).json({
			message: 'Internal Server Error'
		});
	});
});

app.get('/restricted', passport.authenticate('bearer', {session: false}), (req, res) => {
	return res.send('Restricted Zone');
});

// logs in a user
app.get('/user', (req, res) => {
	let userName = req.body.userName,
		userPassword = req.body.userPassword,
		user = {
			userName,
			userPassword
		};
	readData(user, User);
});

// creates a new user
app.post('/user', jsonParser, (req, res) => {
	switch (req.body) {
		case (!req.body):
			return res.status(400).json({
				message: 'No request body'
			});
		case (!req.body.name):
			return res.status(422).json({
				message: 'Missing field: Name'
			});
		case (!req.body.userName):
			return res.status(422).json({
				message: 'Missing field: User Name'
			});
		case (!req.body.userPassword):
			return res.status(422).json({
				message: 'Missing field: User Password'
			});
		case (!req.body.userEmail):
			return res.status(422).json({
				message: 'Missing field: User Email'
			});
		case (!req.body.teamName):
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
	
	bcrypt.genSalt(10, salt => {
		bcrypt.hash(userPassword, salt, hash => {
			let user = {
				name,
				userName,
				userPassword: hash,
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
		})
		.catch(error => {
			return res.status(500).json({
				message: 'Internal Server Error'
			});
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