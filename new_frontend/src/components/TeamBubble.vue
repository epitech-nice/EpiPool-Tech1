<template>
    <div v-for="team in teams" :key="team.id" :class="['leftHover', { active: selectedTeam === team.id }]" @click="selectTeam(team.id)">
        <span class="round" :style="{ backgroundColor: team.color }"></span>
    </div>
    <div>
        <span class="round AddBtn"><i class="fa-solid fa-plus"></i></span>
    </div>
    <div>
        <span class="round AddBtn"><i class="fa-solid fa-minus"></i></span>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'TeamBubble',
    data() {
        return {
            teams: [
                {id: 2, name: 'Team 2', color: 'red'},
                {id: 1, name: 'Team 1', color: 'blue'},
            ],
            selectedTeam: null,
        };
    },
    methods: {
        getTeams() {
            axios.get('http://localhost:3000/api/teams')
            .then(response => {
                this.teams = response.data;
            })
            .catch(error => {
                console.log(error);
            });
        },
        selectTeam(teamId) {
            this.selectedTeam = teamId;
        }
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

</style>
