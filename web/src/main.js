// src/main.js
import { createApp } from 'vue'
import '@/assets/style/tailwind.css'
import App from '@/App.vue'
import router from '@/router.js' // Default export 사용
import { createPinia } from 'pinia'
import Vue3Toastify from 'vue3-toastify'

const app = createApp(App)
const store = createPinia()

app.use(store)
app.use(router)
app.use(Vue3Toastify, {
  position: 'top-right',
  maxToasts: 5,
  newestOnTop: true,
})

app.mount('#app')
