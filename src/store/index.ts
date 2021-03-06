import { createStore } from "vuex";
import actions from './actions'
import mutations from './mutations'
import state from './state'

export default createStore({
  actions,
  state,
  mutations, 
  modules: {},
});
