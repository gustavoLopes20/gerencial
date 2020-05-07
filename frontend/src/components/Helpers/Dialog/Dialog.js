export default {
  name: 'helper-dialog',
  components: {},
  props: {
    title: String,
    mensagem: String,
    type: String
  },
  data () {
    return {

    }
  },
  computed: {
    dialogType(){
      switch(this.type.toLowerCase()){
        case 'danger':
          return {
            'danger' : true
          }
        case 'warning':
          return {
            'warning' : true
          }
        case 'success':
          return {
            'success' : true
          }
        case 'info':
          return {
            'info' : true
          }
        default:
          return {
            'primary' : true
          }
      }
    }
  },
  mounted () {

  },
  methods: {
    close(){
      this.$emit("close", true)
    }
  }
}
