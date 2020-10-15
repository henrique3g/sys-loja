import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(Vuetify)

Vue.use(VueCurrencyFilter, {
  symbol: 'R$',
  symbolSpacing: true,
  fractionCount: 2
})

export default new Vuetify({
})
