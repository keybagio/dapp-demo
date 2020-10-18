<template>
  <div>
    <ul>
      <li><router-link :to="{ name: 'ETH' }">ETH DApp</router-link></li>
      <li><router-link :to="{ name: 'EOS' }">EOS DApp</router-link></li>
    </ul>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'Home',
  mounted: () => {
  }
}
</script>

<style>
</style>
