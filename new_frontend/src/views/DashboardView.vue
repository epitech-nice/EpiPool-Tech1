<template>
    <SidebardNav />
    <div class="SideFlex">
        <TeamPoints />
        <TeamName />
    </div>
    <div class="HalfFlex">
        <StudentsTeam />
    </div>
</template>

<script>
import TeamPoints from '@/components/TeamPoints.vue'
import TeamName from '@/components/TeamName.vue'
import SidebardNav from '@/components/SidebardNav.vue'
import StudentsTeam from '@/components/StudentsTeam.vue';

export default {
    name: 'DashboardView',
    components: {
        TeamPoints,
        TeamName,
        SidebardNav,
        StudentsTeam
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

