import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
// const modules = {

// }
export default new Vuex.Store({
  state,
  mutations,
  actions
})
