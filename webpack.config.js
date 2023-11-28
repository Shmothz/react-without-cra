const path = require('path')
const HTMLWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
 entry: './src/index.tsx',
 mode: 'development',
 output: {
  path: path.join(__dirname, 'build'),
  filename: 'bundle.js',
  publicPath: '/',
 },
 devServer: {    static: {
   directory: path.join(__dirname, './'),
   watch: true,
  },
  historyApiFallback: true,
 },
 module: {
  rules: [
   {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: 'babel-loader',
   },
   {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: 'ts-loader',
   },
   {
    test: /\.(css|scss|sass)$/,
    use: [
     MiniCssExtractPlugin.loader,
     'css-loader',
     'sass-loader',
    ],
   },
  ],
 },
 resolve: {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
 },
 plugins: [
  new HTMLWebPackPlugin({
   template: './index.html',
   favicon: './favicon.png',
  }),
  new MiniCssExtractPlugin(),
 ],
}