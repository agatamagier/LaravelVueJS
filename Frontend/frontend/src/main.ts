import './index.css'
import { plugin } from '@formkit/vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import config from './formkit.config.ts'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';


const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(plugin, config)
app.use(ToastPlugin);
app.mount('#app')
