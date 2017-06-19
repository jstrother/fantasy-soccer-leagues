const 
	express = require('express'),
	fs = require('fs'),
	config = require('./config.js'),
	passport = require('passport'),
	gStrategy = require('passport-google-oauth20').Strategy,
	bStrategy = require('passport-http-bearer').Strategy,
	database = `${config.DATABASE_URL}`,
  router = express.Router(),
  User = require("./models/user_model.js");

// the following 2 passport.use and then the first 3 app.get for secure login
passport.use(new gStrategy({
	clientID: '37522725082-dlubl11l5pbgcibrtq5r40og5m1af9jd.apps.googleusercontent.com',
	clientSecret: config.SECRET,
	callbackURL: `https://${process.env.C9_HOSTNAME}/auth/google/callback` //`${process.env.IP}${config.PORT}/auth/google/callback`
},
	(accessToken, refreshToken, profile) => {
		let user = User.findOneAndUpdate({
			googleId: profile.id,
			accessToken
		});
		return user;
	}	
));

passport.use(new bStrategy((token, done) => {
    User.findOne({accessToken: token})
    .then(user => {
      return done(null, user);
    })
    .catch(error => {
      console.log(`passport accessToken error: ${error}`);
    });
  }
));

router.get('/auth/google', passport.authenticate('google', {scope: 'profile'}));

router.get('auth/google/callback', passport.authenticate('google', {
	failureRedirect: '/',
	session: false
}),(req, res) => {
	fs.readFile('/user', html => {
		html = html.toString();
		html = html.replace('<!--{script}-->', `<script>let AUTH_TOKEN=${req.user.accessToken}; history.replaceState(null, null, '/user';</script>`); //this is trying to replace the commented {script} with inline js, but not sure which file to place it into, currently in components/main.js:16
		res.send(html);
	})
	.catch(error => {
		res.status(500).json({
			message: 'Internal Server Error'
		});
	});
});

// returns user's own page
router.get('/user', passport.authenticate('bearer', {session: false}), (req, res) => {
	return res.send(`https://${process.env.C9_HOSTNAME}/user`);
});

exports.router = router;