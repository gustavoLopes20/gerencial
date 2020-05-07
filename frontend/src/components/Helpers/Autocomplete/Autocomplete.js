import ApiService from '../../../services/api.service'

export default {
  name: 'autocomplete',
  components: {},
  props: {
    dataSource: Array,
    placeholder: String,
    apiSearch:String,
    keyName:String,
    descriptionKey:String
  },
  data () {
    return {
      keywords: null,
      description: null,
      lstOptions: [],
      selected: false,
      focus : false
    }
  },
  asyncComputed: {
    async filterData(){
      if(this.apiSearch  && this.keywords != null){
        this.lstOptions = await ApiService.chamaApi(`${this.apiSearch}?q=${this.keywords}`);
      }else{
        this.lstOptions = []
      }
      //this.lstOptions = [ { Name: 'prod1', RID : 'ri1'} ]

      return this.lstOptions
    }
  },
  computed: {
    aplicaCss(){
      return this.keywords ? { 'active' : this.lstOptions.length && this.focus } :  { 'active' : false }
    }
  },
  mounted () {
    //this.keywords = 
  },
  methods: {
    selectedItem(item){
      this.keywords = item.RID
      this.description = item.Name
      this.$emit("model",item)   
      this.focus = false
      this.selected = true
    },
  }
}
