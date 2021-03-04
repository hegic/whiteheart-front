import {createStore} from 'vuex'

export default createStore({
  state(){
    return {
      items:[1,2,3,4]
    }
  },
  mutations:{
    _inc(state) {
      state.items.push(state.items.length + 1)
    }
  },
  actions:{
    increment({commit}){ commit('_inc') }
  }
})

