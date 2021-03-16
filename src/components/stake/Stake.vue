<script>

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



		.my-table-container(v-if='false')
			.my-table-container__title
				| History
			.my-table-box
				table.my-table
					tr.my-table__header
						th Action
						th Amount
						th Transaction Hash
					tr.my-table__line(v-for="i in 5")
						td
							.value.bold.staked Staked
						td
							.token.bold.ETH
								| $1350 ETH
						td
							.hash
								| 0x48688712bd16c....f3dffd3251336fcb
			.my-table-box--mobile.text-left
					.my-table__line(v-for="i in 3")
						.token.bold.WHITE
							| 100 WHITE
							.action-absolute
								.value.bold.staked Staked
						.margin-16
						.my-table-line-elem__title Transaction Hash:
						.hash
							| 0x48688712bd16c....f3dffd3251336fcb
</template>
