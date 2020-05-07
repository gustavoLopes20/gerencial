import baseMixins from '../../../../mixins/base.mixins'
import VuePictureSwipe from 'vue-picture-swipe'

export default {
  mixins:[baseMixins],
  name: 'detail-promo',
  components: {
    VuePictureSwipe
  },
  props: { item : Object},
  data () {
    return {
      imgs : [{src: this.mapUrl(this.item.ImgPrincipal),thumbnail: this.mapUrl(this.item.ImgPrincipal),w: 800,h: 480}]
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    clickEventEmit(){
      this.$emit('closeEvent', null)
    },
  }
}


