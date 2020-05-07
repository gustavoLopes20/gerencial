import ApiService from '../../../services/api.service'

export default {
  name: 'PainelInfo',
  components: {},
  props: [],
  data () {
    return {
      infos:{
        TotPedidos: '800',
        TotVendas: '15080',
        TotUsuario: '1200',
        TotVisitaMes : '1250'
      }
    }
  },
  computed: {

  },
  mounted () {
    //await this.getDataSource();https://compacheco.com.br/api/v1/acesso/loginMovSistema
    // const resp =  ApiService.chamaApi('api/v1/acesso/loginMovSistema');
    // console.log(resp);
  },
  methods: {
    async getDataSource(){
      this.infos = await ApiService.chamaApi('api/v1/bashboard/indicadores');
    },
  }
}
