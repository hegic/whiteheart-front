<template lang="pug">
.section.f1
	.section-content.main-content
		.info-box
			.info-box__text
				|Hedge contracts by Whiteheart
				br
				|help DeFi users to protect value
				br
				|of their holdings in ETH and WBTC
			.info-box__buttons
				a.button.secondary.icon-external-link(
						:href="require('assets/Whiteheart_One_Pager.pdf').default", target="_blank"
					)
					| Learn More
				router-link.button.primary.icon-play(to="/swap-wrap/wrap?from=ETH&to=WHETH")
					| Protect WBTC & ETH Value
			.info-box__timer-box
				.timer-box__header
					.span Whiteheart is the Red Cross of crypto.
					.span It saves your money.
		.info-box__illustration
</template>
