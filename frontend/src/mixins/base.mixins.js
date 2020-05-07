import ApiService from '../services/api.service'
import DefaultUtils from '../utils/default.utils'
import FlashMensagem from '../components/Helpers/FalshMensagem/index.vue'

const baseMixin = {
    components :{
      FlashMensagem
    },
    data () {
        return {
          nextLabel : '<i class="fas fa-chevron-circle-right fa-2x"></i>',
          prevLabel : '<i class="fas fa-chevron-circle-left fa-2x"></i>',
          tabActive : false,
          flashMsgObj : { active: true, type : 'success', text : 'Registro salvo com sucesso'}
        }
    },
    created () {

    },
    methods: {
      tabClick(vlr, item = null){
        this.tabActive = vlr
        this.itemAtual = item
      },
      closeDialog(){
        this.dialogData.active = false
      },
      alert(title,msg,type = 'primary'){
        this.dialogData = {
          title: title,
          mensagem: msg,
          type: type,
          active: true
        }
      },
      mapUrl(uri){
        return ApiService.mapUrl(uri)
      },
      chamaApi(uri, dataObject){
        return ApiService.chamaApi(uri,dataObject)
      },
      reditectTo(uri){
        this.$router.push(uri)
      },
      emptyObj(obj){
        return DefaultUtils.clearObject(obj)
      },
      isObjectEmpty(obj){
        return DefaultUtils.isObjectEmpty(obj)
      },
      serializeQuery(value){
        return DefaultUtils.serializeQuery(value)
      },
    }
}
export default baseMixin