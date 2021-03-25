<script>
export default {
	emits:['close-pop-up'],
	data(){
		return {
			tabs:[
				{
					"id":"swap-wrap",
					"path":"/swap-wrap/wrap?from=ETH&to=WHETH",
					"title":"Wrap / Swap"
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
.tabs(v-if="$route.path.split('/')[1] != ''")
	router-link.tab(v-for="tab in tabs" :to="tab.path" :class="{selected: $route.path.split('/')[1] == tab.id}" @click="$emit('close-pop-up')") {{tab.title}}
</template>
