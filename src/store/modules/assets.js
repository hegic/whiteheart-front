import { MAX_256, toBN } from 'utils/BN'
import router from '../../router'
function durationPrettify(x) {
  if(x < 0) return 'Expired'
  const d = Math.floor(x / 24 / 3600000)
  const h = Math.floor(x / 3600000 % 24)
  return `${d}D ${h}H`
}

export default {
  namespaced: true,
  state: () => ({
    list:[]
  }),
  getters:{
    list({list},_,{pricer}) {

      return list.map(x => ({
        ...x,
        priceDiff: pricer[x.asset] && pricer[x.asset].sub(x.strike),
        profit: pricer[x.asset] && x.strike.sub(pricer[x.asset]).mul(x.amount)
      }))
    }
  },
  mutations:{
    push: (state, value) => state.list.push(value),
    unwrap: (state, event) => {
      const holding = state.list.find(x => x.id == event.args.tokenId && x.asset == event.asset)
      if(holding) {
        holding.optionProfit = event.args.optionProfit
        holding.closePrice = event.args.closePrice
        holding.unwrapedAt = new Date(event.block.timestamp * 1000)
        holding.active = false
      } else console.log('no such hedge', event, [...state.list])
    }
  },
  actions:{
    async processUnwrap({commit, rootState, dispatch}, {event, asset}){
      const {connection:{accounts:[account], contracts:{whETHv2, whBTCv2}}} = rootState
      const block = await event.getBlock()
      commit('unwrap', {
        ...event, asset, block
      })

    },
    async process({commit, rootState, dispatch}, {event, asset}){
      const {connection:{accounts:[account], contracts:{whETHv2, whBTCv2}}} = rootState
      const contract = asset == 'ETH' ? whETHv2 : whBTCv2
      const underlying = await contract.underlying(event.args.tokenId)

      const value = {
        amount: event.args.amount,
        asset,
        whAsset: asset == 'ETH' ? 'WHETH': 'WHBTC',
        decimals: asset == 'ETH' ? 18 : 8,
        strike: toBN(event.args.strike),
        id: event.args.tokenId,
        active: underlying.active,
        duration: durationPrettify(event.args.expiration * 1000 - Date.now())
      }
      commit('push', value)
    },
    async load({commit, rootState, dispatch}) {
      const {connection:{accounts:[account], contracts:{whETHv2, whBTCv2}}} = rootState

      // const BTC = whBTCv2.queryFilter(whBTCv2.filters.Wrap(account) ,0)
      const ETHWrap = await whETHv2.queryFilter(whETHv2.filters.Wrap(account) ,0)
      await Promise.all(
        ETHWrap.map(event => dispatch('process', {event, asset: 'ETH'}))
      )

      const ETHUnwrap = await whETHv2.queryFilter(whETHv2.filters.Unwrap(account) ,0)
      ETHUnwrap.forEach(event => dispatch('processUnwrap', {event, asset: 'ETH'}))

      const WBTCWrap = await whBTCv2.queryFilter(whBTCv2.filters.Wrap(account) ,0)
      await Promise.all(
        WBTCWrap.map(event => dispatch('process', {event, asset: 'WBTC'}))
      )

      const WBTCUnwrap = await whBTCv2.queryFilter(whBTCv2.filters.Unwrap(account) ,0)
      WBTCUnwrap.forEach(event => dispatch('processUnwrap', {event, asset: 'WBTC'}))
    },
    async unwrap({commit, rootState, dispatch}, {asset, id}) {
      const {connection:{accounts:[account], contracts:{whETHv2, whBTCv2}}} = rootState
      const wh = asset == 'ETH' ? whETHv2 : whBTCv2

      const receipt = await dispatch('notifications/process', {
        description: 'Receiving your ' + asset,
        txPromise: wh.unwrap(id)
      },{root:true})
      dispatch('processUnwrap', {
        asset,
        event: receipt.events.find(x => x.event == 'Unwrap')
      })
    },
    async getWrapCost({rootState}, {symbol, amount, period}){
      const asset =
        symbol == 'ETH'  ? rootState.connection.contracts.whETHv2 :
        symbol == 'WBTC' ? rootState.connection.contracts.whBTCv2 : null
      return await asset.wrapCost(amount, period * 24 * 3600)
    },
    async wrap({dispatch, rootState}, {symbol, amount, period}) {
      const { accounts: [account] } = rootState.connection
      const asset =
        symbol == 'ETH'  ? rootState.connection.contracts.whETHv2 :
        symbol == 'WBTC' ? rootState.connection.contracts.whBTCv2 : null
      const fee = await asset.wrapCost(amount, period * 24 * 3600)
      const value = symbol == 'ETH' ? amount.add(fee) : toBN(0)

      if(symbol == 'WBTC'){
        const { WBTC } = rootState.connection.contracts
        const allowance = await WBTC.allowance(account, asset.address)
        if(allowance.lt(amount) || true)
          await dispatch('notifications/process', {
            description: '1/2) WBTC Approving',
            txPromise:asset.wrap(amount, period * 24 * 3600, account, false, 0, { value })
          },{root:true})
      }

      const receipt = await dispatch('notifications/process', {
        description: symbol == 'ETH' ? 'ETH wrapping': '2/2) WBTC wrapping',
        txPromise:asset.wrap(amount, period * 24 * 3600, account, false, 0, { value })
      },{root:true})

      await dispatch('process',{
        event: receipt.events.find(x => x.event == 'Wrap'),
        asset: symbol
      })
      router.push('/holdings')
    },
  }
}
