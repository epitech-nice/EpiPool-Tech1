<template>
    <div class="dashboard-container">
        <div class="header">
            <TeamPoints :team="team" :points="currentPoints" />
            <div v-if="team" class="team-points team-name">
                <h2>{{ team.name }} ( {{ team.color }} )</h2>
            </div>
            <div v-else>
                <p>Please select a team from the slider.</p>
            </div>
        </div>
        <div class="header mt10">
            <div v-if="team">
                <AddPoints :team="team" @points-added="updatePoints" />
            </div>
            <div v-if="team">
                <DeletePoints :team="team" @points-added="updatePoints" />
            </div>
        </div>
    </div>
</template>

<script>
import TeamPoints from './TeamPoints.vue';
import AddPoints from './AddPoints.vue';
import DeletePoints from './DeletePoints.vue';

export default {
    name: 'TeamDashboard',
    components: {
        TeamPoints,
        AddPoints,
        DeletePoints
    },
    props: {
        team: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            currentPoints: this.team ? this.team.points : 0
        };
    },
    methods: {
        updatePoints(newPoints) {
            this.currentPoints = newPoints;
        }
    },
    watch: {
        team(newTeam) {
            if (newTeam) {
                this.currentPoints = newTeam.points;
            }
        }
    }
};
</script>

<style>
.dashboard-container {
    width: 100%;
    height: fit-content;
    border: 1px solid #3a3b4b;
    background-color: #3a3b4b;
    border-radius: 10px;
    padding: 20px;
    color: white;
}
h2 {
    text-align: center;
    margin-top: 0;
    font-size: 2em;
    padding: 10px;
    margin: 0;
    background: linear-gradient(to left, #6a11cb, #2575fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
}
.team-name {
    width: 70%;
    display: flex;
    justify-content: center;
}
.mt10 {
    margin-top: 15px;
}
</style>
