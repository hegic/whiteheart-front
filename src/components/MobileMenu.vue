<script>
import MyTabs from './Tabs.vue'

export default {
	emits:'close',
	data(){
		return {
			popUp: false,
			popUpStep: 0,
			_time: 0,
			intID: null,
			state: 'wait'
		}
	},
	components:{
		MyTabs
	}
}
</script>

<template lang="pug">
.overlay.overlay-mobile-menu
	.mobile-menu
		.close-pop-up.close-pop-up--mobile-menu(@click="$emit('close')")
		my-tabs(@close-pop-up="$emit('close')")

		.disconnect-info(v-if='$store.getters.account')
			.hash {{$store.getters.account}}
			.disconnect-info__status Connected
		button.button.secondary(v-if='$store.getters.account' @click="$store.dispatch('connection/toggle')")
			| Disconnect
		button.button.primary(v-else @click="$store.dispatch('connection/toggle')")
			| Connect Wallet
		//- .header__button
</template>
