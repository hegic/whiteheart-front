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
		.header__button
			button.button.primary(@click="$store.dispatch('connection/toggle')")
				span(v-if='$store.getters.account')
					| {{$store.getters.account}}
				span(v-else)
					| Connect Wallet
</template>
