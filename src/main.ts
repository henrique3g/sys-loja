import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { connection } from './database'

Vue.config.productionTip = false

connection.then(() => {
  new Vue({
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
