import Pagination from '../../../Helpers/Pagination/index.vue'
import ApiService from '../../../../services/api.service'
import Loading from '../../Loading/index.vue'

export default {
  name: 'data-source',
  components: {
    Pagination,
    Loading
  },
  props: {
    urlGet: String,
    urlDel: String,
    options : Object
  },
  data () {
    let _sortOrders = {}

    for (let col of this.options.columnsVisiable) {
      _sortOrders[col.key] = 1
    }

    return {
      dataSource : [],
      sortKey: "",
      sortOrders: _sortOrders,
      model: {
        checkAll: null
      },
      mostraPanation: typeof this.options.paginator == "undefined" ? false : true,
      filterKey: null,
      modelSearch:{ },
      startAtual : 0,
      filterActive : false,
      activeLoading : false
    }
  },
  filters: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  //asyncComputed: {
  computed : {
     filterData() {
      let sortKey = this.sortKey;
      let filterKey = this.filterKey && this.filterKey.toLowerCase().trim()
      let order = this.sortOrders[sortKey] || 1
      try {
        let dataSource = JSON.parse(JSON.stringify(this.dataSource));
        //const _result = await ApiService.chamaApi(this.urlGet)

        this.existeRows = dataSource.length ? true : false

        if (filterKey) {
          dataSource = dataSource.filter(row => {
            return Object.keys(row).some(key => {
              return (
                String(row[key])
                  .toLowerCase().indexOf(filterKey) > -1
              );
            });
          });
        }

        if (sortKey) {
          dataSource = dataSource.slice().sort((a, b) => {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          });
        }
        // this.paginator.total = dataSource[0].TotRows;
        return dataSource
      } catch (ex) {
        // console.log("aqui2",ex)
        return []
      }
    },
  },
  watch:{
    async 'updateLis'(e){
      if(e){
        await this.getDataSource()
      }
    }
  },
  async mounted () {
    await this.getDataSource()
  },
  methods: {
    async getDataSource(pagination = null){
      this.activeLoading = true
      let uri = this.urlGet

      if(pagination != null){
        uri = `${uri}/${pagination.startAtual}`
      }
      const _response = await ApiService.chamaApi(uri)
      
      if(typeof _response.DataSource != "undefined" && _response.DataSource.length){
        this.options.paginator.totGeralRows = _response.Total
        this.dataSource = _response.DataSource
      }else{
        this.dataSource = _response
      }
      this.activeLoading = false
      return
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    async changePage(event) {
      this.startAtual = event.startIndex
      await this.getDataSource({  startAtual: this.startAtual, })
      //this.$emit("pageChange", { startAtual: this.startAtual, search: this.modelSearch }) // default limit 50
    },
    filterEvent(){
      //console.log(this.modelSearch)
      this.$emit("pageChange", {startAtual: this.startAtual, search: this.modelSearch})
    },
       
    objectClass(col, item) {
      if (typeof col.classCondition != "undefined") {
        for (let c of col.classCondition) {

          switch(c.operation){
            case '==':
              if (item[col.key] == c.value) {
                return c.add
              }
            break  
            case '>=':
              if (item[col.key] >= c.value) {
                return c.add
              }
            break
            case '<=':
              if (item[col.key] <= c.value) {
                return c.add
              }
            break
          }

        } 
      } else {
        return col.class
      }
    },
    checkAllProd() {
      const elements = this.$refs.selected_prod

      for (let item of elements) {
        item.checked = this.model.checkAll
      }
      this.changeCheckProd()
    },
    changeCheckProd() {
      const elements = this.$refs.selected_prod

      let elementsValue = []

      for (let item of elements) {
        if (item.checked) {
          elementsValue.push(JSON.parse(item.value))
        }
      }
      this.$emit("eventCheckbox", elementsValue)
    },
    async clickItem(item, eventName) {
      if (eventName == "eventDelete") {
        if (confirm("Deseja realmente deletar?")) {
          this.$emit(eventName, item)
        }
      } else {
        this.$emit(eventName, item)
      }
    },
    async delItem(item){
      if (confirm("Deseja realmente deletar?")) {
        const resp = await ApiService.chamaApi(`${this.urlDel}/${item.RID}`)
        await this.getDataSource()
        return;
      }
    }
  }
}
