<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

@import 'design/index.scss';
// @import 'design/styles.scss';

@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

*{
    margin:0; 
    padding:0;
    box-sizing: border-box;
}

@font-face {
  font-family: 'Berlin Sans FB Local';
  src:  url('design/fonts/BerlinSansFBBold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
}
body{
  height: 100%;
  // background-color: $color-fundo;
  background-color: $color-fundo;//#f1f1f1
}

#app {
  min-width: 320px;
  font-family: "Open Sans","HelveticaNeue-Light","Helvetica Neue Light","Helvetica Neue",Helvetica,Arial,"Lucida Grande",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:#4c4d5a;
}

.VueCarousel-pagination{
    background-color: #fff;
    //background-color: #d0d0d0;
    height: 30px;
    margin-top: 0 !important;
    .VueCarousel-dot-container{
      margin-top: 0 !important;
      button{
          margin-top: 0 !important;
      }
    }
}
.VueCarousel-navigation{
  button{
    color:$color-primary !important;
  }
}

.slider-tooltip-wrap{
  visibility: hidden !important;
}
.my-gallery{
  figure{
    a{
      img{
        width: 211px;
        height: 131px;
      }
    }
  }
}
</style>
