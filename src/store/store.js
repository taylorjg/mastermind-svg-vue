import Vue from 'vue'
import Vuex from 'vuex'
import logic from './modules/logic'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    logic
  }
})
