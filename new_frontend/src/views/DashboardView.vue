<template>
    <SidebardNav />
    <div class="SideFlex">
        <TeamPoints :key="teamPointsKey" />
        <TeamName :key="teamPointsKey" />
    </div>
    <div class="HalfFlex">
        <StudentsTeam :key="teamPointsKey" />
        <LogsAction :key="teamPointsKey" />
    </div>
    <div class="HalfFlex">
        <AddPoints @update="handleUpdate" />
        <RemovePoints @update="handleUpdate" />
    </div>
</template>

<script>
import TeamPoints from '@/components/TeamPoints.vue'
import TeamName from '@/components/TeamName.vue'
import SidebardNav from '@/components/SidebardNav.vue'
import StudentsTeam from '@/components/StudentsTeam.vue';
import LogsAction from '@/components/LogsAction.vue';
import AddPoints from '@/components/AddPoints.vue';
import RemovePoints from '@/components/RemovePoints.vue';

export default {
    name: 'DashboardView',
    components: {
        TeamPoints,
        TeamName,
        SidebardNav,
        StudentsTeam,
        LogsAction,
        AddPoints,
        RemovePoints
    },
    data() {
        return {
            teamPointsKey: 0
        };
    },
    methods: {
        handleUpdate() {
            this.teamPointsKey++;
        }
    }
}
</script>

<style scoped>

.SideFlex {
    display: flex;
    justify-content: space-around;
    gap: 10px;
    padding-top: 10px;
    padding-right: 10px;
}

.HalfFlex {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    padding-top: 10px;
    padding-right: 10px;
}

</style>

