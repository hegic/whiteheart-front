<script>
import { mapGetters, mapActions } from 'vuex'
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
	computed:{
		...mapGetters(['account'])
	},
	methods:{
		...mapActions({connect:"connection/toggle"})
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
		.disconnect-info(v-if='account')
			.hash {{account}}
			.disconnect-info__status Connected
		.header__button
			button.button.secondary(v-if='account' @click="connect") Disconnect
			button.button.primary(v-else @click="connect") Connect Wallet
</template>
