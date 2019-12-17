<template>
	<div class="calculator">
		<div class="display">{{current || '0'}}</div>
		<div @click="ceil" class="btn ceil">ceil</div>
		<div @click="floor" class="btn floor">floor</div>
		<div @click="clear" class="btn">C</div>
		<div @click="sign" class="btn">+/-</div>
		<div @click="percent" class="btn">%</div>
		<div @click="divide" class="btn operator">÷</div>
		<div @click="append('7')" class="btn">7</div>
		<div @click="append('8')" class="btn">8</div>
		<div @click="append('9')" class="btn">9</div>
		<div @click="times" class="btn operator">x</div>
		<div @click="append('4')" class="btn">4</div>
		<div @click="append('5')" class="btn">5</div>
		<div @click="append('6')" class="btn">6</div>
		<div @click="minus" class="btn operator">-</div>
		<div @click="append('1')" class="btn">1</div>
		<div @click="append('2')" class="btn">2</div>
		<div @click="append('3')" class="btn">3</div>
		<div @click="add" class="btn operator">+</div>
		<div @click="append('0')" class="btn zero">0</div>
		<div @click="dot" class="btn">.</div>
		<div @click="equal" class="btn operator">=</div>
	</div>
</template>

<script>
	import $ from 'jquery'
  export default {
    name: "Calculator",
		data() {
      return {
        current: '',
				operator: null,
				previous: null,
				operatorClicked: false,
				resultChecked: false,
			}
		},
		methods: {
      clear() {
        this.current = '';
			},
			ceil(){
				this.current = Math.ceil(parseFloat(this.current));
			},
			floor(){
        this.current = Math.floor(parseFloat(this.current));
			},
			sign() {
        this.current = this.current.charAt(0) === '-' ?
						this.current.slice(1) : `-${this.current}`;
			},
			percent() {
        this.current = `${parseFloat(this.current) / 100}`;
			},
			hasDot(number){
        return String(number).indexOf('.') !== -1;
			},
			append(number) {
        if (this.resultChecked) {
          this.current = '';
				}
        if(this.operatorClicked) {
          this.current = '';
          this.operatorClicked = false;
				}
        this.current = `${this.current + number}`;
        this.resultChecked = false;
			},
			dot() {
        if (this.current.indexOf('.') === -1){
          this.append('.');
				}
			},
			setPrevious() {
        this.previous = this.current;
        this.operatorClicked = true;
			},
			divide() {
          this.operator = (a, b) => this.hasDot(b/a) && String(b/a).split('.')[1].length >= 4? (b/a).toFixed(4):b/a;
          // this.previous = this.current;
          // this.operatorClicked = true;
          this.setPrevious();

			},
			times() {
					this.operator = (a, b) => this.hasDot(b*a) && String(b * a).split('.')[1].length >= 4? (b*a).toFixed(4):b*a;
					this.setPrevious();
			},
			minus() {
          this.operator = (a, b) => this.hasDot(b-a) && String(b - a).split('.')[1].length >= 4? (b-a).toFixed(4):(b-a);
          this.setPrevious();
			},
			add() {
          this.operator = (a, b) => this.hasDot(b + a) && String(b + a).split('.')[1].length >= 4? (b+a).toFixed(4):(b+a);
          this.setPrevious();
			},
			equal() {
        if (this.operator){
          this.current = `${this.operator(parseFloat(this.current), parseFloat(this.previous))}`;
          this.resultChecked = true;
          this.previous = null;
				}
			}
		},
		mounted() {
      $('.btn').mousedown(function(){
        $(this).addClass('red');
      }).mouseup(function(){
        $(this).removeClass('red');
			});
    }
  }
</script>

<style>
	.calculator{
		width: 400px;
		margin: 0 auto;
		font-size: 40px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-auto-rows: minmax(50px, auto);
	}

	.display{
		grid-column: 1 / 5;
		background-color: #333;
		color: white;
	}

	.zero{
		grid-column: 1 / 3;
	}
	.ceil{
		grid-column: 1 / 3;
	}

	.floor{
		grid-column: 3/5;
	}
	.btn{
		background-color: #f2f2f2;
		border: 1px solid #999;
	}

	.operator{
		background-color: orange;
		color: white;
	}

	.red{
		background-color: red;
	}
</style>