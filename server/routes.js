const express = require('express'),
	config = require('./config.js'),
	passport = require('passport'),
	gStrategy = require('passport-google-oauth20').Strategy,
	bStrategy = require('passport-http-bearer').Strategy,
  router = express.Router(),
  User = require("../models/user_model.js");

passport.use(new gStrategy({
	clientID: config.CLIENT_ID,
	clientSecret: config.CLIENT_SECRET,
	callbackURL: `https://${process.env.C9_HOSTNAME}/user/auth/google/callback` //`${process.env.IP}${config.PORT}/user/auth/google/callback`
},
	(accessToken, refreshToken, profile, callback) => {
		// console.log(profile);
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
    },
    {
    	new: true, 
    	upsert: true
    })
		.then(user => {
			callback(null, user);
		})
		.catch(error => {
			console.log(`accessToken error: ${error}`);
		});
	}	
));

passport.use(new bStrategy((token, done) => {
    User.findOne({accessToken: token})
    .then(user => {
      if (user) {
      	return done(null, user);
      }
    })
    .catch(error => {
      console.log(`passport accessToken error: ${error}`);
    });
  })
);

router.get('/auth/google', 
	passport.authenticate('google', {
		scope: ['profile']
	})
);

router.get('/auth/google/callback', 
	passport.authenticate('google', {
		failureRedirect: '/',
		session: false
	}),
	(req, res) => {
	res.cookie('accessToken', req.user.accessToken, { expires: 0 });
	res.redirect('/');
	}
);

router.get('/auth/logout', (req, res) => {
	req.logout();
	res.clearCookie('accessToken');
	res.redirect('/');
});

// returns user's own page
router.get('/', 
	passport.authenticate('bearer', {session: false}), 
	(req, res) => res.json({
		googleId: req.user.googleId,
		displayName: req.user.displayName,
		givenName: req.user.givenName,
		familyName: req.user.familyName,
		userPhoto: req.user.userPhoto
	})
);

exports.router = router;