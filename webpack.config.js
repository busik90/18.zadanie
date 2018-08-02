const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      OptimizeJsPlugin = require('optimize-js-plugin');

const plugins = [new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})];

//webpack.config.js
module.exports = (env) => {
  const environment = env || 'production';

  if (environment === 'production') {
    plugins.push(
      new OptimizeJsPlugin({
        sourceMap: false
      })
    )
  }

  return {
    mode: environment,
    entry: './client/index.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: './app.' + environment + '.js'
    },

    plugins,

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          options: {
            plugins: env !== 'production' ? ["react-hot-loader/babel"] : []
          }
        },

        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader'},
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        }
      ]
    },

    devServer: {
      proxy: {
        '/socket.io': {
          target: 'http://localhost:3000',
          ws: true
        }
      }
    }
  }
};