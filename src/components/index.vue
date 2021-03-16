<script>
import {mapState, mapActions} from 'vuex'

import MyHeader from '../components/Header.vue'
import MyFooter from '../components/Footer.vue'
import MyLoader from '../components/Loader.vue'


export default {
	data(){
		return {
			popUp: false,
			popUpStep: 0,
			_time: 0,
			intID: null,
			state: 'wait',
			loading:false
		}
	},
	mounted(){
	},
	beforeUnmount(){
		clearInterval(this.intID)
	},
	computed:{
		...mapState(['items'])
	},
	methods: {
		nextStep(){this.popUpStep = (this.popUpStep + 1) % 5},
		prevStep(){this.popUpStep = (this.popUpStep + 5 - 1) % 5},
		step(n){this.popUpStep = n},
	},
	components:{
		MyHeader,
		MyFooter,
		MyLoader,
	}
}
</script>

<style lang="stylus" src="styles/index.styl"/>

<template lang="pug">
my-header
router-view
my-footer
my-loader(:class="{open:loading}")
</template>
