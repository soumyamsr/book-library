const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: ['./client/src/index.tsx'],
	devtool: 'inline-source-map',
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'client/dist'),
		publicPath: ' ',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'client/public', 'index.html'),
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	module: {
		rules: [{
			test: /\.(scss|css)$/,
			use: ['style-loader', 'css-loader', 'sass-loader'],
		},
		{
			test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
			exclude: /icons/,
			use: ['file-loader'],
		},
		{
			test: /\.svg(\?\S*)?$/,
			use: ['file-loader'],
		},
		{
			test: /\.(gif|jpg|png|ico)(\?\S*)?$/,
			use: ['url-loader'],
		},
		{ test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: /node_modules/ },
		{
			enforce: 'pre',
			test: /\.js$/,
			loader: 'source-map-loader',
		}],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '/index.tsx', '/index.ts'],
		alias: {
			Components: path.resolve(__dirname, 'client/src/components'),
			Containers: path.resolve(__dirname, 'client/src/containers'),
			Styles: path.resolve(__dirname, 'client/src/styles'),
		},
	},
	devServer: {
    contentBase: path.join(__dirname, 'dist'),
		historyApiFallback: true,
		publicPath: 'public',
	},
};
