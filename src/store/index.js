import { createStore } from 'vuex'

const initialState = {
  tabBarActive: 'home',
  token: null,
  userInfo: null,
}

const mutations = {
  // 获取登陆状态
  // setLoginType (state, type) {
  //   state.loginType = type
  // },
  // // 获取token
  // setToken (state, token) {
  //   state.token = token
  // },
  SET_TABBAR: (state, active) => {
    state.tabBarActive = active
  }
}

const actions = {
  setTabBar({ commit }, active) {
    commit('SET_TABBAR', active)
  }
}

const store = createStore({
  state: initialState,
  mutations,
  actions,
})

export default store
