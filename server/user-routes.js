const express = require('express'),
	config = require('./config.js'),
	passport = require('passport'),
	gStrategy = require('passport-google-oauth20').Strategy,
	bStrategy = require('passport-http-bearer').Strategy,
  userRouter = express.Router(),
  User = require('../models/user_model.js'),
  cookieExpire = 1000 * 60 * 60 * 12; // set to expire after 12 hours

passport.use(new gStrategy({
	clientID: config.CLIENT_ID,
	clientSecret: config.CLIENT_SECRET,
	callbackURL: `https://${process.env.C9_HOSTNAME}/user/auth/google/callback` //`${process.env.IP}${config.PORT}/user/auth/google/callback`
},
	(accessToken, refreshToken, profile, callback) => {
		User.findOneAndUpdate({
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
    })
		.then(user => {
			callback(null, user);
		})
		.catch(error => {
			throw new Error(error);
		});
	}
));

passport.use(new bStrategy((token, done) => {
	User.find({
		accessToken: token
	}, (error, user) => {
		if (error) return done(error);
		if (!user) return done(null, false);
		//user gets returned as an array of one, make sure to select properly
		return done(null, user[0]);
	});
}));

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
		userPhoto: req.user.userPhoto,
		fantasyLeagueId: req.user.fantasyLeagueId,
		fantasyLeagueName: req.user.fantasyLeagueName
	})
);

// adds user's selected league
userRouter.put('/addLeague',
	passport.authenticate('bearer', {session: false}),
	(req, res) => {
		User.findOneAndUpdate(
			req.params.googleId,
			{
				fantasyLeagueId: req.body.fantasyLeagueId,
				fantasyLeagueName: req.body.fantasyLeagueName
			},
			{
				new: true,
				upsert: true
			}
		)
		.then(data => {
			res.json(data);
		})
		.catch(error => {
			throw new Error(error);
		});
	}
);

exports.userRouter = userRouter;