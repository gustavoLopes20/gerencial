import GridMixins from '../../../mixins/grid.mixins'
import DefaultUtils from '../../../utils/default.utils'
import { VueEditor } from "vue2-editor"
import Loading from '../../Helpers/Loading/index.vue'
import FormProduct from './FormProduct/index.vue'

export default {
  name: 'products',
  mixins: [GridMixins],
  components: {
    VueEditor,
    Loading,
    FormProduct,
  },
  props: {
  },
  data() {
    return {
      activeLoading:true,
      errors: "",
    }
  },
  async mounted(){
    this.optionsDataSource.permissons = { Update: true, Delete:true, Add : true, Detail : true }

    this.optionsDataSource.columnsVisiable = [
      { title: 'Id', key: 'Id', class: 'columnCenter' },
      { title: 'Nome', key: 'Name', class: "columnLeft"  },
      { title: 'Preço', key: 'Price', class: "columnRight" },
      { title: 'Qtd. Estoque', key: 'Quantity', class: "columnCenter",  classCondition : [
        { value : 0, operation: "<=",add: { "color-danger bold" : true, "columnCenter" : true } },
        { value : 0, operation: ">=",add: { "color-success bold" : true, "columnCenter" : true } },
      ] },
      { title: 'Ativo', key: 'ActiveStr', class: "columnCenter", classCondition: [
        { value : "Sim", operation: "==", add: { "alert-success" : true, "columnCenter" : true } },
        { value : "Nao", operation: "==", add: { "alert-danger" : true, "columnCenter" : true } },
      ] },
    ]

    this.optionsDataSource.columnsFilter = [
      {  key: 'Id', type : 'number', placeholder : 'Buscar por Id' },
      {  key: 'Name', type : 'text', placeholder : 'Buscar por Nome' },
      {  key: 'Price', type : 'number', placeholder : 'Buscar por Preço' },
    ]

    this.optionsDataSource.columnsDetails = [
      { key: 'Id', title: 'Id'}, 
      { key: 'Name', title: 'Nome'}, 
      { key: 'Price', title: 'Preço'}, 
      { key: 'Quantity', title: 'Qtd'}, 
      { key: 'UndMedida', title: 'Unidade'},  
      { key: 'Department', title: 'Departamento'}, 
      { key: 'ActiveStr', title: 'Ativo'}, 
      { key: 'ExternelReference', title: 'Mov. Sistemas Id'},
    ]
    //await this.getDataSource()
  },
  watch:{
    // async filterActive(value)  {
    //  if(!value){
    //   await this.getDataSource(0)
    //  }
    // }
  },
  methods: {
    clickFilter(){
      this.filterActive = !this.filterActive ? true : false
    },
    async deleteEvent(item){
      const resp = await this.chamaApi(`api/midia/delete/${item.RID}`)
      this.alert("Mensagem",resp.Mensagem,resp.Sucesso ? 'success':'danger')
      await this.getDataSource()
    },
    // async getDataSource(value = 0){
      
    //   this.activeLoading = true
    //   let uri = ""

    //   if(typeof value == "object"){
    //     if(value["search"] !== undefined && this.filterActive)
    //       uri = `api/v1/product/list/${value.startAtual}?desc=${value.search.desc}`
    //     else
    //       uri = `api/v1/product/list/${value.startAtual}`
    //   }else{
    //     uri = `api/v1/product/list/${value}`
    //   }

    //   const result = await this.chamaApi(uri)

    //   if(result.DataSource.length){
    //     this.optionsDataSource.paginator.totGeralRows = result.Total
    //     this.dataSource = result.DataSource
    //   }
      
    //   this.activeLoading = false
    // },
    editEvent(item){
      //console.log(item)
      this.tabActive = true
      this.itemAtual = item
    },
  },
  computed: {
   aplicaCssBtFilter(){
     return !this.filterActive ? {
      'btn' : true,
      'btn-outline-info' : true, 
      'btn-outline-danger' : false
     } : { 
       'btn' : true,
       'btn-danger' : true, 
       'btn-outline-info' : false
      }
   }
  }
}
