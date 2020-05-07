export default {
  name: 'detail',
  components: {},
  props: { item: Object, columnsDetails: Array },
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    clickEventEmit(){
      this.$emit("eventClose",null)
    }
  }
}
