<template>
  <div id="app">
    <div :class="{'spaceLeft': showSidebarAndTitle}">
      <router-view />
    </div>
    <Notification ref="notification" />
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { useTeamStore } from './stores/teamStore';
import Notification from './components/NotifComp.vue';
import { useNotification } from './utils/NotificationService';

export default {
  name: 'App',
  components: {
    Notification
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
      this.showSidebarAndTitle = route.name === 'dashboard'
    }
  },
  mounted() {
    const route = useRoute()
    this.updateSidebarAndTitle(route)

    watch(route, (newRoute) => {
      this.updateSidebarAndTitle(newRoute)
    })
    const { setNotificationComponent } = useNotification();
    setNotificationComponent(this.$refs.notification);
  }
}
</script>

<style>

.spaceLeft {
  margin-left: 75px;
}

</style>
