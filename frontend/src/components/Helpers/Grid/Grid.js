import Loading from "../Loading/index.vue"
import DataSource from './DataSource/index.vue'
import Detail from './Detail/index.vue'
import Filters from './Filters/index.vue'

export default {
  name: "grid",
  components: {
    Loading,
    DataSource,
    Detail,
    Filters,
  },
  props: {
    optionsData : Object,
    urlGet: String,
    urlDel: String,
  },
  data() {
    return {
      removelProds1: 1,
      activeLoading : false,
      detailAtual : null,
      tabActive : {
        form : true,
        filter : false,
        dataSource : true,
        detail : false
      },
    }
  },
  computed: {
    aplicssBts(){
      return this.tabActive.filter ? { 'btn btn-outline-danger' : true } : { 'btn btn-outline-info' : true } 
    },
  },
  mounted() {
    // console.log(this.dataSource)
  },
  methods: {
    clickFilter(){
      this.tabActive.filter = !this.tabActive.filter
    },
    clickItem(item, eventName) {
      if (eventName == "eventDelete") {
        if (confirm("Deseja realmente deletar?")) {
          this.$emit(eventName, item)
        }
      } else {
        this.$emit(eventName, item)
      }
    },
    detailEvent(item){
      this.detailAtual = item
      this.tabActive.detail = item == null ? false : true
      this.tabActive.dataSource = item == null ? true : false
    },
    detailCustomEvent(item){
      this.$emit('detailCunstom', item)
    },
  }
}
