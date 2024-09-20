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
import { watch } from 'vue'
import { useTeamStore } from './store/teamStore';

export default {
  name: 'App',
  components: {
    EpitechTitle,
    SidebardNav
  },
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

    const teamStore = useTeamStore();
    console.log('Selected Team:', teamStore.getSelectedTeam);
  }
}
</script>

<style>

.spaceLeft {
  margin-left: 75px;
}

</style>
