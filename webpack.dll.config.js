const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const library = '[name]_lib'
const path = require('path')

module.exports = {
	entry: {
		vendors: [
			'moment',
			'antd',
			'react',
			'react-dom',
			'react-router-dom',
			'redux',
			'react-redux',
			'babel-polyfill',
			'react-dnd',
			'react-dnd-html5-backend',
			'lodash-es'
		]
	},
  mode: 'production',
	output: {
		filename: '[name].[chunkhash:8].js',
		path: path.resolve('public/static/js/'),
		library
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.DllPlugin({
			path: path.join(__dirname, 'public/[name]-manifest.json'),
			// This must match the output.library option above
			name: library
		})
	]
}
