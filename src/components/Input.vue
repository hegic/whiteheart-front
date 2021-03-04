<script>
export default {
	props:['title', 'balance', 'token', 'max','selector'],
	data(){ 
		return {
			value: 1
		}
	}
}
</script>

<template lang="pug">
.input-box
	.input-box__top
		.input-box-top__text {{title}}
		.input-box-top__text
			| Balance: {{balance}}
	.input-box__bottom
		input.input(v-model="value")
		.input-box__max(v-if="max")
			| MAX
		.input-box__token(:class="{'width-max':max, 'with-selector':selector}, token")
			| {{token}}
</template>
