const path = require('path'),
      webpack = require('webpack');

module.exports = {
	entry: './components/index.js',
	output: {
		path: `${__dirname}/public`,
		filename: 'scripts.js',
		libraryTarget: 'umd'
	},
  externals: {
    React: 'react',
  },
	target: 'node',
	devtool: 'source-map',
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
					'transform-class-properties',
					// new webpack.DefinePlugin({
     //       'process.env.NODE_ENV': 'development'
     //   	})
				]
			}
		}]
	}
};