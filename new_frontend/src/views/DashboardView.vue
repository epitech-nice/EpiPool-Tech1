<template>
    <div class="SideFlex">
        <TeamPoints />
        <TeamName />
    </div>
</template>

<script>
import TeamPoints from '@/components/TeamPoints.vue';
import TeamName from '@/components/TeamName.vue';

export default {
    name: 'DashboardView',
    components: {
        TeamPoints,
        TeamName
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

