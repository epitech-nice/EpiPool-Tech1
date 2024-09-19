<template>
  <SidebardNav v-if="showSidebarAndTitle" />
  <div id="app">
    <div :class="{'spaceLeft': showSidebarAndTitle}">
      <EpitechTitle v-if="showSidebarAndTitle" />
      <router-view />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import EpitechTitle from './components/EpitechTitle.vue'
import SidebardNav from './components/SidebardNav.vue'

export default {
  name: 'App',
  components: {
    EpitechTitle,
    SidebardNav
  },
  data() {
    return {
      showSidebarAndTitle: false
    }
  },
  methods: {
    getPosition() {
      const route = useRoute()
      this.showSidebarAndTitle = route.name !== 'login'
    }
  }
}
</script>

<style>

.spaceLeft {
  margin-left: 75px;
}

</style>
