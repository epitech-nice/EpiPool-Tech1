<template>
  <div id="app">
    <SliderList />
  </div>
</template>

<script>
import SliderList from './components/Slider.vue';

export default {
  name: 'App',
  components: {
    SliderList
  }
};
</script>

<style>
body {
  background-color: #1B2631;
}
</style>
