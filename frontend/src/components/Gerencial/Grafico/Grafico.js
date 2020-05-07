import BarChart from './BarChart.js'
import LineChart from './LineChart.js'
import ApiService from '../../../services/api.service'

export default {
  name: 'grafico',
  components: {
    BarChart,
    LineChart
  },
  props: [],
  data (){
    return{
      datacollection: null,
      data_visitas : null,
      options_visitas: null
    }
  },
  computed: {

  },
  async mounted () {
   await this.fillData();
   this.getDataVendas();
  },
  methods: {
    async fillData() {
      const resp = await ApiService.chamaApi("");

      this.data_visitas = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
          {
            label: 'Visitas',
            backgroundColor: '#757575',
            data: [resp]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    getDataVendas(){
      this.datacollection = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
          {
            label: 'Vendas',
            backgroundColor: '#00C853',
            data: [40, 20, 15, 32, 16,  35, 18, 20, 30,50, 60, 70,]
          }
        ]
      }
    }
  }
}
