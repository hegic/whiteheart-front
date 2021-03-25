<script>
import waiting from 'assets/status-loading.svg'
import error from 'assets/status-failed.svg'
import done from 'assets/status-success.svg'


export default {
	emits:['update:modelValue'],
	props:['modelValue'],
	computed:{
		type(){ return this.modelValue.type }, // one of [waiting, error, done]
		title(){ return this.modelValue.title },
		description(){ return this.modelValue.description },
		actionText(){ return this.modelValue.actionText },
		objectData(){
			return {waiting, error, done}[this.modelValue.type]
		}
	}
}
</script>

<template lang="pug">
.overlay.open.dyn(v-if='modelValue')
	.loading-box
		.loading-box__icon
			//- iframe(:src="require('assets/status-loading.svg').default" height='200' width='200')
			object(type='image/svg+xml' :data='objectData')
				img(:src="objectData" alt="loading")
		.loading-box__text(v-if="title")
			| {{ title }}
		.loading-box__description(
				v-if='description'
				v-html='description'
			)

		.loading-box__description(v-if='actionText')
			button.button.primary(@click='$emit("update:modelValue")')
				| {{ actionText }}
</template>
