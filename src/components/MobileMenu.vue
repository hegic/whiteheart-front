<script>
import MyTabs from './Tabs.vue'

export default {
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
		button.button.primary
			| Connect Wallet
		//- .header__button
</template>
