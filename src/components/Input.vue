<script>
import Web3Input from './general/Web3Input.vue'
import BigNumber from './general/BigNumber.vue'
export default {
	emits:['update:modelValue'	],
	props:['title', 'token', 'max','selector', 'modelValue'],
	computed:{
		balance(){
			return this.$store.state.tokens.balance[this.token.symbol]
		},
		value:{
			set(value){this.$emit('update:modelValue', value)},
			get(){return this.modelValue}
		}
	},
	components:{ Web3Input, BigNumber },
	methods:{
		setMax(){
			this.$emit('update:modelValue', this.balance)
		},
	}
}
</script>

<template lang="pug">
.input-box
	.input-box__top
		.input-box-top__text {{title}}
		.input-box-top__text Balance: #[big-number(:value='balance' :decimals='token.decimals')]
	.input-box__bottom
		web3-input.input(v-model='value' placeholder="0.0")
		.input-box__max(v-if="max != undefined" @click="setMax") MAX
		.input-box__token(:class="{'width-max':max, 'with-selector':selector}, token.symbol") {{token.symbol}}
</template>
