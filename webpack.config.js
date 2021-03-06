const webpack = require('webpack');
const path = require('path');

module.exports = {
	context: __dirname,
	mode: 'development',
	entry: {
		app: path.resolve(__dirname, './src/index.tsx')
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js',
		publicPath: '/public/'
	},
	devServer: {
		hot: true,
		publicPath: '/public/',
		historyApiFallback: true
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
	module: {
		rules: [
			/* {
				enforce: 'pre',
				test: /\.jsx?$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			}, */
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			}
		]
	}
};
