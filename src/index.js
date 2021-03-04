import {createApp} from 'vue'
import Index from './components/index.vue'
import i18n from './i18n'
import store from './store/index'
import router from './router'

createApp(Index)
  .use(i18n)
  .use(store)
  .use(router)
  .mount('#app')
