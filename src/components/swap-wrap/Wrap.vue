<script>
import MyInput from '../Input.vue'
import debounce from 'lodash/debounce'
import BigNumber from '../general/BigNumber.vue'
import Slider from '../general/Slider.vue'
import toBN from 'utils/BN'


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
			processing:false,
			period:14,
			price: null,
			amount: null,
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
					"title":"WBTC → WHWBTC",
					"path":"/swap-wrap/wrap?from=WBTC&to=WHBTC"
				}
			]
		}
	},
	watch:{
		from() { this.amount = null },
		amount() { this.priceLoading = true; this.updatePrice() },
		period() { this.priceLoading = true; this.updatePrice() },
	},
	methods:{
		updatePrice: debounce(async function(){
				this.price =  !this.amount ? null:
					await this.$store.dispatch('assets/getWrapCost', {
						amount: this.amount,
						period: this.period,
						symbol: this.from
					})
					this.priceLoading = false
			}, 1000),
		async wrap(){
			this.processing = true
			try {
				await this.$store.dispatch('assets/wrap',{
					symbol: this.from,
					amount: this.amount,
					period: this.period,
				})
				this.amount = null
				this.period = 14
			} finally {
				this.processing = false
			}
		}
	},
	computed:{
		available() {
			const {total, locked} = this.$store.state.pool
			if(!total) return null
			const protect = total.mul(2).div(10)
			const free = total.mul(8).div(10).sub(locked)
			if(free.lte(0)) return toBN(0)
			return free.mul(1e8).div(this.$store.state.pricer[this.from])
		},
		wrapDisabled() {
			const available = this.available && this.available.e(this.from == 'ETH' ? 12: 2)
			return this.priceLoading
				|| this.processing
				|| !this.amount
				|| !this.price
				|| !available
				|| this.amount.gt(available)
				|| this.amount.lte(0)
				|| this.amount.add(this.price).gt(this.$store.state.tokens.balance[this.from])
		}
	},
	components:{
		MyInput, BigNumber, Slider
	}
}
</script>

<template lang="pug">
.wrap-text
	| Wrap your ETH or WBTC into WHETH
	|
	br.br--mobile
	| or WHWBTC
	|
	br.br--desk
	| to be automatically protected from USD losses
	|
	br
	| during a fixed period of time with hedge contracts
.selector-buy
	router-link.selector-buy__elem(v-for="elem in selector" :to="elem.path" :class="{selected: $route.fullPath == elem.path}, `${elem.id}`") {{elem.title}}
.new-swap
	.new-swap__box--top
		.new-swap__title
			| New Wrap ({{from}})
		my-input(
			:max='x => x.mul(90).div(100)'
			title="Amount"
			v-model="amount"
			:token="$store.state.tokens[from]"
		)
		slider(v-model='period')
		.price-info
			.table-box-line__elem
				.table-box-elem__info
					| Available to wrap:
			.table-box-line__elem
				.table-box-elem__info
					.token.bold(:class='from')
						big-number(
								:value='available'
								:places='2'
								:decimals='6'
							) {{from}}
	.new-swap__box--bottom
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
								placeholder='0'
								:places='2'
								:decimals='from == "ETH" ? 26 : 16'
							)
						|
						| (
						big-number(
								:value='price'
								placeholder='0'
								:decimals='from == "ETH" ? 18 : 8'
							)
						|
						| {{from}})
					.table-box-elem__info
						| $
						big-number(
								:value='price && price.mul($store.state.pricer[from]).div(this.period * 24)'
								placeholder='0'
								:decimals='from == "ETH" ? 26 : 16'
								:places='2'
							)
						|  per hour
			//- .table-box__line
				.table-box-line__elem
					.table-box-elem__title
						| Protection duration
				.table-box-line__elem
					.table-box-elem__info
						| {{period}} days ({{period*24}} hours)
			.table-box__line.big
				.table-box-line__elem
					.table-box-elem__title-with-info
						.table-box-elem__title
							| Price floor
						.table-box-elem__info.left
							| You will get paid the difference
							br
							| if {{from}} falls below this price
				.table-box-line__elem
					.table-box-elem__info
						| $
						big-number(
							:decimals='8'
							:places='2'
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
			button.button.primary(
					v-if="$store.state.connection.accounts.length > 0 "
					@click='wrap'
					:disabled='wrapDisabled'
				)
				span(v-if="priceLoading") Loading costs...
				span(v-else-if="processing") Process...
				span(v-else) Wrap
			button.button.primary(
					v-else
					@click="$store.dispatch('connection/toggle').then(updatePrice)"
				) Connect Wallet
</template>
