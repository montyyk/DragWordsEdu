import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css' // Import toast styles
import './assets/styles/main.scss'

const app = createApp(App)
app.use(router)
app.use(VueToast, { position: 'top' }) // Configure toast position
app.mount('#app')
