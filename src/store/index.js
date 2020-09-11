import { createStore } from 'vuex'

const initialState = {
  tabBarActive: 'home',
  token: null,
  authCode: null,
  userInfo: null,
  activeRoute: {}, // 当前选中路由
}

const mutations = {
  // 获取登录用户状态
  SET_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  },
  // 设置路由
  SET_ROUTE (state, route) {
    state.activeRoute = route
  },
  // 设置 token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  DEL_TOKEN: (state) => {
    state.token = null
  },
  SET_AUTH_CODE: (state, code) => {
    state.authCode = code
  },
  DEL_AUTH_CODE: (state) => {
    state.authCode = null
  },
  CLEAR_STORAGE: (state) => {
    Object.assign(state, {
      token: null,
      authCode: null,
      userInfo: null,
    })
  }
}

const actions = {
  setTabBar({ commit }, active) {
    commit('SET_TABBAR', active)
  },
  setRoute( { commit }, route) {
    commit('SET_ROUTE',route)
  },
  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  delToken({ commit }) {
    commit('DEL_TOKEN')
  },
  setAuthCode({ commit }, code) {
    commit('SET_AUTH_CODE', code)
  },
  delAuthCode({ commit }) {
    commit('DEL_AUTH_CODE')
  },
  setUserInfo({ commit }, info) {
    commit('SET_USER_INFO', info)
  },
  clearStorage({ commit }) {
    commit('CLEAR_STORAGE')
  }
}

const store = createStore({
  state: initialState,
  mutations,
  actions,
})

export default store
