import DefaultUtils from '../../utils/default.utils'
import ApiService from '../../services/api.service'
import VueCookies from "vue-cookies"
import { HubConnectionBuilder } from "@aspnet/signalr"

const orderObj = DefaultUtils.jsonPaseStr(DefaultUtils.base64(DefaultUtils.getCookie('notification')))


const state = {
  orderObj : typeof orderObj === 'boolean' ? { } : orderObj,
  notificationQtd : 1,
}

// getters
const getters = {
  orderNotificationObj : state => state.orderObj,
  notificationQtd : state => state.notificationQtd,
}

// actions
const actions = {

  geNotification({ commit }) {

    const connection = new HubConnectionBuilder()
      .withUrl(ApiService.mapUrl('/notification/order')).build()

    connection.on("SendNoticeEventToClient", data => {
      commit("setNotification", data)
    })

    // connection.start().then(()=> connection.invoke("StartReceive"))
    connection.start()
  },
}

// mutations
const mutations = {

  setNotification(state, resp) {
    state.orderObj = resp
    state.notificationQtd +=1;

    VueCookies.set("notification",DefaultUtils.base64(JSON.stringify(resp)))
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}