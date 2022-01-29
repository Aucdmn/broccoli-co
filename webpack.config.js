const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: './dist/bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  devServer: {
    host: 'localhost',
    port: 8888,
    open: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      inject: 'body',
      favicon: './src/assets/img/broccoli.png' 
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.join(__dirname, 'node_modules')
        ],
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }],
      }
    ]
  }
}