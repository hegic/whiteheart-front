<script>

export default {
	data(){ 
		return {
		}
	},
	components:{
	}
}
</script>

<template lang="pug">
.overlay
	.loading-box
		.loading-box__icon
			img(:src="require('assets/status-loading.svg').default" alt="loaging")
		.loading-box__text
			| Waiting for confirmation...
</template>
