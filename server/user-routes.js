const express = require('express'),
	config = require('./config.js'),
	passport = require('passport'),
	gStrategy = require('passport-google-oauth20').Strategy,
	bStrategy = require('passport-http-bearer').Strategy,
  userRouter = express.Router(),
  { createData, readData, updateData, deleteData } = require('./programFunctions/crud_functions.js'),
  User = require('../models/user_model.js');

passport.use(new gStrategy({
	clientID: config.CLIENT_ID,
	clientSecret: config.CLIENT_SECRET,
	callbackURL: `https://${process.env.C9_HOSTNAME}/user/auth/google/callback` //`${process.env.IP}${config.PORT}/user/auth/google/callback`
},
	(accessToken, refreshToken, profile, callback) => {
		updateData({
			googleId: profile.id,
			displayName: profile.displayName,
			givenName: profile.name.givenName,
			familyName: profile.name.familyName,
			userPhoto: profile.photos[0].value
		},
    {
      $set: {
        accessToken: accessToken,
        googleId: profile.id
      }
    }, User)
		.then(user => {
			callback(null, user);
		})
		.catch(error => {
			throw new Error(error);
		});
	}
));

passport.use(new bStrategy((token, done) => {
    readData({accessToken: token}, User)
    .then(user => {
      if (user) {
      	return done(null, user);
      }
    })
    .catch(error => {
      throw new Error(error);
    });
  })
);

userRouter.get('/auth/google', 
	passport.authenticate('google', {
		scope: ['profile']
	})
);

userRouter.get('/auth/google/callback', 
	passport.authenticate('google', {
		failureRedirect: '/',
		session: false
	}),
	(req, res) => {
	res.cookie('accessToken', req.user.accessToken, { expires: 0 });
	res.redirect('/');
	}
);

userRouter.get('/auth/logout',
	(req, res) => {
		req.logout();
		res.clearCookie('accessToken');
		res.redirect('/');
	}
);

// returns user's own page
userRouter.get('/', 
	passport.authenticate('bearer', {session: false}), 
	(req, res) => res.json({
		googleId: req.user.googleId,
		displayName: req.user.displayName,
		givenName: req.user.givenName,
		familyName: req.user.familyName,
		userPhoto: req.user.userPhoto
	})
);

// adds user's selected league
userRouter.put('/addLeague',
	(req, res) => {
		console.log('req.body:', req.body);
		return res.json({
			fantasyLeagueId: req.body.fantasyLeagueId,
			fantasyLeagueName: req.body.fantasyLeagueName
		});
	}
);

exports.userRouter = userRouter;