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
		.swap-wrap-text--bottom
			| Whiteheart uses UniswapV2: Router for all 
			br.br--mobile
			| transactions 
			br.br--desk
			| conducted using this interface. 
			br.br--mobile
			| Code is open source and you can verify it here.			
			br
			| At this point you can buy 
			span.bold
				| ETH or WBTC with 
			| a hedge 
			br.br--mobile
			| contract which 
			
			br.br--desk
			span.bold
				| will automatically protect your 
				br.br--mobile
				| asset's USD value from downside 			
			br.br--desk
			| during a fixed 
			br.br--mobile 
			| period of time that you will choose (up to 28 days).
</template>
