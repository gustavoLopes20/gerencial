import DefaultUtils from '../../utils/default.utils'
import ApiService from '../../services/api.service'
import VueCookies from "vue-cookies"

const locationObj = DefaultUtils.jsonPaseStr(DefaultUtils.base64(DefaultUtils.getCookie('location')))


const state = {
  locationObj : typeof locationObj === 'boolean' ? { } : locationObj,
}

// getters
const getters = {
  currentLocation : state => state.locationObj
}

// actions
const actions = {

  async getLocation({ commit },cep) {
    
    cep = cep.replace(/\D/g, "")
    const resp = await ApiService.chamaApi2(`https://viacep.com.br/ws/${cep}/json/`)

    if (typeof resp.erro == "undefined") {
      commit("setLocation", resp)
    }
  },

  setLocationObj({ commit },model) {
    commit("setLocation", model)
  },

  geoFindMe({commit},resolve,error){
    navigator.geolocation.getCurrentPosition( async (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const mapLink = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`

      //console.log(`Latitude: ${lat} °, Longitude: ${lon} °`)

      const result = await ApiService.chamaApi2(mapLink)

      if(typeof result.error == "undefined"){
        const address = result.address
        const resp = {
          cep: address.postcode,
          bairro: address.suburb,
          localidade: address.city,
          uf: DefaultUtils.getState(address.state),
        }
        commit("setLocation",resp)
        resolve(resp)
      }else{
        error("Endereco nao encontrado")
      }

   },err => {
    console.log(`The Locator was denied. : ${err}`)
    error(err)
   })
  }

}

// mutations
const mutations = {

  setLocation(state, resp) {
    state.locationObj = resp
    VueCookies.set("location",DefaultUtils.base64(JSON.stringify(resp)),"24h")
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}