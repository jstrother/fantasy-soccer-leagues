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
    contentBase: "./public",
    hot: true,
    proxy: {
    	"/user/auth/google": "https://fantasy-soccer-leagues-jstrother.c9users.io/"
    },
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
	              modules: true,
	              sourceMap: true,
	              localIdentName: "[name]__[local]__[hash:base64:5]"
	            }
	          },
	          {
	          	loader: "postcss-loader",
	          	options: {
	          		ident: "postcss",
	          		sourceMap: true,
	          		plugins: [
	          			require("autoprefixer")()
	          		]
	          	}
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
      filename: "styles.css",
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};