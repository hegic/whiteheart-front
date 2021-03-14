<script>
import MyInput from '../Input.vue'

export default {
	props:{
		buy:{
			default:'WHETH'
		},
		sell:{
			default:'ETH'
		}
	},
	data(){
		return {
			protectCheckbox: true,
			selector:[
				{
					"id": "wheth",
					"title": "Buy WHETH",
					"path": "/swap-wrap/swap?buy=WHETH&sell=ETH",
					"text": "Buy protected Whiteheart asset <br> for USDC or other cryptocurrency"
				},
				{
					"id": "whbtc",
					"title": "Buy WHBTC",
					"path": "/swap-wrap/swap?buy=WHBTC&sell=ETH",
					"text": "Convert your ETH or WBTC <br> to protected Whiteheart asset"
				},
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
	| Buy wrapped WHETH or WHBTC
	br
	| to be automatically protected
	br.br--mobile
	| from USD losses
	br
	| during a fixed period of time
	br.br--mobile
	| with hedge contracts
.selector-buy
	router-link.selector-buy__elem(v-for="elem in selector" :to="elem.path" :class="{selected: $route.fullPath == elem.path}, `${elem.id}`") {{elem.title}}
//- .new-swap
	.new-swap__box--top
		.new-swap__title
			| New Swap
			span ({{buy}})
		my-input(
			title="From (estimated)"
			:token="sell"
			:max="true"
			:selector="true"
			:balance="123.45")
		.separator-arrow
		my-input(
			title="To"
			:token="buy"
			:max="false"
			:selector="false"
			:balance="4")
		.price-info
			.table-box-line__elem
				.table-box-elem__info
					| Price
			.table-box-line__elem
				.table-box-elem__info
					| 522.66 {{sell}} per {{buy}}
	.new-swap__box--bottom
		label.protect-checkbox
			input.checkbox(type="checkbox" checked @click.prevent)
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
.no-active-contracts
	.no-active-contracts__text
		| This functionality is in development
		br
		| and will be added soon.
		//- br.br--mobile
		br
		| Save your funds from losses
		//- br
		| wrapping your assets
	.button-box
		router-link.button.primary(to="/swap-wrap/wrap?from=ETH&to=WHETH")
			| Try wrap
</template>
