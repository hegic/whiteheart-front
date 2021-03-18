import { MAX_256, toBN } from 'utils/BN'


export default {
  namespaced: true,
  state: () => ({
    bind: {
      title:'Test',
      description: '<a class="hash" target="_blank" href="https://etherscan.io/tx/123">0xe41b8e9ed93a6335f3a7ccf610e46addf94b9a369733383941cb2ff73d1d997c</a>',
      actionText: "nulleer",
      type:'done', // one of [waiting, error, done]
    } && null
  }),
  mutations:{
    set: (state, value) => state.bind = value
  },
  actions:{
    error({commit}, {title, description}){
      commit('set',{
        title:title || 'Error',
        description,
        type: 'error',
        actionText:"Done"
      })
    },
    async process({commit}, {txPromise, description}) {
      commit('set',{
        description,
        title:`Please, confirm your transaction `,
        type: 'waiting',
      })

      try {

        const tx = await txPromise


        commit('set',{
          title:`Waiting for network confirmation... (${description})`,
          description:`<a class="hash" target="_blank" href="https://etherscan.io/tx/${tx.hash}">${tx.hash}</a>`,
          type: 'waiting',
        })

        const receipt = tx.wait()

        await new Promise((resolve, reject) => setTimeout(resolve, 10000))

        commit('set',{
          title:'Transaction was succsessfully confirmed!',
          type: 'done',
          description:`<a class="hash" target="_blank" href="https://etherscan.io/tx/${tx.hash}">${tx.hash}</a>`,
          actionText:"Done"
        })
        return receipt
      } catch (error) {
        commit('set',{
          title:'Error',
          description: error.message,
          type: 'error',
          actionText:"Done"
        })
        throw error
      }

    }
  }
}
