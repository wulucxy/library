import localStorage from './localStorage'

export const tokenKey = 'access_token'
export const userInfoKey = 'userInfo'
export const authCodeKey = 'authCode'

export const getToken = function () {
  return localStorage.get(tokenKey) || {}
}
export const setToken = function (token) {
  localStorage.set(tokenKey, token)
}
export const delToken = function () {
  localStorage.del(tokenKey)
}

export const getAuthCode = function () {
  return localStorage.get(authCodeKey) || {}
}
export const setAuthCode = function (code) {
  localStorage.set(authCodeKey, code)
}
export const delAuthCode = function () {
  localStorage.del(authCodeKey)
}

export const getUserInfo = function () {
  return localStorage.get(userInfoKey) || {}
}
export const setUserInfo = function (data) {
  localStorage.set(userInfoKey, data)
}
export const delUserInfo = function () {
  localStorage.del(userInfoKey)
}

export const clearStorage = function(){
  delToken()
  delAuthCode()
  delUserInfo()
}
