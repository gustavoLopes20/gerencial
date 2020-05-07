import GridMixins from '../../../mixins/grid.mixins'
import DefaultUtils from '../../../utils/default.utils'
import Autocomplete from '../../Helpers/Autocomplete/index.vue'
import ApiService from '../../../services/api.service'
import DetailPromo from   './DetailPromo/index.vue'

export default {
  mixins: [GridMixins],
  name: 'promotions',
  components: {
    Autocomplete,
    DetailPromo
  },
  props: [],
  data () {
    return {
      formData : [],
      filename: null,
    }
  },
  computed: {

  },
  async mounted () {
   // configs grid
    this.optionsDataSource.permissons = { Update: false, Delete:true, Add : true, Detail : false, DetailCustom: true }

    this.optionsDataSource.columnsVisiable = [
      { title: 'Id', key: 'Id', class: 'columnCenter' },
      { title: 'Produto', key: 'Product', class: 'columnLeft' },
      { title: 'Inicio', key: 'InicioOferta', class: 'columnCenter bold color-success' },
      { title: 'Fim', key: 'FimOferta', class: 'columnCenter bold color-info' },
      { title: 'Banner', key: 'Banner', class: "columnCenter", classCondition: [
        { value : "Sim", operation: "==", add: { "alert-success" : true, "columnCenter" : true } },
        { value : "Nao", operation: "==", add: { "alert-warning" : true, "columnCenter" : true } },
      ] },
      { title: 'Preço', key: 'Value', class: 'columnRight bold' },
      { title: 'Ativo', key: 'Status', class: "columnCenter", classCondition: [
        { value : "Ativo", operation: "==", add: { "alert-success" : true, "columnCenter" : true } },
        { value : "Inativo", operation: "==", add: { "alert-danger" : true, "columnCenter" : true } },
      ] },
    ]
  },
  methods: {
    formatNumber(){
      this.model.Value = DefaultUtils.formatReal(this.model.Value)
    },
    async saveItem(){
      this.activeLoading = true
      //console.log(DefaultUtils.isObjectEmpty(this.model))

      if(!DefaultUtils.isObjectEmpty(this.model)){
        this.model.BannerPrincipal = this.model.BannerPrincipal == 'true' ? true : false
        this.model.Value = Number(this.model.Value)

        const resp = await ApiService.chamaApi('api/v1/oferta/save', this.model)
        const _banner = this.model.BannerPrincipal ? 1 : 0 

        if(resp.Sucesso){
          const resp2 = await ApiService.chamaApi(`api/v1/oferta/uploadimagem/${resp.Retorno}/banner/${_banner}`, this.formData);
        }
        this.model = DefaultUtils.clearObject(this.model)
        this.tabActive = false
      }
      this.activeLoading = false
      this.activeFormData(false,null)
    },
    async fileChange(event){
      
      let fileList = event.target.files
      this.activeLoading = true
      let aux = []

      if (fileList.length > 0) {
        
        let formData = new FormData()

        for(var file of fileList){
          formData.append(file.name, file)
          aux.push(file.name)
        }
        this.formData = formData
        //console.log(this.formData)        
        // alert(resp.Mensagem);
      }
      this.filename = aux.join(',')
      this.activeLoading = false
    },
    eventProd(item){
      this.model.ProductId = item.RID
    },
    detailEvent(item){
      this.detailItem = item
      this.tabFormActive = false
      this.tablDetailCustom = true
      console.log(item)
    },
  }
}
