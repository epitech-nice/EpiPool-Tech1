<template>
    <SpiderSvg />
    <div class="leftBotCorner">
        <FireSvg />
    </div>
    <div class="bottomContainer">
        <div v-for="team in teams" :key="team.team_id" class="container">
            <h1>{{ team.name }}</h1>
            <p>{{ team.team_id }}</p>
            <p>{{ team.points }}</p>
        </div>
    </div>
    <div class="rightBotCorner">
        <FireSvg />
    </div>
</template>

<script>
import axios from '@/utils/axios';
import FireSvg from '@/components/studentsView/FireSvg.vue';
import SpiderSvg from '@/components/studentsView/SpiderSvg.vue';
// import LiquidSvg from '@/components/studentsView/LiquidSvg.vue';

export default {
    components: {
        FireSvg,
        SpiderSvg,
    },
    data() {
        return {
            teams: [],
        };
    },
    methods: {
        getTeams() {
            axios.get('teams').then((response) => {
                this.teams = response.data;
            });
        },
    },
    mounted() {
        this.getTeams();
    },
};
</script>

<style scoped>
.leftBotCorner {
    position: absolute;
    bottom: 0;
    left: 0;
}

.rightBotCorner {
    position: absolute;
    bottom: 0;
    right: 0;
}

.container {
    border: 1px solid white;
    width: calc(100% / 6);
    height: 100%;
}

.bottomContainer {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 50px;
}
</style>
