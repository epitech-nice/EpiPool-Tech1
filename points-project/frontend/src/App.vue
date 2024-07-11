<template>
  <div id="app">
    <ButtonList />
  </div>
</template>

<script>
import ButtonList from './components/ButtonList.vue';

export default {
  name: 'App',
  components: {
    ButtonList
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
