<script>
import { mapGetters } from 'vuex'
export default {
	data(){
		return {
			active: true,
			mobileActive: 0

		}
	},
	computed:{
		...mapGetters({
			assets: 'assets/list'
		}),
		activeAssets(){
			return this.assets.filter(x=>x.active)
		},
		historyAssets(){
			return this.assets.filter(x=>!x.active)
		},
	},
	components:{
		BigNumber: require('../general/BigNumber.vue').default,
	}
}
</script>

<template lang="pug">
.section
	.section-content
		.holding-header
			| Your hedge contracts
			|
			br.br--mobile
			| (WH token holdings)
		.holding-box
			.holding-box__mobile-menu
				.my-table-container__title(:class="{active:mobileActive==0}" @click="mobileActive=0")
					| Active Holdings
				.my-table-container__title(v-if='historyAssets.length > 0' :class="{active:mobileActive==1}" @click="mobileActive=1")
					| History

			.my-table-container(v-if="activeAssets.length > 0" :class="{'mobile-active': mobileActive==0}")
				.my-table-container__title
					| Active Holdings
				.my-table-box
					table.my-table
						tr.my-table__header
							th Size
							th Price Floor
							th Current Price
							th Difference
							th Duration
							th To be received
							th Receive now
						tr.my-table__line(v-for="i in activeAssets")
							td: .value.bold
								big-number(
									:value='i.amount'
									:decimals='i.decimals'
								) {{i.whAsset}}
							td
								.token $
									big-number(
										:value='i.strike'
										:decimals='8'
										:places='2'
									)
							td
								.token $
									big-number(
										:decimals='8'
										:value='$store.state.pricer[i.asset]'
										:places='2'
									)
							td
								.value(:class='{bad:i.priceDiff && i.priceDiff.isNegative(), good:i.priceDiff > 0 }')
									| {{i.priceDiff && i.priceDiff.isNegative() ? '-' : i.priceDiff && !i.priceDiff.isZero() ? '+' : ''}}$
									big-number(
										:decimals='8'
										:value='i.priceDiff.abs()'
										:places='2'
									)
							td {{i.duration}}
							td
								.value.bold
									big-number(
										:value='i.amount'
										:decimals='i.decimals'
									) {{i.asset}}
								.value.bold(:class='{good: i.profit > 0}') +
									big-number(
										v-if='i.profit > 0'
										:value='i.profit'
										:decimals='i.decimals + 8'
										:places='2'
									) USDC
									span(v-else) 0 USDC
							td.with-button
								button.button.primary.my-table__button(@click="$store.dispatch('assets/unwrap', i)")
									| Receive
				.my-table-box--mobile
					.my-table__line(v-for="i in activeAssets")
						.token.bold(:class='i.whAsset')
							big-number(
								:value='i.amount'
								:decimals='i.decimals'
							) {{i.whAsset}}
						.separator-line
						.my-table-line__container
							.my-table-line__elem
								.my-table-line-elem__title Price Floor
								.token.bold(:class='i.asset') $
									big-number(
										:value='i.strike'
										:decimals='8'
										:places='2'
									)
							.my-table-line__elem
								.my-table-line-elem__title Current Price
								.token.bold(:class='i.asset') $
									big-number(
										:decimals='8'
										:value='$store.state.pricer[i.asset]'
										:places='2'
									)
						.my-table-line__container.last
							.my-table-line__elem
								.my-table-line-elem__title Difference
								.value.bold(:class='{bad:i.priceDiff && i.priceDiff.isNegative(), good:i.priceDiff > 0 }')
									| {{i.priceDiff && i.priceDiff.isNegative() ? '-' : i.priceDiff && !i.priceDiff.isZero() ? '+' : ''}}$
									big-number(
										:decimals='8'
										:value='i.priceDiff.abs()'
										:places='2'
									)
							.my-table-line__elem
								.my-table-line-elem__title Duration
								.value.bold {{i.duration}}
						.separator-line
						.my-table-line-elem__title To be received:
						.value-line.bold
							//- .value.bold 10 ETH (
							//- .value.bold.bad -$350
							//- .value.bold )
							.value.bold
								big-number(
									:value='i.amount'
									:decimals='i.decimals'
								) {{i.asset}} (
							.value.bold(:class='{good: i.profit > 0}') +
								big-number(
									v-if='i.profit > 0'
									:value='i.profit'
									:decimals='i.decimals + 8'
									:places='2'
								) USDC
								span(v-else) 0 USDC
							.value.bold )
						button.button.primary(@click="$store.dispatch('assets/unwrap', i)")
							| Receive
			.no-active-contracts(v-else :class="{'mobile-active': mobileActive==0}")
				.no-active-contracts__text
					| You have no active contracts yet.
					|
					br
					| If you need to protect
					|
					br.br--mobile
					| your funds from any losses
					|
					br
					| buy WHETH or WHBTC
				.button-box
					router-link.button.primary(to="/swap-wrap/swap?buy=WHETH&sell=ETH")
						| New Swap

			.my-table-container(v-if='historyAssets.length > 0' :class="{'mobile-active': mobileActive==1}")
				.my-table-container__title
					| History
				.my-table-box
					table.my-table
						tr.my-table__header
							th Size
							th Price Floor
							th Exercising Price
							th Difference
							th Executed At
							th Received
						tr.my-table__line(v-for="i in historyAssets")
							td
								.value.bold
									big-number(
										:value='i.amount'
										:decimals='i.decimals'
									) {{i.whAsset}}
							td
								.token $
									big-number(
											:value='i.strike'
											:decimals='8'
											:places='2'
										)

							td
								.token $
									big-number(
											:value='i.closePrice'
											:decimals='8'
											:places='2'
										)
							td.value(:class="{ good: i.closePrice && i.closePrice.sub(i.strike).gt(0), bad: i.closePrice && i.closePrice.sub(i.strike).lt(0)}")
								| {{i.closePrice && i.closePrice.sub(i.strike).gt(0) ? '+': i.closePrice && i.closePrice.sub(i.strike).lt(0) ? '-' : ''}}$
								big-number(
										:value='i.closePrice && i.closePrice.sub(i.strike).abs()'
										:decimals='8'
										:places='2'
									)
							td {{i.unwrapedAt && i.unwrapedAt.toLocaleString()}}
							td
								.value.bold
									big-number(
										:value='i.amount'
										:decimals='i.decimals'
									) {{i.whAsset}}
								.value.bold.good +
									big-number(:value='i.optionProfit' :decimals='6' :places='2') USDC
				.my-table-box--mobile
					.my-table__line(v-for="i in historyAssets")
						.token.bold(:class='i.asset')
							big-number(
								:value='i.amount'
								:decimals='i.decimals'
							) {{i.whAsset}}
						.separator-line
						.my-table-line__container
							.my-table-line__elem
								.my-table-line-elem__title Price Floor
								.token.bold $
									big-number(
										:value='i.strike'
										:decimals='8'
										:places='2'
									)
							.my-table-line__elem
								.my-table-line-elem__title Exercising Price
								.token.bold $
									big-number(
											:value='i.closePrice'
											:decimals='8'
											:places='2'
										)
						.my-table-line__container.last
							.my-table-line__elem
								.my-table-line-elem__title Difference
								.value.bold(:class="{ good: i.closePrice && i.closePrice.sub(i.strike).gt(0), bad: i.closePrice && i.closePrice.sub(i.strike).lt(0)}")
									| {{i.closePrice && i.closePrice.sub(i.strike).gt(0) ? '+': i.closePrice && i.closePrice.sub(i.strike).lt(0) ? '-' : ''}}$
									big-number(
											:value='i.closePrice && i.closePrice.sub(i.strike).abs()'
											:decimals='8'
											:places='2'
										)
							.my-table-line__elem
								.my-table-line-elem__title Executed at
								.value.bold {{ i.unwrapedAt && i.unwrapedAt.toLocaleString() }}
						.separator-line
						.my-table-line-elem__title Received:
						.value-line.bold
							.value.bold
								big-number(
									:value='i.amount'
									:decimals='i.decimals'
								) {{i.whAsset}} (
							.value.bold(:class='{good: i.profit > 0}') +
								big-number(
									v-if='i.profit > 0'
									:value='i.profit'
									:decimals='i.decimals + 8'
									:places='2'
								) USDC
								span(v-else) 0 USDC
							.value.bold )
			//- .no-active-contracts(v-else :class="{'mobile-active': mobileActive==0}")
				.no-active-contracts__text
					| You have no active contracts yet.
					br
					| If you need to protect
					br.br--mobile
					| your funds from any losses
					br
					| buy WHETH or WHBTC
				.button-box
					router-link.button.primary(to="/swap-wrap/swap?buy=WHETH&sell=ETH")
						| New Swap
</template>
