import Vue from 'vue'
import App from './AppTp.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
