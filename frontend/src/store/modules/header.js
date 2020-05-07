import UtilsDefault from '../../utils/default.utils'
import ApiService from '../../services/api.service'
import VueCookies from "vue-cookies"

const menuObj = UtilsDefault.jsonPaseStr(UtilsDefault.base64(UtilsDefault.getCookie('menu')))


const state = {
  menuObj: typeof menuObj === 'boolean' ? {} : menuObj,
}

// getters
const getters = {
  menuList: state => state.menuObj
}

// actions
const actions = {

  async getDepartmant({ commit }) {
    
    if(UtilsDefault.isObjectEmpty(state.menuObj)){
      const resp = await ApiService.chamaApi(`api/v1/Department/list`)

      if (resp.length) {
        commit("setMenu", resp)
      }
    }
  },
}

// mutations
const mutations = {

  setMenu(state, resp) {
    for(let item of resp){
      item.router = `/site/products?depart=${item.RID}`
    }
    state.menuObj = resp
    VueCookies.set("menu",UtilsDefault.base64(JSON.stringify(resp)),"1h")
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}