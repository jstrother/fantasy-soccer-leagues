const path = require("path"),
  webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  
module.exports = {
  entry: "./components/index.js",
  output: {
    path: `${__dirname}/public`,
    filename: "scripts.js"
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "public"),
    disableHostCheck: true
  },
  module: {
  	rules: [
	    {
	      test: /.js?$/,
	      use: [
	    		{
	    			loader: "babel-loader",
	    			options: {
	    				babelrc: false,
	    				presets: [
	    					"@babel/preset-env",
	    					"@babel/preset-react"
	    				],
	    				plugins: [
	    					"react-css-modules"	
	    				]
	    			}
	    		}	
	      ],
	      exclude: /node_modules/
	    },
	    {
	      test: /.scss$/,
	      use: ExtractTextPlugin.extract({
	        fallback: 'style-loader',
	        use: [
	          {
	            loader: "css-loader",
	            options: {
	              minimize: true,
	              sourceMap: true
	            }
	          },
	          {
	          	loader: "postcss-loader"
	          },
	          {
	            loader: "sass-loader",
	            options: {
	              sourceMap: true
	            }
	          }
	        ]
	      })
	    }
	  ]
  },
  plugins: [
    // new UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: path.join(__dirname, "public/styles.css")
    })
  ]
};