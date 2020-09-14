import { createApp } from 'vue'

import router from './router'
import store from './store'
import App from './App.vue'
import errorHandler from './errorHandler'
import './boot'

const app = createApp(App)

app.use(router)
app.use(store)

app.config.errorHandler = errorHandler
app.mount('#app')
