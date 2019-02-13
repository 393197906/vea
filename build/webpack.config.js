const path = require('path');
module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/vea/runtime/main.js']
  },
  output: {
    path: path.resolve(process.cwd(), './dist'),
    publicPath: '/dist/',
    filename: 'vea.main.js',
    chunkFilename: '[id].js',
    // libraryExport: 'default',
    library: 'vea',
    libraryTarget: 'commonjs2'
  },
  externals: /^(vue|react|axios|lodash|number-precision).*$/i,
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules']
  },
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
