import BN from 'utils/BN'

const tokens = {
  WHITE:{
      name: 'WHITE',
      symbol: 'WHITE',
      decimals: 18,
  },
  sWHITE:{
      name: 'sWHITE',
      symbol: 'sWHITE',
      decimals: 18,
  },
  WBTC:{
    name: 'Wrapped Bitcoin',
    symbol: 'WBTC',
    decimals: 8,
  },
  ETH: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  WHBTC:{
    name: 'Whiteheart Protected Bitcoin',
    symbol: 'WHBTC',
    decimals: 8,
  },
  WHETH:{
    name: 'Whiteheart Protected Ether',
    symbol: 'WHETH',
    decimals: 8,
  },
}


export default {
  namespaced: true,
  state(){ return {
    ...tokens,
    balance:{
      WHITE: null,
      sWHITE: null,
      ETH: null,
      WBTC: null,
    }
  }},
  mutations:{
    setBalance(state, {amount, token}){
      state.balance[token] = amount
    }
  },

  actions: {
    async updateBalances({ commit, rootState: { connection: { provider, contracts, accounts: [account] }}}) {
      contracts.WHITE.balanceOf(account)
        .then(amount => commit('setBalance',{ token:'WHITE', amount }))
      contracts.Staking.balanceOf(account)
        .then(amount => commit('setBalance',{ token:'sWHITE', amount }))
      contracts.WBTC.balanceOf(account)
        .then(amount => commit('setBalance',{ token:'WBTC', amount }))
      provider.getBalance(account)
        .then(amount => commit('setBalance',{ token:'ETH', amount }))
    }
  }


}
