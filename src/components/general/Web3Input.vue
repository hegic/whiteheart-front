<script>
	import {utils} from 'ethers'
	import {toBN} from 'utils/BN'
	export default {
		emits:['update:modelValue', 'close'],
		props:['modelValue', 'decimals', 'fallback'],
		computed:{
			rgx(){
				const d = parseInt(this.decimals) || 18
				return new RegExp(`^\\d*\\.?\\d{0,${d}}$`)
			},
			value:{
				get(){
					if(!this.modelValue) return ''
					const d = parseInt(this.decimals) || 18
					const rr = this.modelValue.toString().padStart(d, 0)
					const s = x => {
						let f = false
						return x.split('').reverse().filter(x => {
							if(f) return true
							if(x == '0') return false
							f=true
							return true
						}).reverse().join('')
					}
					const f = s(rr.substring(rr.length - d))
					console.log(rr, f)
					return (rr.substring(0, rr.length - d) || '0') + (f ? '.' + f : '')
				},
				set(val){
					const d = parseInt(this.decimals) || 18

					const value = val == '' ? null: utils.parseUnits('0' + val, d)
					if((this.modelValue != null ^ value != null) ||
					this.modelValue != null && value != null && !value.eq(this.modelValue))
						this.$emit('update:modelValue', value)
				}
			}
		},
		methods:{
			check(e){
				if(!this.rgx.test(e.target.value + e.key)) e.preventDefault()
			}
		}
	}
</script>

<template lang="pug">
input(v-model='value' @keypress='check')
</template>
