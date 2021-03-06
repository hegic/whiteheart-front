import {createStore} from 'vuex'
import modules from './modules'
import { ethers } from 'ethers'


const store = createStore({
  modules,
  getters:{
      account: ({connection}) => connection.accounts[0],
  },
  actions:{
      init(){

      },
  }
})

store.dispatch('connection/resetCached')
window.s = store
export default store
