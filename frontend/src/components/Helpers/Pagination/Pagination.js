import DefaultUtils from '../../../utils/default.utils'

export default {
  name: 'pagination',
  components: {},
  props: {
    totalGeralRows: Number,
    maxPags : Number,
    rowsPerPage: Number
  },
  data () {
    return {
      totalItems: this.totalGeralRows,
      currentPage: 0,
      totalPages: 0,
      startPage: 0,
      endPage: 0,
      startIndex: 0,
      endIndex: 0,
      rangeFMT: [0,0],
      pages: [],
      pageSize : typeof this.rowsPerPage != "undefined" ? this.rowsPerPage : 50, 
      maxPages : typeof this.maxPags != "undefined" ? this.maxPags : 5,
    }
  },
  computed: {
    
  },
  mounted () {
    this.paginate(1)
  },
  methods: {
    setModel(pagObj){
      this.currentPage =  pagObj.currentPage
      this.pageSize =  pagObj.pageSize
      this.totalPages =  pagObj.totalPages
      this.startPage = pagObj.startPage
      this.endPage =  pagObj.endPage
      this.startIndex = pagObj.startIndex
      this.endIndex = pagObj.endIndex
      this.pages =  pagObj.pages
      this.rangeFMT = pagObj.rangeFMT

      // console.log(pagObj)

      this.$emit("pageChange", {
        startIndex: this.startIndex,
        endIndex : this.endIndex,
        currentPage: this.currentPage
      })
    },
    paginate(currentPage) {
      this.setModel(DefaultUtils.paginate(this.totalItems,currentPage,this.pageSize,this.maxPages))
    },
    prevPage(){
      if(this.currentPage >= 1){
        this.currentPage--
        this.setModel(DefaultUtils.paginate(this.totalItems,this.currentPage,this.pageSize,this.maxPages))
      }
    },
    nextPage(){
      if(this.currentPage >= 1 && this.currentPage < this.totalItems){
        this.currentPage++
        this.setModel(DefaultUtils.paginate(this.totalItems,this.currentPage,this.pageSize,this.maxPages))
      }
    }
  }
}
