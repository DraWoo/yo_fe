import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import { router } from '@/router.js'
import axios from '@/helpers/axios.js'
import axiosInterceptor from '@/helpers/axiosInterceptor.js'
import { createPinia } from 'pinia'
// import { TippyPlugin } from 'tippy.vue'
import Vue3Toasity from 'vue3-toastify'

const app = createApp(App)
const store = createPinia()

app.use(store)
app.use(router)
// app.use(TippyPlugin, {
//   tippyDefaults: {},
// })
app.use(Vue3Toasity, {
  autoClose: 3000,
  theme: 'dark',
  hideProgressBar: true,
})

app.provide('$axios', axios)
axiosInterceptor()

app.mount('#app')
