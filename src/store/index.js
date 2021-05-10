import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentCity: ''
  },
  getters: {
    getCityName(state) {
      return state.currentCity
    }
  },
  mutations: {
    setCityName(state, name) {
      state.currentCity = name
    }
  },
  actions: {
    setCityFunc(context, name){
      context.commit('setCityName', name)
    }
  }
})
