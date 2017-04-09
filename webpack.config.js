const path = require('path'),
      webpack = require('webpack');

module.exports = {
	entry: './components/index.js',
	output: {
		path: `${__dirname}/public`,
		filename: 'scripts.js'
	},
	module: {
		loaders: [{
			test: /.js?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: [
					'latest',
					'react'
				],
				plugins: [
					'transform-class-properties'
				]
			}
		}]
	}
};