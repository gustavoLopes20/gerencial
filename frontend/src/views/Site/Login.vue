<template>
  <div class="container-login">
    <SiteHeader/>
    <Login/>
    <!-- <FooterSite/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import SiteHeader from '@/components/Helpers/SiteHeader/index.vue'
import Login from '@/components/Account/Login/index.vue'
// import FooterSite from '@/components/Site/FooterSite/index.vue'

export default {
  name: 'site',
  components: {
    SiteHeader,
    Login,
    // FooterSite
  }
}
</script>

<style lang="scss" scoped>

.container-login{
  // display: table;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
