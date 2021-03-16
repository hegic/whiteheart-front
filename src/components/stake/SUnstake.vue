<script>
import MyInput from '../Input.vue'
import BigNumber from '../general/BigNumber.vue'
import { mapState } from 'vuex'
import toBN from 'utils/BN'
export default {
	data(){
		return {
			amount: null,
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
	computed:{
		...mapState({
			profit: state => state.staking.profit,
			lockedUntil: state => state.staking.lockedUntil,
		}),
		balances(){
			return {
				WHITE: this.$store.state.tokens.balance.WHITE,
				sWHITE: this.$store.state.tokens.balance.sWHITE,
			}
		},
		share(){
			const sh = this.$store.state.tokens.balance.sWHITE
			const total = this.$store.state.staking.totalStaked
			if(!total || total.isZero()) return toBN(0)
			if(sh && total) return sh.mul(10000).div(total)
		},
		estimated(){
				if(!this.amount) return this.share
				const sh = this.$store.state.tokens.balance.sWHITE
				const total = this.$store.state.staking.totalStaked
				if(sh && total)
					if(this.amount.gte(sh)) return toBN(0)
					else return sh.sub(this.amount).mul(10000).div(total.sub(this.amount))
		},
		lockedFor(){
				return this.lockedUntil ? Math.ceil((this.lockedUntil - Date.now()) / 3600000) : null
		}
	},
	components:{
		MyInput, BigNumber
	},
	methods:{
		withdraw(){
			this.$store.dispatch('staking/withdraw', this.amount)
			this.amount = null
		}
	}
}
</script>

<template lang="pug">
.swap-text
	| Unstake WHITE, burn sWHITE
	|
	br.br--mobile
	| and withdraw
	|
	br.br--desk
	| your last
	|
	br.br--mobile
	| staking rewards in USDC

.new-swap.margin-top-32
	.new-swap__box--top
		.table-box-elem__info.center
			| You are currently staking:
		.token--big-title
			.token.WHITE: big-number(:value='balances.sWHITE' ) WHITE
		my-input(
			max title="Amount"
			v-model='amount'
			:token="$store.state.tokens.sWHITE"
		)
		.separator-arrow
		my-input(
			title="To"
			v-model='amount'
			:token="$store.state.tokens.WHITE"
		)
		.share-dynamics
			.share-dynamics__elem
				.share-dynamics-elem__title
					| Your current share
					br
					| in staking rewards:
				.share-dynamics-elem__value
					big-number(:value='share' :decimals='2') %
			.separator-arrow.horizontally
			.share-dynamics__elem
				.share-dynamics-elem__title
					| Your estimated share
					br
					| after this staking:
				.share-dynamics-elem__value
					| ~
					big-number(:value='estimated' :decimals='2') %
	.new-swap__box--bottom
		.table-box-elem__info.center
			| Your unclaimed staking rewards:
		.token--big-title
			.token.USDC
				big-number(:value="profit" :decimals="6") USDC
		.new-swap__button
			button.button.primary(
				:disabled="!amount || amount == 0 || lockedUntil >= Date.now()"
				@click="withdraw"
			)
				//- span(v-if="lockedUntil < Date.now()") Unstake + Claim All Rewards
				span(v-if="lockedUntil < Date.now()") Unstake
				span(v-else) Unstaking is locked up for {{lockedFor}}h
		.new-swap__button
			button.button.green(
				:disabled="!profit || profit == 0"
				@click="$store.dispatch('staking/claim')"
			)
				| Claim Rewards
</template>
