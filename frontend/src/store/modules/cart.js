import UtilsDefault from '../../utils/default.utils'

const cookieName = 'cart_items'

const _frete = UtilsDefault.jsonPaseStr(UtilsDefault.base64(UtilsDefault.getCookie('cart_frete')))
const _items = UtilsDefault.jsonPaseStr(UtilsDefault.base64(UtilsDefault.getCookie(cookieName)))

const _freteModel = {
  CepModel: {
    cep: null,
    logradouro: null,
    complemento: null,
    bairro: null,
    localidade: null,
    uf: null,
    unidade: null,
    ibge: null,
    gia: null,
    nameDest : null,
    numero : null
  },
  TypeFrete: null,
  Preco : null,
  DiasEntrega : null,
  Distance: null,
  Origin: null,
  Destino : null,
  RID: null,
}

const state = {
  items: typeof _items === 'boolean' ? [] : _items,
  checkoutStatus: null,
  frete: typeof _frete === 'boolean' ? _freteModel : _frete
}
  
// getters
const getters = {
    cartProducts: (state) => {
      return state.items
    },

    isCheckoutProgress: (state) => {
      return state.items.length > 0
    },

    totalItemsCart: (state) => {
        return state.items.length
    },

    cartFretePrice: (state) => {
      return state.frete.Preco
    },

    cartFreteObj: (state) => {
      return state.frete
    },
  
    cartSubTotalPrice: (state,getters) => {
      return UtilsDefault.toFloat(getters.cartProducts.reduce((total, product) => {
        return total + product.Price * product.Quantity
      }, 0))
    },

    cartTotalPrice: (state,getters) => {
      const tot1 = UtilsDefault.toFloat(getters.cartSubTotalPrice)
      const tot2 = UtilsDefault.toFloat(getters.cartFretePrice)
      return UtilsDefault.toFloat(tot1 + tot2)
    }
}
  
// actions
const actions = {

    addProductToCart({ state, commit }, product) {
      commit('setCheckoutStatus', 'pendente')
    
      if (product.Quantity > 0) {
        const cartItem = state.items.find(item => item.RID === product.RID)
        if (!cartItem) {
          commit('pushProductToCart', product)
        } else {
          //commit('incrementItemQuantity', cartItem.RID)
        }
      }
    },

    addFreteToCart({ state, commit }, frete) {
        commit('setCheckoutStatus', 'pendente')
        commit('setFrete', frete)
    },
    updateItemQtd({ commit }, rid, qtd) {
        commit('updateItemQuantity', rid, qtd)
    },
    removeItemCart({commit}, rid){
        commit('removeCartItem', rid)
    },
    clearCart({commit}){
      commit('removeCart')
    },
}
  
// mutations
const mutations = {
    removeCart(){
      UtilsDefault.removeCookie('cart_frete')
      UtilsDefault.removeCookie(cookieName)
    },
    setFrete(state,frete){
      if(frete != null){
        state.frete = frete
        UtilsDefault.setCookie('cart_frete',UtilsDefault.base64(JSON.stringify(state.frete))) 
      }else{
        state.frete = _freteModel
        UtilsDefault.removeCookie('cart_frete')
      }
    },
    pushProductToCart(state,product) {
      const _price = UtilsDefault.toFloat(product.Price)

      state.items.push({
        Name : product.Name,
        RID: product.RID,
        Quantity: 1,
        Price: _price,
        ProductImags : product.ImagePrinc,
        SubTotal : _price * 1,
        QtdMaxPerPedido : product.QtdMaxPerPedido
      })
      UtilsDefault.setCookie(cookieName,UtilsDefault.base64(JSON.stringify(state.items)))  
    },
    updateItemQuantity(state,{rid, qtd}) {
        const i = state.items.findIndex(a => a.RID === rid)
        if(i != -1){
            state.items[i].Quantity = Number(qtd)
            state.items[i].SubTotal = state.items[i].Price * state.items[i].Quantity
            
            UtilsDefault.setCookie(cookieName,UtilsDefault.base64(JSON.stringify(state.items)))
        }  
    },
    incrementItemQuantity(state,rid) {
      const cartItem = state.items.find(item => item.RID === rid)
      
      cartItem.Quantity++
      cartItem.SubTotal = UtilsDefault.toFloat(cartItem.Price * cartItem.Quantity)

      UtilsDefault.setCookie(cookieName,UtilsDefault.base64(JSON.stringify(state.items)))
    },
    setCartItems(state, { items }) {
      state.items = items
    },
    removeCartItem(state,rid) {
        state.items = state.items.filter(a => {
            return a.RID != rid
        })
        
        if(state.items.length > 0){
            UtilsDefault.setCookie(cookieName,UtilsDefault.base64(JSON.stringify(state.items)))
        }else{
            UtilsDefault.removeCookie(cookieName)
            UtilsDefault.removeCookie('cart_frete')
        }
       
    },
    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    }
}
  
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}