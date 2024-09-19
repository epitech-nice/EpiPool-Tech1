<template>
  <div id="app" class="flex_w_gap">
    <SliderList @teamSelected="setSelectedTeam" />
    <TeamDashBoard :team="selectedTeam" />
  </div>
</template>

<script>
import SliderList from './components/Slider.vue';
import TeamDashBoard from './components/TeamDashBoard.vue';

export default {
  name: 'App',
  components: {
    SliderList,
    TeamDashBoard
  },
  data() {
    return {
      selectedTeam: null
    };
  },
  methods: {
    setSelectedTeam(team) {
      this.selectedTeam = team;
    }
  }
};
</script>

<style>
body {
  background-color: #292930;
}
.flex_w_gap {
  display: flex;
  gap: 10px;
}
</style>
