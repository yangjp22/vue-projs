const {sum, mul} = require('./mathUtils.js')

require('./css/normal.css');

// console.log(sum(2, 3));

import Vue from 'vue';
import App from './vue/App.vue';

const app = new Vue({
  el: '#app',
  template: '<App></App>',
  data : {
    message: 'hello webpack',
  },
  components: {
    App,
  }
});