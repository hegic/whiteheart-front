import { MAX_256 } from 'utils/BN'


export default {
  namespaced: true,
  state: () => ({
    profit: null,
    lockedUntil: null,
    totalStaked: null,
  }),
  mutations:{
    setProfit: (state, value) => state.profit = value,
    setLockup: (state, value) => state.lockedUntil = new Date(value * 1000 + 24 * 3600000),
    setStaked: (state, value) => state.totalStaked = value
  },
  actions:{
    async update({commit, rootState, dispatch}) {
      const {connection:{accounts:[account], contracts:{Staking, WHITE}}} = rootState

      commit('setProfit', await Staking.profitOf(account))
      commit('setLockup', await Staking.lastStakeTimestamp(account))
      commit('setStaked', await Staking.totalSupply())

      await dispatch('tokens/updateBalances', undefined, {root:true})
    },
    async deposit({dispatch, rootState}, amount) {
      const {connection:{accounts:[account], contracts:{Staking, WHITE}}} = rootState
      const allowance = await WHITE.allowance(account, Staking.address)
      if(allowance.lt(amount))
        await WHITE.approve(Staking.address, MAX_256).then(x => x.wait())
      await Staking.deposit(amount).then(x => x.wait())
      await dispatch('update')
    },
    async withdraw({dispatch, rootState}, amount) {
      const {connection:{contracts:{Staking}}} = rootState
      await Staking.withdraw(amount).then(x => x.wait())
      await dispatch('update')
    },
    async claim({dispatch, rootState}, amount) {
      const {connection:{accounts:[account], contracts:{Staking, WHITE}}} = rootState
      await Staking.claimProfit().then(x => x.wait())
      await dispatch('update')
    },
  }
}
