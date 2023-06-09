const path = require('path')
const HTMLWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
 entry: './src/index.tsx',
 mode: 'development',
 output: {
  path: path.join(__dirname, 'build'),
  filename: 'bundle.js',
 },
 devServer: {
  static: {
   directory: path.join(__dirname, 'build')
  }
 },
 module: {
  rules: [
   {
    test: /(\.jsx?)$/,
    exclude: /node-modules/,
    use: 'babel-loader'
   },
   {
    test: /\.tsx?$/,
    exclude: /node-modules/,
    use: 'ts-loader'
   },
   {
    test: /\.s[ac]ss$/,
    use: [
     MiniCssExtractPlugin.loader,
     "style-loader",
     "css-loader",
     "sass-loader",
    ]
   }
  ],
 },
 resolve: {
  extensions: ['.js','.jsx','.ts','.tsx'],
 },
 plugins: [
  new HTMLWebPackPlugin({
   template: './index.html',
   favicon: './favicon.png',
  }),
 ],
}