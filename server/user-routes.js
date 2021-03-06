const config = require('./config.js'),
	passport = require('passport'),
	gStrategy = require('passport-google-oauth20').Strategy,
	bStrategy = require('passport-http-bearer').Strategy,
	userRouter = require('express').Router(),
	callbackURL = `${config.DIRECTORY}/user/auth/google/callback`,
	User = require('../models/user_model.js');

passport.use(
	new gStrategy(
		{
			clientID: config.CLIENT_ID,
			clientSecret: config.CLIENT_SECRET,
			callbackURL
		},
		(accessToken, refreshToken, profile, callback) => {
			User.findOneAndUpdate(
				{
					googleId: profile.id,
					displayName: profile.displayName,
					givenName: profile.name.givenName,
					familyName: profile.name.familyName,
					userPhoto: profile.photos[0].value
				},
				{
					$set: {
						accessToken,
						refreshToken,
						googleId: profile.id
					}
				},
				{
					new: true,
					upsert: true
				}
			)
				.then(user => {
					callback(null, user);
				})
				.catch(error => {
					throw new Error(error);
				});
		}
	)
);

passport.use(
	new bStrategy((token, done) => {
		User.findOne(
			{
				accessToken: token
			},
			(error, user) => {
				if (error) return done(error);
				if (!user) return done(null, false);
				return done(null, user, { scope: 'all' });
			}
		);
	})
);

userRouter.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile']
	})
);

userRouter.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/',
		session: false
	}),
	(req, res) => {
		res.cookie('accessToken', req.user.accessToken, { expires: 0 });
		res.redirect('/');
	}
);

userRouter.get('/auth/logout', (req, res) => {
	req.logout();
	res.clearCookie('accessToken');
	res.redirect('/');
});

// returns user's own page
userRouter.get(
	'/',
	passport.authenticate('bearer', { session: false }),
	(req, res) =>
		res.json({
			userId: req.user._id,
			accessToken: req.user.accessToken,
			googleId: req.user.googleId,
			displayName: req.user.displayName,
			givenName: req.user.givenName,
			familyName: req.user.familyName,
			userPhoto: req.user.userPhoto,
			fantasyLeagueId: req.user.fantasyLeagueId,
			fantasyLeagueName: req.user.fantasyLeagueName,
			hasClub: req.user.hasClub
		})
);

// adds user's selected league
userRouter.put(
	`/selectLeague`,
	passport.authenticate('bearer', { session: false }),
	(req, res) =>
		User.findOneAndUpdate(
			req.params.googleId,
			{
				userId: req.body.userId,
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
			})
);

// lets us know whether a user has created a club yet or not
userRouter.put(
	`/clubOwner`,
	passport.authenticate('bearer', { session: false }),
	(req, res) =>
		User.findOneAndUpdate(
			req.params.googleId,
			{
				userId: req.body.userId,
				hasClub: req.body.hasClub
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
			})
);

exports.userRouter = userRouter;
