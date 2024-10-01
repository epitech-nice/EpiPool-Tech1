<template>
    <SidebardNav />
    <div class="SideFlex">
        <TeamPoints :key="teamPointsKey" />
        <AddPoints @update="handleUpdate" />
        <RemovePoints @update="handleUpdate" />
        <TeamName :key="teamPointsKey" />
    </div>
    <div class="HalfFlex">
        <StudentsTeam :key="teamPointsKey" />
        <LogsAction :key="teamPointsKey" />
    </div>
    <div class="SideFlex">
        <UploadCSV :key="teamPointsKey" @update="handleUpdate" />
        <RandomizeTeam :key="teamPointsKey" @update="handleUpdate" />
        <RandomPlacement :key="teamPointsKey" />
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
import UploadCSV from '@/components/UploadCSV.vue';
import RandomizeTeam from '@/components/RandomizeTeam.vue';
import RandomPlacement from '@/components/RandomPlacement.vue';

export default {
    name: 'DashboardView',
    components: {
        TeamPoints,
        TeamName,
        SidebardNav,
        StudentsTeam,
        LogsAction,
        AddPoints,
        RemovePoints,
        UploadCSV,
        RandomizeTeam,
        RandomPlacement
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

