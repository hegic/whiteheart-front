<script>
import {mapState, mapActions} from 'vuex'

import MyHeader from '../components/Header.vue'
import MyFooter from '../components/Footer.vue'
import Notification from '../components/Notification.vue'


export default {
	data(){
		return {
			popUp: false,
			popUpStep: 0,
			_time: 0,
			intID: null,
			state: 'wait',
			loading:true
		}
	},
	mounted(){
	},
	beforeUnmount(){
		clearInterval(this.intID)
	},
	computed:{
		...mapState(['items']),
		notificationBind:{
			get(){return this.$store.state.notifications.bind},
			set(value){this.$store.commit('notifications/set', value)}
		}
	},
	methods: {
		nextStep(){this.popUpStep = (this.popUpStep + 1) % 5},
		prevStep(){this.popUpStep = (this.popUpStep + 5 - 1) % 5},
		step(n){this.popUpStep = n},
	},
	components:{
		MyHeader,
		MyFooter,
		Notification,
	}
}
</script>

<style lang="stylus" src="styles/index.styl"/>

<template lang="pug">
my-header
router-view
my-footer
notification(v-model='notificationBind' v-if='false')
</template>
