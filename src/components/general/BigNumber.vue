<script>
	import {utils} from 'ethers'
	import {toBN} from 'utils/BN'
	export default {
		props:{
			value: utils.BigNumber,
			placeholder: {
				type:String,
				default: 'loading...'
			},
			decimals:{
				default: 18,
			},
			places:{
				default: 4
			}
		}
	}
</script>

<template lang="pug">
span(v-if="value") {{value.format(decimals, places) }} #[slot]
span(v-else) {{placeholder}}
</template>
