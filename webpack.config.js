const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    library: 'mPredict',
    libraryTarget: 'umd',
    globalObject: 'this',
    path: path.resolve(__dirname, 'javascripts'),
    filename: 'mpredict.js'
  },
  optimization: {
    minimize: false
  }
};
