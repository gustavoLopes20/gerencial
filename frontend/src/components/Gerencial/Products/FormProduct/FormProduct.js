import { VueEditor } from "vue2-editor"
import baseMixins from '../../../../mixins/base.mixins'
import DefaultUtils from '../../../../utils/default.utils'

export default {
  mixins: [baseMixins],
  name: 'form-product',
  components: {
    VueEditor,
  },
  props: {
    ItemObj : Object
  },
  data() {
    let _model = {
        ExternelReference: null,
        Quantity: null,
        Description: null,
        Name: null,
        DepartId: null,
        UndMedida: null,
        Price: null,
        Active: null,
        Infos: {
          Key: null,
          Value: null,
          ProductId: null,
          Lista: []
        },
        Imgs: []
    }
    console.log(this.ItemObj)

    if(this.ItemObj != null){
      _model = {
        ExternelReference: this.ItemObj.ExternelReference,
        Quantity: this.ItemObj.Quantity,
        Description: this.ItemObj.Description,
        Name: this.ItemObj.Quantity,
        DepartId: this.ItemObj.DepartId,
        UndMedida: this.ItemObj.UndMedida,
        Price: this.ItemObj.Price,
        Active: this.ItemObj.Active,
        Marca: this.ItemObj.Marca,
        Infos: {
          Key: null,
          Value: null,
          ProductId: null,
          Lista: this.ItemObj.ProductAttributes
        },
        Imgs: this.ItemObj.ProductImags,
        RID : this.ItemObj.RID,
      }
    }

    return {
      tab_active: 1,
      activeLoading : false,
      Model: _model,
      unidadeMedida: [ 'UN', 'PC', 'JG', 'KG', 'FR', 'M', 'CM'],
      departaments: [],
    }
  },
  computed: {

  },
  async mounted() {
    await this.getDepartament()
  },
  methods: {
    openTab(tab_id) {
      this.tab_active = tab_id
    },
    async getDepartament(){
      this.departaments = await this.chamaApi('api/v1/Department/list')
    },
    imageChange(event) {

      let fileList = event.target.files
      this.Model.Imgs = []

      if (fileList.length > 0) {

        let file = fileList[0]
        let formData = new FormData()
        formData.append(file.name, file)

        this.Model.Imgs = formData
        //event.target.files = null
      }
    },
    changeAttr(i) {
      if (typeof i == "undefined") {
        this.Model.Infos.Lista.push({
          Key: this.Model.Infos.Key,
          Value: this.Model.Infos.Value
        });
        this.Model.Infos.Key = null
        this.Model.Infos.Value = null
      } else {
        this.Model.Infos.Lista = this.Model.Infos.Lista.filter((e, index) => {
          if (index != i)
            return true
          else
            return false
        });
      }
    },
    formatNumber(field) {
      switch (field) {
        case 'price':
          this.Model.Price = DefaultUtils.formatReal(this.Model.Price)
          break;
      }
    },
    async save(){
      this.activeLoading = true

      if(this.Model) {
        let _price = this.Model.Price == null ? "" : this.Model.Price.toString()

        let model =  {
          ExternalReference: this.Model.ExternalReference,
          Quantity: this.Model.Quantity,
          Description: this.Model.Description,
          Name: this.Model.Name,
          Department: this.Model.DepartId,
          UndMedida: this.Model.UndMedida,
          Price: Number(_price.replace(",",".")),
          Infos: this.Model.Infos.Lista,
          // Prices:  this.Model.Prices.Lista,
          Active : this.Model.Active,
        }
        
        // save data
        let resp = {}

        if(typeof this.Model.RID != "undefined"){
          model.RID = this.Model.RID
          resp = await this.chamaApi('api/v1/product/update', model)
        }else{
          resp = await this.chamaApi('api/v1/product/save', model)
        }

        // save imgs // this.Model.Imgs
        const resp1 = await this.chamaApi('api/v1/product/upload', this.Model.Imgs)
        
        //this.alert("Mensagem",resp.Mensagem,resp.Sucesso ? 'success':'danger')
      }
      this.activeLoading = false
      this.close()
    },
    close(){
      this.$emit("closeEvent", null)
    }
  }
}
