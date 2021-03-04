<script>
import MyInput from '../Input.vue'


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
	components:{
		MyInput
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
			| New Wrap 
			span ({{to}})
		my-input(
			title="From (estimated)"
			:token="from"
			:max="true"
			:selector="false"
			:balance="123.45")
		.separator-arrow
		my-input(
			title="To"
			:token="to"
			:max="false"
			:selector="false"
			:balance="4")
		.price-info
			.table-box-line__elem
				.table-box-elem__info
					| Price
			.table-box-line__elem
				.table-box-elem__info
					| 522.66 {{from}} per {{to}}
	.new-swap__box--bottom
		label.protect-checkbox
			input.checkbox(type="checkbox")(v-model="protectCheckbox")
			| Protect my trade from losses
		.table-box
			.table-box__line
				.table-box-line__elem
					.table-box-elem__title
						| Cost of protection
				.table-box-line__elem
					.table-box-elem__info
						| $20 (0.0328 ETH)
					.table-box-elem__info
						| $0.0595 per hour
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
						| $522.66
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
			button.button.primary
				| Swap
</template>
