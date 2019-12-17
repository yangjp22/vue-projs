const path = require('path');
const load = require('vue-loader');
const Html = require('html-webpack-plugin');
const web = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve:{
    extensions: ['.vue', '.js'],
    alias:{
      'vue$': 'vue/dist/vue.esm.js',
      // 'jquery$': path.resolve(__dirname, 'node_modules/jquery/scr/jquery.js')
      'jquery': 'jquery',
    }
  },
  module: {
    rules:[{
      test: /\.vue$/,
      use: [{loader: 'vue-loader'}]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },

  plugins: [
      new load.VueLoaderPlugin(),
      new Html({
        template: './src/index.html',
      }),
      new web.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
  ],
  devServer: {
    contentBase: './dist',
    inline: true,
  }
};