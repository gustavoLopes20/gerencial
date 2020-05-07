<template>
  <div class="container-gerencial">
    <HeaderGerenc/>
    <router-view class="routes"/>
    <FooterGerenc class="footer-gerenc"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderGerenc from '@/components/Gerencial/HeaderGerenc/index.vue'
import FooterGerenc from '@/components/Gerencial/FooterGerenc/index.vue'

export default {
  name: 'gerencial',
  components: {
    HeaderGerenc,
    FooterGerenc
  }
}
</script>

<style lang="scss" scoped>

.container-gerencial{
  width: 100%;
  display: flex;
  flex-direction: column;
  .routes{
    position: relative;
    top: 45px;
    flex: 1;
    margin-bottom: 50px;
    margin-left: 37px;
    margin-right: 37px;
    margin-top:20px;
    @media(max-width:800px){
     margin-left: 10px;
      margin-right: 10px;
    }
  }
  .footer-gerenc{
    @media print {
      display: none;
    }
  }
}
</style>
