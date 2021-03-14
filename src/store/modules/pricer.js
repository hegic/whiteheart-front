import { MAX_256, toBN } from 'utils/BN'


export default {
  namespaced: true,
  state: () => ({
    ETH:null,
    WBTC:null,
  }),
  mutations:{
    set: (state, {asset, value}) => state[asset] = value
  },
  actions:{
    async load({commit, rootState, dispatch}) {
      const {connection:{contracts:{ETHPriceProvider, WBTCPriceProvider}}} = rootState
      ETHPriceProvider.latestAnswer()
        .then(value => commit('set', {value, asset:'ETH'}))
      WBTCPriceProvider.latestAnswer()
        .then(value => commit('set', {value, asset:'WBTC'}))

    },
  }
}
