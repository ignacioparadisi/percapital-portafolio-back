const path = require('path');

module.exports = {
  devtool: 'source-map',
  target: 'node',
  entry: './src/server.ts',
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [path.resolve(__dirname, 'node_modules')]
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.mjs', '.js'],
    alias: {
      "@Common": path.resolve(process.cwd(), './src/Common'),
      "@Logic": path.resolve(process.cwd(), "./src/LogicLayer"),
      "@Persistence": path.resolve(process.cwd(), "./src/Persistence"),
      "@Services": path.resolve(process.cwd(), './src/Services'),

    }
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: { knex: 'commonjs knex' }
};