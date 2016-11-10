'use strict';

import webpack from 'webpack';

module.exports = {
  context: `${__dirname}/src`,
  entry: {
    ideialoader: `./index.js`,
  },
  externals: {
    jquery: `jQuery`,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: `[name].js`,
    path: `${__dirname}/dist/assets`,
    publicPath: `/assets`
  },
  devServer: {
    contentBase: `${__dirname}/src`,
  }
};
