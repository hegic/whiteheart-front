import { MAX_256, toBN } from 'utils/BN'


export default {
  namespaced: true,
  state: () => ({
    total: null,
    locked: null,
  }),
  mutations:{
    set(state, {total, locked}) {
      state.total = total
      state.locked = locked
    }
  },
  actions:{
    async update({commit, rootState}) {
      const {connection:{contracts:{USDCPool}}} = rootState
      const [total, locked] = await Promise.all([
        USDCPool.totalBalance(),
        USDCPool.lockedAmount(),
      ])
      commit('set', { total, locked })
    },
  }
}
