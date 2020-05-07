import DefaultUtils from '../../utils/default.utils'
import ApiService from '../../services/api.service'
import VueCookies from "vue-cookies"
import jwtDecode from 'jwt-decode'

const cookieUserName = 'user_session'
const cookieTokenName = 'access_token'

const _user = DefaultUtils.jsonPaseStr(DefaultUtils.base64(DefaultUtils.getCookie(cookieUserName)))
const _token = DefaultUtils.base64(DefaultUtils.getCookie(cookieTokenName))

const state = {
  user: typeof _user === 'boolean' ? {} : _user,
  token: _token || "",
  status: null,
  tokensExpiry: null,
}
  
// getters
const getters = {
  isLoggedIn: state => !!state.token,
  userType: state => state.user.TipoUser,
  authStatus: state => state.status,
  tokensExpiry: state => state.tokensExpiry,
  userOnline: state => state.user,
}
  
// actions
const actions = {

  async login({ commit }, model) {
    const resp = await ApiService.chamaApi("api/v1/access/login", model)

    if (resp.Sucesso) {
      commit("auth_success", resp)
    } else {
      commit("auth_error")
    }
    return resp
  },
  logout({ commit }) {
    // const resp = await ApiService.chamaApi("api/v1/acesso/logout")
    commit("logout")
    //return resp
  },
}
  
// mutations
const mutations = {
    auth_request(state) {
      state.status = "loading"
    },
    auth_success(state, resp) {
      const _user =  jwtDecode(resp.Token)

      state.status = "success"
      state.token = resp.Token
      state.tokensExpiry = _user.expires
      state.TipoUser = _user.role
    
      state.user = {
        Name: _user.unique_name,
        TipoUser: _user.role,
        Email: _user.email,
        DtNascimento : _user.dt_nascimento,
        Tel :  _user.Tel,
      }

      VueCookies.set(cookieTokenName, resp.Token, _user.expires[0], null)
      DefaultUtils.setUserData(state.user)
    },
    auth_error(state) {
      state.status = "error"
      state.token = null
      state.user = {}
      state.tokensExpiry = null

      VueCookies.remove(cookieTokenName)
      VueCookies.remove(cookieUserName)
    },
    logout(state) {
      state.status = null
      state.token = null
      state.user = {}
      state.tokensExpiry = null

      VueCookies.remove(cookieTokenName)
      VueCookies.remove(cookieUserName)
    },
}
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}