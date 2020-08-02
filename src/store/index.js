import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
// 安装插件
Vue.use(Vuex)

const state = {
    cartList: []
  }

const store = new Vuex.Store({
    state,
    mutations,
    actions,

})

// 挂载
export default store