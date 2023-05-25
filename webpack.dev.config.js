const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'assets', 'dist'),
    publicPath: '',
  },
  devtool: 'cheap-module-source-map',
  mode: 'development',
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, 'assets', 'dist'),
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },

      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.hbs',
    }),
  ],
};
