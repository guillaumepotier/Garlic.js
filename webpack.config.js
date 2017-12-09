// $ PROD_ENV=1 webpack
var webpack = require('webpack')

var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  entry: __dirname + '/garlic.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: PROD ? 'garlic.min.js' : 'garlic.js'
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : []
};
