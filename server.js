// server.js

const path = require('path'),
			express = require('express'),
			bodyParser = require('body-parser'),
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

let runServer = callback => {
	mongoose.connect(config.DATABASE_URL, err => {
		if (err && callback) {
			return callback(err);
		}
		app.listen(config.PORT, () => {
			console.log(`Listening on localhost: ${config.PORT}`);
			if (callback) {
				callback();
			}
		});
	});
};

if (require.main === module) {
	runServer(err => {
		if (err) {
			console.error(err);
		}
	});
};

exports.app = app;
exports.runServer = runServer;