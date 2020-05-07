import ApiService from '../services/api.service'
import DefaultUtils from '../utils/default.utils'
import FlashMensagem from '../components/Helpers/FalshMensagem/index.vue'
import Grid from '../components/Helpers/Grid/index.vue'

const GridMixins = {
    components :{
      FlashMensagem,
      Grid,
    },
    data () {
        return {
          model : {},
          detailItem : {},
          tabActive : false,
          tabFormActive : false,
          tablDetailCustom : false,
          flashMsgObj : { active: false, type : 'success', text : 'Registro salvo com sucesso'},
          optionsDataSource: {
            permissons: { Update: false, Delete:false, Add : false, Detail : false },
            paginator : { maxPags: 10, totGeralRows: 0 },
            multcheck: false,
            columnsVisiable: [
              // { title: 'Id', key: 'Id', class: 'columnCenter' },
              // { title: 'Nome', key: 'Name', class: 'columnLeft' },
              // { title: 'Depart. Principal', key: 'DepartParentRID', class: 'columnLeft' },
              // { title: 'Ativo', key: 'ActiveStr', class: "columnCenter", classCondition: [
              //   { value : "Sim", operation: "==", add: { "alert-success" : true, "columnCenter" : true } },
              //   { value : "Nao", operation: "==", add: { "alert-danger" : true, "columnCenter" : true } },
              // ] },
            ],
            columnsFilter : [
              // { key: 'Id', title: 'Id'}, 
            ],
            columnsDetails : [
              // {  key: 'Id', type : 'number', placeholder : 'Buscar por Id' },
            ],
          },
          dataOpitons : [],
        }
    },
    created () {

    },
    mounted () {
      setTimeout(() => {
        this.flashMsgObj.active = false
      }, 10000) // 10s
    },
    methods: {
      activeFormData(vlr, item = {}){
        this.tabFormActive = vlr
        this.model = item
        this.flashMsgObj.active = false
      },
      mapUrl(uri){
        return ApiService.mapUrl(uri)
      },
      reditectTo(uri){
        this.$router.push(uri)
      },
    }
}
export default GridMixins