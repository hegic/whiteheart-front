<script>

export default {
	emits:['update:modelValue'],
	props:['modelValue', 'tokenList'],
	data(){
		return {
			selector:[
				{
					"id":"wrap",
					"title":"Wrap",
					"path":"/swap-wrap/wrap?from=ETH&to=WHETH",
					"text":"Convert your <br class='br--mobile'> ETH or WBTC <br> to protected Whiteheart assets"
				},
				{
					"id":"swap",
					"title":"Swap",
					"path":"/swap-wrap/swap?buy=WHETH&sell=ETH",
					"text":"Buy protected Whiteheart assets <br> for USDC or other cryptocurrency"
				},
			]
		}
	},
	components:{
	}
}
</script>

<template lang="pug">
.selector-swap-wrap
	router-link.selector-swap-wrap__elem(
		v-for="elem in selector"
		:to="elem.path"
		:class="{selected: $route.path.split('/')[2] == elem.id}, elem.id")
			.selector-swap-wrap__title {{elem.title}}
			.selector-swap-wrap__text(v-html="elem.text")
</template>
