import DefaultUtils from '../../../utils/default.utils'
import Loading from '../../Helpers/Loading/index.vue'
export default {
  name: 'login',
  components: {
    Loading
  },
  props: [],
  data () {
    return {
      errors: null,
      model: { Email:null,Senha:null },
      formValid: false,
      loading1: false
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    async fazerLogin(e) {
      e.preventDefault()

      this.errors = null
      this.formValid = false
      this.loading1 = true

      if (!DefaultUtils.validEmail(this.model.Email))
        this.errors = "E-mail ou senha inválidos."
      else {
        const resp = await this.$store.dispatch("account/login", this.model)
        
        if (resp.Sucesso) {
          const tiposGerenc = ["Master","Administrativo"]
          if(tiposGerenc.includes(this.$store.getters['account/userType'])){
            this.$router.push('/gerencial')
          }else if (DefaultUtils.validaVariavel(this.isCheckoutProgress)) {
            this.$router.push("/site/checkout")
          } else {
            this.$router.push("/site/user")
          }
        } else {
          this.errors = resp.Mensagem
        }
      }
      this.model = {Email:null,Senha:null},
      this.loading1 = false
    },
    redirectRegister() {
      let valid = DefaultUtils.validEmail(this.model.Email2)
      this.errors = ""

      if (valid) {
        this.$store.state.emailCad = this.model.Email2
        this.$router.push("/account/cadastro")
      } else {
        this.errors = "E-mail inválido."
      }
    },
  }
}


