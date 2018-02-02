const path = require('path');

module.exports = {
  entry: {
    app: './src/index.bs.js',
    worker: './src/worker.js'
  },

  output: {
    path: path.join(__dirname, "build"),
    filename: '[name].js',
  },

  module: {
    loaders: [{
      test: /\.(png|jpg|gif|html|css)$|stdlibBundle.js$/,
      loader: 'file-loader?name=[name].[ext]'
    }],
  },
  node: {
    fs: 'empty'
  }
};
