<script>
import VueformSlider from '@vueform/slider'

export default {
	emits:['update:modelValue'],
	props:['modelValue'],
	data(){
		return {
			_slider_params:{
				format: x => x == 1? `1 day`: `${x.toFixed()} days`,
				min: 14,
				max: 28,
				step: 1,
				tooltips:false
			},
		}
	},
	computed:{
		value:{
			set(value){this.$emit('update:modelValue', value)},
			get(){return this.modelValue}
		}
	},
	components:{ VueformSlider },
}
</script>

<template lang="pug">
.input-box(style='margin-top: 20px')
	.input-box__top
		.input-box-top__text Period
		.input-box-top__text {{value}} days ({{value * 24}} hours)
	.input-box__bottom
		vueform-slider(
				v-model="value"
				v-bind="_slider_params"
			)
</template>
