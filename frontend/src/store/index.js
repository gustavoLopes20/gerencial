import Vue from 'vue'
import Vuex from 'vuex'

import account from './modules/account'
import location from './modules/location'
import notification from './modules/notification'
import cart from './modules/cart'
import header from './modules/header'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    account,
    location,
    notification,
    cart,
    header,
  },
  strict: debug,
  plugins: []
})