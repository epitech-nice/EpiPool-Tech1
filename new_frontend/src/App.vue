<template>
  <div id="app">
    <div :class="{'spaceLeft': showSidebarAndTitle}">
      <router-view />
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { useTeamStore } from './stores/teamStore';

export default {
  name: 'App',
  setup() {
    const teamStore = useTeamStore();
    return {
      selectedTeam: teamStore.getSelectedTeam,
    };
  },
  data() {
    return {
      showSidebarAndTitle: false
    }
  },
  methods: {
    updateSidebarAndTitle(route) {
      this.showSidebarAndTitle = route.name !== 'login'
    }
  },
  mounted() {
    const route = useRoute()
    this.updateSidebarAndTitle(route)

    watch(route, (newRoute) => {
      this.updateSidebarAndTitle(newRoute)
    })
  }
}
</script>

<style>

.spaceLeft {
  margin-left: 75px;
}

</style>
