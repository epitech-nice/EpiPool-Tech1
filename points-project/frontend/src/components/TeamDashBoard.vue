<template>
    <div class="dashboard-container">
        <div class="header">
            <TeamPoints ref="teamPoints" :team="team" />
            <div v-if="team" class="team-points team-name">
                <h3>{{ team.name }} ( {{ team.color }} )</h3>
            </div>
            <div v-else>
                <p>Please select a team from the slider.</p>
            </div>
        </div>
        <div class="header mt10">
            <LogsHistory v-if="team" :team="team" style="width: calc(100% / 3);" />
            <AdjustPoints v-if="team" :team="team" @points-updated="refreshPoints" />
            <StudentScoreboard v-if="team" :team="team" style="width: calc(100% / 3);" />
        </div>
        <CSV />
    </div>
</template>

<script>
import TeamPoints from './TeamPoints.vue';
import AdjustPoints from './AdjustPoints.vue';
import LogsHistory from './LogsHistory.vue';
import StudentScoreboard from './StudentScoreboard.vue';
import CSV from './CSV.vue';

export default {
    name: 'TeamDashboard',
    components: {
        TeamPoints,
        AdjustPoints,
        LogsHistory,
        StudentScoreboard,
        CSV
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
        refreshPoints() {
            if (this.$refs.teamPoints) {
                this.$refs.teamPoints.fetchPoints(this.team.team_id);
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
.header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
}
.team-name {
    width: 70%;
    display: flex;
    justify-content: center;
}
.mt10 {
    margin-top: 10px;
}

</style>
