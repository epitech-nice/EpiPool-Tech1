<template>
    <SidebardNav />
    <div class="SideFlex">
        <TeamPoints />
        <TeamName />
    </div>
</template>

<script>
import TeamPoints from '@/components/TeamPoints.vue';
import TeamName from '@/components/TeamName.vue';
import SidebardNav from '@/components/SidebardNav.vue'

export default {
    name: 'DashboardView',
    components: {
        TeamPoints,
        TeamName,
        SidebardNav
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

</style>

