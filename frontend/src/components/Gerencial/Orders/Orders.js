import ApiService from "../../../services/api.service"
import GridMixins from "../../../mixins/grid.mixins"

export default {
  mixins: [GridMixins],
  name: 'orders',
  components: {},
  props: [],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {
    // configs grid
    this.optionsDataSource.permissons = { Update: true, Delete:false, Add : false, Detail : false }

    // Pendente, AguradandoPagamento, PagamentoAprovado, EmTransporte, Concluido, Cancelado, Reembolsado
    this.optionsDataSource.columnsVisiable = [
      { title: 'Id', key: 'Id', class: 'columnCenter' },
      { title: 'Cliente', key: 'Cliente', class: 'columnLeft' },
      { title: 'Total', key: 'Total', class: 'columnRight bold' },
      { title: 'Situação', key: 'Situacao', class: 'columnCenter', classCondition: [
        { value : "Pendente", operation: "==", add: { "alert-warning" : true, "columnCenter" : true } },
        { value : "AguradandoPagamento", operation: "==", add: { "alert-info" : true, "columnCenter" : true } },
        { value : "PagamentoAprovado", operation: "==", add: { "alert-info" : true, "columnCenter" : true } },
        { value : "EmTransporte", operation: "==", add: { "alert-info" : true, "columnCenter" : true } },
        { value : "Concluido", operation: "==", add: { "alert-success" : true, "columnCenter" : true } },
        { value : "Cancelado", operation: "==", add: { "alert-danger" : true, "columnCenter" : true } },
        { value : "Reembolsado", operation: "==", add: { "alert-info" : true, "columnCenter" : true } },
      ] },
      { title: 'Dt. Cadastro', key: 'DtCadastro', class: 'columnCenter' },
      { title: 'Dt. Modifição', key: 'DtModificacao', class: 'columnCenter' },
    ]
  },
  methods: {
    detailEvent(item){
      this.detailItem = item
      this.tabFormActive = false
      this.tablDetailCustom = true
      console.log(item)
    },
  }
}


