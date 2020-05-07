import baseMixin from '../../../mixins/base.mixins'
import { mapGetters } from 'vuex'

export default {
  name: 'header-gerenc',
  mixins:[baseMixin],
  components: {},
  props: [],
  data() {
    return {
      menuClick: false,
      isActiveBtSubMenu: false,
      id_atual: -1,
      activeMenuUser: false
    }
  },
  computed: {
    ...mapGetters('notification', {
      notification: 'orderNotificationObj',
      notifiQtd : 'notificationQtd',
    }),
    clickMenu() {
      return this.menuClick ? 'active-menu' : null
    },
    menuDataSource(){
      return [
        {
          Router: "/gerencial/dashboard",
          Name: "Dashboard",
          IconClass: "fas fa-tachometer-alt",
          Children: [],
        },
        {
          Router: "/gerencial/departament",
          Name: "Departamentos",
          IconClass: "fas fa-th-list",
          Children: [],
        },
        {
          Router: "/gerencial/products",
          Name: "Produtos",
          IconClass: "fas fa-cube",
          Children: [],
        },
        {
          Router: "",
          Name: "Vendas",
          IconClass: "fas fa-chart-bar",
          Children: [
            {
              Router: "/gerencial/orders",
              Name: "Pedidos",
              IconClass: "fas fa-shopping-basket",
              Children: []
            },
            {
              Router: "/gerencial/promotions",
              Name: "Ofertas",
              IconClass: "fas fa-tags",
              Children: []
            },
            {
              Router: "/gerencial/reports",
              Name: "Relatórios",
              IconClass: "fas fa-chart-bar",
              Children: []
            },
          ],
        },
        {
          Router: "/gerencial/frete",
          Name: "Fretes",
          IconClass: "fas fa-truck-moving",
          Children: [],
        },
      ]
    }
  },
  mounted() {
    //this.$store.dispatch('notification/geNotification', null)
  },
  methods: {
    onclickMenu() {
      this.menuClick = !this.menuClick ? true : false
    },
    clickMenuUser(option){
      this.activeMenuUser = !this.activeMenuUser ? true : false
    },
    aplicaCssLink(index){
      this.id_atual = index
      this.isActiveBtSubMenu = !this.isActiveBtSubMenu ? true : false
    },
    activeMenu(value){
      
      if(typeof value != "undefined"){
        this.menuClick = value;
      }else{
        this.menuClick = !this.menuClick ? true : false;
      } 
    },
    reditectTo(uri){
      this.activeMenuUser = false
      if(this.$route.path != uri)
        this.$router.push(uri)
    },
    async logout(){
      await this.$store.dispatch("account/logout") 
      this.$router.push("/")
    }
  }
}
