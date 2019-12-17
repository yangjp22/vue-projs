<template>
	<div class="title">
		{{message}}
		<Cpn></Cpn>
	</div>
</template>

<script>
	import Cpn from './Cpn.vue';

  export default {
    name: "App",
		data: function () {
      return {
        message: 'hello webpack',
			}
		},
		components: {
      Cpn,
		}
  }
</script>

<style scoped>
	title {
		color: red;
	}
</style>