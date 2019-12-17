const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vueL = require("vue-loader");

module.exports = {
  'entry': './src/main.js',
  'output': {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle2.js',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }

    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html',
      }),
     new vueL.VueLoaderPlugin(),
  ],
  devServer : {
    contentBase: './dist',
    inline: true,
  }

};