const path = require('path');

module.exports = {
	context: __dirname,
	mode: 'development',
	entry: {
		app: path.resolve(__dirname, 'src/index.jsx')
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/public/'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			}
		]
	}
};