export default {
  name: 'falsh-mensagem',
  components: {},
  props: {
    text : String,
    type : String,
    active : Boolean
  },
  data () {
    return {

    }
  },
  computed: {
    aplicaCss(){
      switch(this.type){
        case 'success':
          return {  'alert-success' : true}
        case 'danger':
          return {  'alert-danger' : true}
        case 'info':
          return {  'alert-info' : true}
        case 'warning':
          return {  'alert-warning' : true}
      }
    }
  },
  mounted () {

  },
  methods: {

  }
}
