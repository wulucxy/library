import { createStore } from 'vuex'

const initialState = {
  tabBarActive: 'home',
  token: null,
  authCode: null,
  userInfo: null,
}

const mutations = {
  // 获取登陆状态
  // setLoginType (state, type) {
  //   state.loginType = type
  // },
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
  SET_TABBAR: (state, active) => {
    state.tabBarActive = active
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
