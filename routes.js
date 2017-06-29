const express = require('express'),
	fs = require('fs'),
	path = require('path'),
	config = require('./config.js'),
	passport = require('passport'),
	gStrategy = require('passport-google-oauth20').Strategy,
	bStrategy = require('passport-http-bearer').Strategy,
  router = express.Router(),
  User = require("./models/user_model.js");

passport.use(new gStrategy({
	clientID: '37522725082-dlubl11l5pbgcibrtq5r40og5m1af9jd.apps.googleusercontent.com',
	clientSecret: config.SECRET,
	callbackURL: `https://${process.env.C9_HOSTNAME}/user/auth/google/callback` //`${process.env.IP}${config.PORT}/user/auth/google/callback`
},
	(accessToken, refreshToken, profile, callback) => {
		User.findOneAndUpdate({
			googleId: profile.id
		}, {accessToken}, {new: true, upsert: true})
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
    	console.log('line 32');
      return done(null, user);
    })
    .catch(error => {
      console.log(`passport accessToken error: ${error}`);
    });
  }
));

router.get('/auth/google', passport.authenticate('google', {scope: 'profile'}));

router.get('/auth/google/callback', passport.authenticate('google', {
	failureRedirect: '/',
	session: false
}),(req, res) => {
	fs.readFile(path.join(__dirname, 'public/index.html'), (error, html) => {
		if (error) console.log(`readFile error: ${error}`);
		html = html.toString();
		html = html.replace('<!--{script}-->', `<script>let AUTH_TOKEN="${req.user.accessToken}"; history.replaceState(null, null, '/user');</script>`);
		res.send(html);
	});
});

// returns user's own page
router.get('/user', passport.authenticate('bearer', {session: false}), (req, res) => {
	return res.send(`https://${process.env.C9_HOSTNAME}/user`);
});

exports.router = router;