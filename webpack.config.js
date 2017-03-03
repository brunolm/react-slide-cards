const webpack = require('webpack');
const path = require('path');

const pack = {
  context: __dirname,
  entry: {
    cards: ['./src/index.ts'],
    example: ['./src/example.tsx'],
  },
  output: {
    path: path.resolve('./dist'),
    publicPath: '/static/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: true }),
  ],
};

module.exports = pack;
