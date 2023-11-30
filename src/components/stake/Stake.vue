<script>
import { mapState } from 'vuex'
export default {
	data(){
		return {
			popUp: false,
			popUpStep: 0,
			_time: 0,
			intID: null,
			state: 'wait',
			selector:[
				// {
				// 	"id":"stake",
				// 	"title":"Stake",
				// 	"path":"/stake/stake"
				// },
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
			claimHistory: state => state.staking.claimHistory
		})
	}
}
</script>

<template lang="pug">
.section
	.section-content
		.selector-swap-wrap
			router-link.selector-swap-wrap__elem(
				v-for="elem in selector"
				:to="elem.path"
				:class="{selected: $route.path.split('/')[2] == elem.id}, elem.id")
					.selector-swap-wrap__title {{elem.title}}



		router-view



		.my-table-container(v-if='claimHistory.length > 0')
			.my-table-container__title
				| History
			.my-table-box
				table.my-table
					tr.my-table__header
						th Action
						th Amount
						th Transaction Hash
					tr.my-table__line(v-for="claim in claimHistory")
						td
							.value.bold.claimed Claimed
						td
							.token.bold.USDC
								| {{claim.args.amount.format(6,2)}} USDC
						td: a.hash(:href="`https://etherscan.io/tx/${claim.transactionHash}`") {{claim.transactionHash}}
			.my-table-box--mobile.text-left
					.my-table__line(v-for="claim in claimHistory")
						.token.bold.USDC
							| {{claim.args.amount.format(6,2)}} USDC
							.action-absolute
								.value.bold.claimed Claimed
						.margin-16
						.my-table-line-elem__title Transaction Hash:
						a.hash(:href="`https://etherscan.io/tx/${claim.transactionHash}`") {{claim.transactionHash}}
</template>
