import Vue from 'vue'
import Vuex from 'vuex'
import * as main from './modules/main.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    main,
  },
  state: {}
})
