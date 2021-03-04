<script>

export default {
	data(){
		return {
			active: false,
			mobileActive: 0

		}
	},
	components:{
	}
}
</script>

<template lang="pug">
.section
	.section-content
		.holding-header
			| Your hedge contracts 
			br.br--mobile
			| (WH token holdings)
		.holding-box
			.holding-box__mobile-menu
				.my-table-container__title(:class="{active:mobileActive==0}" @click="mobileActive=0")
					| Active Holdings
				.my-table-container__title(:class="{active:mobileActive==1}" @click="mobileActive=1")
					| History

			.my-table-container(v-if="active" :class="{'mobile-active': mobileActive==0}")
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
						tr.my-table__line(v-for="i in 5")
							td
								.value.bold 10 WHETH
							td 
								.token.ETH $1350
							td 
								.token.USDC $1000
							td
								.value.bad -$350
							td 7D 14H
							td
								.value.bold 10 ETH
								.value.bold.good +350 USDC
							td.with-button
								button.button.primary.my-table__button
									| Receive
				.my-table-box--mobile
					.my-table__line(v-for="i in 3")
						.token.bold.WHITE
							| 100 WHITE
						.separator-line
						.my-table-line__container
							.my-table-line__elem
								.my-table-line-elem__title Price Floor
								.token.bold.ETH $1350
							.my-table-line__elem
								.my-table-line-elem__title Current Price
								.token.bold.ETH $1000
						.my-table-line__container.last
							.my-table-line__elem
								.my-table-line-elem__title Difference
								.value.bold.bad -$350
							.my-table-line__elem
								.my-table-line-elem__title Duration
								.value.bold 7D 14H
						.separator-line
						.my-table-line-elem__title To be received:
						.value-line.bold
							.value.bold 10 ETH (
							.value.bold.bad -$350
							.value.bold )
						button.button.primary
							| Receive
			.no-active-contracts(v-else :class="{'mobile-active': mobileActive==0}")
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

			.my-table-container(:class="{'mobile-active': mobileActive==1}")
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
						tr.my-table__line(v-for="i in 5")
							td
								.value.bold 10 WHETH
							td 
								.token.ETH $1350
							td 
								.token.ETH $1000
							td.value.good -$350
							td 7D 14H
							td
								.value.bold 10 ETH
								.value.bold.bad +350 USDC
				.my-table-box--mobile
					.my-table__line(v-for="i in 3")
						.token.bold.WHITE
							| 100 WHITE
						.separator-line
						.my-table-line__container
							.my-table-line__elem
								.my-table-line-elem__title Price Floor
								.token.bold.ETH $1350
							.my-table-line__elem
								.my-table-line-elem__title Current Price
								.token.bold.ETH $1000
						.my-table-line__container.last
							.my-table-line__elem
								.my-table-line-elem__title Difference
								.value.bold.bad -$350
							.my-table-line__elem
								.my-table-line-elem__title Duration
								.value.bold 7D 14H
						.separator-line
						.my-table-line-elem__title To be received:
						.value-line.bold
							.value.bold 10 ETH (
							.value.bold.good +$350
							.value.bold )

						


</template>
