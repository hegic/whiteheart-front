<script>
import MyInput from '../Input.vue'

export default {
	data(){
		return {
			popUp: false,
			popUpStep: 0,
			_time: 0,
			intID: null,
			state: 'wait',
			selector:[
				{
					"id":"stake",
					"title":"Stake",
					"path":"/stake/stake"
				},
				{
					"id":"unstake",
					"title":"Unstake",
					"path":"/stake/unstake"
				}
			]
		}
	},
	components:{
		MyInput
	}
}
</script>

<template lang="pug">
.swap-text
	| Unstake WHITE, burn sWHITE 
	br.br--mobile
	| and withdraw
	br.br--desk
	| your last 
	br.br--mobile
	| staking rewards in USDC

.new-swap.margin-top-32
	.new-swap__box--top
		.table-box-elem__info.center
			| You are currently staking:
		.token--big-title
			.token.WHITE
				| 100 WHITE
		my-input(
			title="Amount"
			token="sWHITE"
			:max="true"
			:selector="false"
			:balance="100")
		.separator-arrow
		my-input(
			title="To"
			token="WHITE"
			:max="false"
			:selector="false"
			:balance="0")
		.share-dynamics
			.share-dynamics__elem
				.share-dynamics-elem__title
					| Your current share
					br
					| in staking rewards:
				.share-dynamics-elem__value
					| 1,7%
			.separator-arrow.horizontally
			.share-dynamics__elem
				.share-dynamics-elem__title
					| Your estimated share
					br
					| after this staking:
				.share-dynamics-elem__value
					| 0%
	.new-swap__box--bottom
		.table-box-elem__info.center
			| Your unclaimed staking rewards:
		.token--big-title
			.token.USDC
				| 30,000 USDC
		.new-swap__button
			button.button.primary
				| Unstake + Claim All Rewards
		.new-swap__button
			button.button.green
				| Claim Rewards Only

</template>
