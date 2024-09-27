<template>
    <div v-for="team in teams" :key="team.team_id" :class="['leftHover', { active: selectedTeam === team.team_id }]" @click="selectTeam(team.team_id)">
        <span class="round" style="background-image: url(../../public/pictures/ours.jpg)"></span>
        <span class="tooltip">{{ team.name }} - {{ team.points }} points</span>
    </div>
    <AddTeamForm :teams="teams" @update="update" />
    <RemoveTeamForm :teams="teams" @update="update"/>
</template>

<script>
import axios from '@/utils/axios';
import { useTeamStore } from '@/stores/teamStore';
import RemoveTeamForm from './RemoveTeam.vue';
import AddTeamForm from './AddTeam.vue';

export default {
    name: 'TeamBubble',
    components: {
        RemoveTeamForm,
        AddTeamForm
    },
    data() {
        return {
            teams: [],
            selectedTeam: null,
        };
    },
    setup() {
        const teamStore = useTeamStore();
        return {
            teamStore,
        };
    },
    methods: {
        getTeams() {
            axios.get('teams').then(response => {
                this.teams = response.data;
            }).catch(error => {
                console.log(error);
            });
        },
        selectTeam(teamId) {
            this.selectedTeam = teamId;
            this.teamStore.setSelectedTeam(teamId);
        },
        update() {
            this.getTeams();
            this.teamStore.setSelectedTeam(null);
        },
    },
    mounted() {
        this.getTeams();
    }
}
</script>

<style>

.round {
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    margin-right: 10px;
    margin-left: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: 0.3s;
    border-color: var(--primaryBg);
}

.round:hover {
    border-radius: 35%;
}

.AddBtn {
    background-color: var(--primaryBg);
    color: white;
    font-size: 30px;
    border-radius: 50%;
    transition: 0.3s;
    color: var(--success);
}

.AddBtn:hover {
    background-color: var(--success);
    color: white;
}

.leftHover {
    position: relative;
    transition: 0.3s;
}

.leftHover::before {
    content: '';
    position: absolute;
    left: -5px;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 50%;
    background-color: white;
    border-radius: 0 25px 25px 0;
    transition: width 0.3s ease, background-color 0.3s ease, left 0.3s ease, height 0.3s ease;
}

.leftHover:hover::before {
    width: 5px;
    background-color: white;
    left: 0;
}

.leftHover.active::before {
    width: 5px;
    background-color: white;
    left: 0;
    height: 80%;
}

.tooltip {
    position: fixed;
    left: 0;
    white-space: nowrap;
    background-color: var(--primaryBg);
    color: white;
    font-size: 20px;
    padding: 5px 10px;
    border-radius: 5px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.leftHover:hover .tooltip {
    opacity: 1;
    visibility: visible;
    left: 70px;
}

.leftHover {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;
}

</style>
