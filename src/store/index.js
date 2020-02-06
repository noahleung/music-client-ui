import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    keywords: '',
    id: '',
    account: {
      username: '',
      name: ''
    }
  },
  mutations: {
    changeKeywords (state, input) {
      state.keywords = input
    },
    changeUsername (state, username) {
      state.account.username = username
    },
    changeName (state, name) {
      state.account.name = name
    },
    changeId (state, id) {
      state.id = id
    }
  },
  actions: {
  },
  getters: {
  },
  modules: {
  }
})

export default store
