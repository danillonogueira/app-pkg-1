<template>
  <CasaDeCheck />
</template>

<script>
import CasaDeCheck from './components/CasaDeCheck'

export default {
  name: 'App',
  components: {
    CasaDeCheck
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    height: 100vh;
    width: 100vw;
    position: fixed;
  }

  .container {
    height: 100%;
    width: 100%;
  }
</style>
