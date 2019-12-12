let app = new Vue({
  el: "#app",
  data: {
    list: [
      {
        id:1,
        name: 'iPhone 7',
        price: 6888,
        count: 1
      },
      {
        id: 2,
        name: 'iPad Pro',
        price: 5888,
        count: 1
      },
      {
        id: 3,
        name: 'MacBook Pro',
        price: 21488,
        count: 1
      },
      {
        id: 4,
        name: 'MacBook',
        price: 1488,
        count: 1
      },
      {
        id: 5,
        name: 'iPad mini',
        price: 799,
        count: 1,
      }
    ],
  },
  computed: {
    totalPrice: function(){
      let prices = 0;
      for (let i=0; i<this.list.length; i++){
        prices += this.list[i].price * this.list[i].count;
      }
      return prices;
    }
  },
  methods: {
    reduce: function(index){
      if (this.list[index] === 1) return;
      this.list[index].count --;
    },
    add: function(index){
      this.list[index].count ++;
    },
    remove: function(index){
      this.list.splice(index, 1);
    }
  },

  filters: {
    thousands: function(value){
      let newValue = value;
      let storage = new Array();
      let remains;
      while (newValue){
        remains = newValue % 1000;
        newValue = Math.floor(newValue / 1000);
        if (remains < 10 && newValue > 0) {
          remains = '00' + remains;
        } else if (remains < 100 && newValue > 0){
          remains = '0' + remains;
        } else {
          remains = remains;
        }
        storage.splice(0, 0, remains);
      }
      return '$' + storage.join(',');
    }
  }
})