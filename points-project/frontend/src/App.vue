<template>
  <div>
    <div v-for="team in teams" :key="team.id">
      <p>{{ team.name }}</p>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'TeamList',
  data() {
    return {
      teams: []
    };
  },
  created() {
    this.fetchTeams();
  },
  methods: {
    async fetchTeams() {
      try {
        const response = await axios.get('http://localhost:3000/api/starter_teams');
        const data = response.data;
        this.teams = data;
      } catch (error) {
        console.error('There was an error fetching the teams!', error);
      }
    }
  }
};
</script>

<style scoped>
p {
  margin: 5px;
  padding: 10px;
  font-size: 16px;
  background-color: #f0f0f0;
  border-radius: 5px;
}
</style>

