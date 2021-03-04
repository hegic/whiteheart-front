<script>
export default {
	data(){ 
		return {
			tabs:[
				{
					"id":"swap-wrap",
					"path":"/swap-wrap/swap?buy=WHETH&sell=ETH",
					"title":"Swap / Wrap"
				},
				{
					"id":"holdings",
					"path":"/holdings",
					"title":"Holdings"
				},
				{
					"id":"stake",
					"path":"/stake/stake",
					"title":"Stake"
				}
			]
		}
	}
}
</script>

<template lang="pug">
.tabs
	router-link.tab(v-for="tab in tabs" :to="tab.path" :class="{selected: $route.path.split('/')[1] == tab.id}" @click="$emit('close-pop-up')") {{tab.title}}
</template>
