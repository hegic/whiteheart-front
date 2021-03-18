<script>
import SelectorSwapWrap from './SelectorSwapWrap.vue'

export default {
	data(){
		return {
			popUp: false,
			popUpStep: 0,
			_time: 0,
			intID: null,
			state: 'wait',
		}
	},
	components:{
		SelectorSwapWrap
	}
}
</script>

<template lang="pug">
.section
	.section-content
		selector-swap-wrap
		router-view
</template>
