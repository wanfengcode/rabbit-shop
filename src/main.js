import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import customPlugins from '@/components/libs'
import 'normalize.css'
import '@/assets/styles/common.less'

createApp(App).use(store).use(router).use(customPlugins).mount('#app')
