import ApiService from "../../../services/api.service"
import GridMixins from "../../../mixins/grid.mixins"

export default {
  mixins: [GridMixins],
  name: 'department',
  components: { },
  props: {},
  data () {
    return {
     
    }
  },
  computed: {

  },
  async mounted () {
    // configs grid
    this.optionsDataSource.permissons = { Update: true, Delete:false, Add : false, Detail : false }

    this.optionsDataSource.columnsVisiable = [
      { title: 'Id', key: 'Id', class: 'columnCenter' },
      { title: 'Nome', key: 'Name', class: 'columnLeft' },
      { title: 'Depart. Principal', key: 'DepartParentRID', class: 'columnLeft' },
    ]

    await this.getDepartments()
  },
  methods: {
    async saveItem(e){
      const response = await ApiService.chamaApi('api/v1/departament/save',this.model)

      this.flashMsgObj.active = true
      this.flashMsgObj.text = response.Mensagem

      if(response.Sucesso){
        this.flashMsgObj.type = "success"
      }else{
        this.flashMsgObj.type = "danger"
      }
    },
    async getDepartments(){
      this.dataOpitons = await ApiService.chamaApi('api/v1/department/list')
    }
  }
}
