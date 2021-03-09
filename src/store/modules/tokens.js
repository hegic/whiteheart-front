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
}


export default {
  namespaced: true,
  state(){ return {
    ...tokens,
    balance:{
      WHITE: null,
      sWHITE: null,
    }
  }},
  mutations:{
    setBalance(state, {amount, token}){
      state.balance[token] = amount
    }
  },

  actions: {
    async updateBalances({ commit, rootState: { connection: { contracts, accounts: [account] }}}) {
      console.log('update')
      contracts.WHITE.balanceOf(account)
        .then(amount => commit('setBalance',{ token:'WHITE', amount }))
      contracts.Staking.balanceOf(account)
        .then(amount => commit('setBalance',{ token:'sWHITE', amount }))
    }
  }


}
