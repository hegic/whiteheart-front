<script>
import MyInput from '../Input.vue'
import debounce from 'lodash/debounce'
import BigNumber from '../general/BigNumber.vue'

export default {
	props:{
		from:{
			default:'ETH'
		},
		to:{
			default:'WHETH'
		}
	},
	data(){
		return {
			price: null,
			rawAmount: null,
			priceLoading: false,
			protectCheckbox: true,
			selector:[
				{
					"id":"wheth",
					"title":"ETH → WHETH",
					"path":"/swap-wrap/wrap?from=ETH&to=WHETH"
				},
				{
					"id":"whbtc",
					"title":"WBTC → WHBTC",
					"path":"/swap-wrap/wrap?from=WBTC&to=WHBTC"
				}
			]
		}
	},
	watch:{
		from(){
			this.rawAmount = null
		},
		async rawAmount(){
			if(this.rawAmount)
			this.price = await this.$store.dispatch('staking/wrapCost', {
				amount: this.rawAmount,
				symbol: this.from
			})
		}
	},
	computed: {
		amount:{
			get(){ return this.rawAmount },
			set(value) {
				this.priceLoading = true;
				this._setRawAmount(value)
			}
		},
	},
	methods:{
		_setRawAmount: debounce(function(amount){
				this.rawAmount = amount
				this.priceLoading = false
		}, 1000),
		wrap(){
			this.$store.dispatch('staking/wrap',{
				symbol: this.from,
				amount: this.amount
			})
		}
	},
	components:{
		MyInput, BigNumber
	}
}
</script>

<template lang="pug">
.wrap-text
	| Wrap your ETH or WBTC into WHETH
	br.br--mobile
	| or WHBTC
	br.br--desk
	| to be automatically protected from USD losses
	br
	| during a fixed period of time with hedge contracts
.selector-buy
	router-link.selector-buy__elem(v-for="elem in selector" :to="elem.path" :class="{selected: $route.fullPath == elem.path}, `${elem.id}`") {{elem.title}}
.new-swap
	.new-swap__box--top
		.new-swap__title
			| New Wrap ({{from}})
		my-input(
			max title="Amount"
			v-model="amount"
			:token="$store.state.tokens[from]"
		)
		//- .separator-arrow
		//- my-input(
				noBalance
				title="To"
				v-model="amount"
				:token="$store.state.tokens[to]"
			)
		//- .price-info
			.table-box-line__elem
				.table-box-elem__info
					| Price
			.table-box-line__elem
				.table-box-elem__info
					| 522.66 {{from}} per {{to}}
	.new-swap__box--bottom
		//- label.protect-checkbox
			input.checkbox(type="checkbox")(v-model="protectCheckbox")
			| Protect my trade from losses
		.table-box
			.table-box__line
				.table-box-line__elem
					.table-box-elem__title
						| Cost of protection
				.table-box-line__elem
					.table-box-elem__info
						| $
						big-number(
								:value='price && price.mul($store.state.pricer[from])'
								:placeholder='0'
								:decimals='from == "ETH" ? 26 : 16'
							)
						|
						| (
						big-number(
								:value='price'
								:placeholder='0'
								:decimals='from == "ETH" ? 18 : 8'
							)
						| {{from}})
					.table-box-elem__info
						| $
						big-number(
								:value='price && price.mul($store.state.pricer[from]).div(336)'
								:placeholder='0'
								:decimals='from == "ETH" ? 26 : 16'
							)
						|  per hour
			.table-box__line
				.table-box-line__elem
					.table-box-elem__title
						| Protection duration
				.table-box-line__elem
					.table-box-elem__info
						| 14 days (336 hours)
			.table-box__line.big
				.table-box-line__elem
					.table-box-elem__title-with-info
						.table-box-elem__title
							| Price floor
						.table-box-elem__info.left
							| You will get paid the difference
							br
							| if ETH falls below this price
				.table-box-line__elem
					.table-box-elem__info
						| $
						big-number(
							:decimals='8'
							:value='$store.state.pricer[from]'
						)
			.attention-box--overlap(v-if="!protectCheckbox")
				.attention-box__attention
					| Attention!
				.attention-box__text
					| Your transaction will be made
					br
					| through Uniswap Router.
					br
					span.bold
						| Your holdings won’t be protected
					br
					| from USD losses.
					br
					span.bold
						| Please click above
					| to protect
					br
					| your trade from losses.
		.new-swap__button
			button.button.primary(@click='wrap'
				:disabled='priceLoading || !rawAmount || !price || rawAmount.lte(0) || rawAmount.add(price).gt($store.state.tokens.balance[from])')
				| Wrap
</template>
