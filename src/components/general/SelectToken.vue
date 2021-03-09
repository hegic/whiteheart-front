<script>

export default {
	data(){ 
		return {
			tokens:[
				{
					symbol: "ETH",
					name:"Ether",
					decimals:18,
					image:"Url",
				},
				{
					symbol: "WBTC",
					name:"WBTC",
					decimals:18,
					image:"Url",
				}
			]
		}
	},
	components:{
	}
}
</script>

<template lang="pug">
.overlay.dyn
	.close-pop-up(@click="$emit('close')")
	.overlay__content
		.overlay__header Select a token
		.select-box
			.select-box__search Select name or paste address...
			.select-box__tokens
				.select-box-token(v-for="token in tokens" :class="token.symbol") {{token.symbol}}


</template>
