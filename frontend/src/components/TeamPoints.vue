<template>
    <div class="team-points w30">
        <h3 v-if="points !== null">{{ points[0].points }} points</h3>
        <h3 v-else>Loading...</h3>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'TeamPoints',
    props: {
        team: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            points: null
        };
    },
    watch: {
        team: {
            immediate: true,
            handler(newTeam) {
            if (newTeam) {
                this.fetchPoints(newTeam.team_id);
            }
            }
        }
    },
    methods: {
        async fetchPoints(team_id) {
            try {
                const response = await axios.get('http://localhost:3000/api/points/points_by_team', {
                    params: { team_id: team_id }
                });
                this.points = response.data.points;
            } catch (error) {
                console.error('Error fetching points:', error);
            }
        }
    }
};
</script>

<style>
.team-points {
    background-color: #2b2b38;
    border-radius: 10px;
    padding: 20px;
    color: white;
    text-align: center;
    align-content: center;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;
    justify-content: center;
}

.w30 {
    text-align: center;
    width: 30%;
}
</style>
