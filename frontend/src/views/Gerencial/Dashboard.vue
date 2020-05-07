<template>
  <div class="container-dashboard">
     <PainelInfo/>
     <Grafico/>
  </div>
</template>

<script>
import PainelInfo from '@/components/Gerencial/PainelInfo/index.vue'
import Grafico from '@/components/Gerencial/Grafico/index.vue'

export default {
  name: 'dashboard',
  components: {
    PainelInfo,
    Grafico
  }
}
</script>

<style lang="scss">

.container-dashboard{
  display: flex;
  flex-direction: column;
}

</style>
