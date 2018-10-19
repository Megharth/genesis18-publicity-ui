<template>
  <div id="app">
    <navbarComponent></navbarComponent>
    <router-view/>
  </div>
</template>


<script>
import navbarComponent from './components/navbarComponent'

export default {
  components: {
    navbarComponent
  }
}
</script>
<style lang="sass">
@import './sass/variables'
@font-face
  font-family: 'Neptune'
  src: url('./assets/Neptune_Trial.otf') format('opentype')
body
  background: $primaryColor
  font-family: $primaryFont

::-webkit-scrollbar
  display: none
.heading
  text-align: center
  font-size: 45px
  color: #FFFFFF
  font-weight: bold
  text-transform: uppercase
  font-family: $headingFont
</style>
