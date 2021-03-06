<script>
import MyTabs from './Tabs.vue'
import MobileMenu from './MobileMenu.vue'

export default {
	data(){
		return {
			popUp: false,
			popUpStep: 0,
			_time: 0,
			intID: null,
			state: 'wait',
			mobileMenu: false
		}
	},
	components:{
		MyTabs,
		MobileMenu
	}
}
</script>

<template lang="pug">
.section.header
	.section-content
		.icon-mobile-menu(@click="mobileMenu = true")
		mobile-menu(:class="{open:mobileMenu}" @close="mobileMenu=false")
		.logo
		my-tabs
		.disconnect-info(v-if='$store.getters.account')
			.hash {{$store.getters.account}}
			.disconnect-info__status Connected
		.header__button
			button.button.secondary(v-if='$store.getters.account' @click="$store.dispatch('connection/toggle')")
				span
					| Disconnect
			button.button.primary(v-else @click="$store.dispatch('connection/toggle')")
				span
					| Connect Wallet
</template>
