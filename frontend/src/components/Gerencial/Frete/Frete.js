import ApiService from "../../../services/api.service"
import GridMixins from "../../../mixins/grid.mixins"
import DefaultUtils from "../../../utils/default.utils"

export default {
  mixins: [GridMixins],
  name: 'frete',
  components: {},
  props: [],
  data () {
    return {
      updateLis : false
    }
  },
  computed: {

  },
  mounted () {
     // configs grid
     this.optionsDataSource.permissons = { Update: false, Delete:true, Add : true, Detail : false }
     
     this.optionsDataSource.columnsVisiable = [
       { title: 'Id', key: 'Id', class: 'columnCenter' },
       { title: 'Inicio (KM)', key: 'DistanceIni', class: 'columnCenter color-info bold' },
       { title: 'Fim (KM)', key: 'DistanceFim', class: 'columnCenter color-success bold' },
       { title: 'Entrega (Dias)', key: 'DiasEntrega', class: 'columnCenter' },
       { title: 'Preço', key: 'Preco', class: 'columnRight bold' },
       { title: 'Tipo', key: 'TypeFrete', class: 'columnCenter', classCondition: [
        { value : "Convencional", operation: "==", add: { "alert-info" : true, "columnCenter" : true } },
        { value : "Agendada", operation: "==", add: { "alert-warning" : true, "columnCenter" : true } },
      ] },
     ]
  },
  methods: {
    async saveItem(){

      this.model.Value = DefaultUtils.toFloat(this.model.Value)
      this.model.DistanceIni = DefaultUtils.toFloat(this.model.DistanceIni)
      this.model.DistanceFim = DefaultUtils.toFloat(this.model.DistanceFim)
      this.model.DiasEntrega = Number(this.model.DiasEntrega)
      this.model.Type = Number(this.model.Type)

      let resp = null

      if(this.model.RID){
        resp = await ApiService.chamaApi('api/v1/frete/update', this.model)
      }else{
        resp = await ApiService.chamaApi('api/v1/frete/save', this.model)
      }
      //this.model = DefaultUtils.clearObject(this.model)
      this.activeFormData(false,null)
    },
    formatNumber(key) {
      this.model[key] = DefaultUtils.formatReal(this.model[key])
    },
  }
}


