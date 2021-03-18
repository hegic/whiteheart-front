import { ethers } from 'ethers'
import { markRaw } from 'vue'

import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import Authereum from "authereum";
import UniLogin from "@unilogin/provider";
import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";

async function getContracts(signer, chainId) {
  const artifacts = {
    4: () => import('../../artifacts/rinkeby.yml'),
    1337: () => import('../../artifacts/ganache.yml'),
  }[chainId]
  if(!artifacts) throw new Error(`Network (${chainId}) is  not supported`)
  const {contracts, ABI} = await artifacts()
  return Object.fromEntries(
    contracts.map(({name, address, abi}) => [
      name,
      new ethers.Contract(address, ABI[abi], signer),
    ])
  )
}


const infuraIds = [
  "bd143daef40448f48a722c6ead1b07d7",
  "a6fbe259558b4c8baf936d949d3d310d",
]

const infuraId = "41c02c3d86a442f1a31eb89e3196bf3a"
// const defaultProvider = markRaw(new ethers.providers.Web3Provider(window.ethereum))
const defaultProvider = markRaw(
  window.ethereum
    ? new ethers.providers.Web3Provider(window.ethereum)
    : ethers.getDefaultProvider("mainnet", {
        infura: infuraId,
        // etherscan: YOUR_ETHERSCAN_API_KEY,
        // alchemy: YOUR_ALCHEMY_API_KEY,
        // pocket: YOUR_POCKET_APPLICATION_KEY
    })
 )


const w3Modal = new Web3Modal({
  theme: {
    background: "#1a1a1a",
    main: "rgb(199, 199, 199)",
    secondary: "rgb(136, 136, 136)",
    border: "rgba(195, 195, 195, 0.14)",
    hover: "#1f1f1f"
  },
  cacheProvider: true,
  providerOptions:{
    walletconnect: { package: WalletConnectProvider, options: { infuraId } },
    authereum: { package: Authereum },
    unilogin: { package: UniLogin },
    burnerconnect: { package: BurnerConnectProvider }
  }
});

window.w3Modal = w3Modal

export default {
    namespaced:true,
    state: () => ({
      rawProvider: null,
      signer: null,
      accounts:[],
      provider: defaultProvider,
			contracts: null,
    }),
    mutations:{
      connect(state, {rawProvider, accounts, provider, signer, contracts}){
          state.rawProvider = rawProvider
          state.accounts = accounts
          state.provider = markRaw(provider)
          state.signer = markRaw(signer)
					state.contracts = markRaw(contracts)

      },
      resetProvider(state){
          state.rawProvider = null
          state.accounts = []
          state.provider = defaultProvider
          state.signer = null
					state.contracts = null
      },
    },
    actions:{
      async setupProvider(ctx, {rawProvider, account}){
          const provider = new ethers.providers.Web3Provider(rawProvider)
          const signer = provider.getSigner()
          const accounts = account ? [account] : await provider.listAccounts()
          const { chainId } = await provider.getNetwork()
          const contracts = await getContracts(signer, chainId)
          ctx.commit('connect', {provider, accounts, signer, rawProvider, contracts})
          // console.log(chainId, contracts)
      },
      async reset({commit, state:{rawProvider}}) {
        w3Modal.clearCachedProvider();
        if(rawProvider && rawProvider.close)
          await rawProvider.close()
        commit('resetProvider')
      },
      resetCached({dispatch}) {
        if(w3Modal.cachedProvider) return dispatch('toggle')
      },
      async toggle({state:{rawProvider}, commit, dispatch}) {
        if(rawProvider) dispatch('reset')
        else {
          return await w3Modal.connect()
            .then(async rawProvider => {
              const account = new URLSearchParams(window.location.search).get('account')
              await dispatch('setupProvider', {rawProvider, account})
              return dispatch('init', null, {root:true})
            })
            .catch(error => {
              dispatch('notifications/error',{description:error},{root:true})
              dispatch('reset')
              throw error;
            })
        }
      }
    },
}
