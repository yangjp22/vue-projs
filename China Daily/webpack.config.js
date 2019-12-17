const vueLoader = require('vue-loader');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: './dist/',
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader',]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.js$/,
      exclude: /(node_modules|bower-components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015'],
        }
      }
    }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', '.css', '.vue'],
  },
  plugins:[
      new vueLoader.VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
      })
  ]

};