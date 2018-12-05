const PORT = 3010;
const PROXY = 3000;

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	entry: ['@babel/polyfill', './src/app.ts'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './js/bundle.js'
	},
	devServer: {
		contentBase: './dist/',
		port: PORT,
		// proxy: {
    //   '*': {
		// 		target: 'http://marthas-gardening.dd/',
		// 		changeOrigin: true
    //   }
    // }
	},
	module: {
		rules: [{
				test: /\.tsx?$/,
				loader: 'babel-loader',
			}, {
				test: /\.js$/,
				use: ["source-map-loader"],
				enforce: "pre"
			},
			{
				test: /\.scss$/,
				use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					'file-loader?name=./img/[name].[ext]',
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							gifsicle: {
								interlaced: false
							},
							// the webp option will enable WEBP
							webp: {
								quality: 75
							}
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader?name=./fonts/[name].[ext]',
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin('dist', {}),
		new MiniCssExtractPlugin({
			filename: './style.css'
		}),
		new HtmlWebpackPlugin({
			inject: true,
			template: './src/index.html',
			filename: 'index.html'
		}),
		new BrowserSyncPlugin(
      // BrowserSync options
      {
        host: 'localhost',
				port: PROXY,
				// proxy the Webpack Dev Server endpoint
        // (which should be serving on http://localhost:PORT/)
        // through BrowserSync
        proxy: `http://localhost:${PORT}/`
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    )
	]
};