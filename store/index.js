import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    MenuStateChange:false,
    MenuName:"",
    QiniuToken:"",
  },
  mutations: {
  }
})

export default store