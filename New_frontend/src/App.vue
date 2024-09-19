<template>
  <div id="app">
    <EpitechTitle />
    <router-view />
  </div>
</template>

<script>
import EpitechTitle from './components/admin/EpitechTitle.vue'

export default {
  name: 'App',
  components: {
    EpitechTitle
  }
}

</script>
