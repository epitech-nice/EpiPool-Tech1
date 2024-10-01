<template>
    <div class="image-container">
        <img src="/pictures/bg.png" alt="Background image">
    </div>
    <div class="padd">
        <div class="ImgTeams">
            <div class="cardTeam" v-for="team in teams" :key="team.name">
                <h1>{{ team.name }}</h1>
                <span style="margin-bottom: 20px;">{{ team.points }} points</span>
                <img :src="getTeamImage(team.name)" :alt="team.name">

                <div class="champions-container">
                    <div class="champion" v-for="champion in getChampionsForTeam(team.team_id)" :key="champion.student_id">
                        <span>{{ champion.name }} - {{ champion.points }} points</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios';

export default {
    name: 'VisualizeView',
    data() {
        return {
            teams: [],
            champions: [],
            previousTeams: [],
        };
    },
    methods: {
        async fetchChampions() {
            const response = await axios.get('students/getChampionByTeam');
            this.champions = response.data;
        },
        async fetchTeams() {
            const response = await axios.get('/teamPoints');
            const newTeams = response.data;
            
            if (this.previousTeams.length > 0) {
                const pointsChanged = this.havePointsChanged(newTeams, this.previousTeams);
                if (pointsChanged) {
                    this.triggerAnimation();
                }
            }

            this.previousTeams = JSON.parse(JSON.stringify(this.teams));
            this.teams = newTeams;
        },

        getChampionsForTeam(teamId) {
            return this.champions.filter(champion => champion.team_id === teamId);
        },
        havePointsChanged(newTeams, previousTeams) {
            return newTeams.some((newTeam, index) => newTeam.points !== previousTeams[index]?.points);
        },
        getTeamImage(teamName) {
            const images = {
                "DevOps Bards": "/pictures/devops_bard_frame.png",
                "Kernel Barbarians": "/pictures/kernel_barbare_frame.png",
                "Game Alchemists": "/pictures/game_alchemist_frame.png",
                "Bugs Hunters": "/pictures/bug_hunter_frame.png"
            };
            return images[teamName] || "/pictures/default_team_frame.png";
        },
        
        triggerAnimation() {
            const container = document.querySelector('.ImgTeams');
            container.classList.add('animate-points');

            setTimeout(() => {
                container.classList.remove('animate-points');
            }, 1000);
        },
    },
    mounted() {
        this.fetchTeams();
        this.fetchChampions();

        this.interval = setInterval(() => {
            this.fetchTeams();
            this.fetchChampions();
        }, 6000);
    },
    beforeUnmount() {
        clearInterval(this.interval);
    }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Uncial+Antiqua&display=swap');

.image-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
}

.image-container img {
    filter: blur(0px);
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.ImgTeams {
    position: relative;
    bottom: 0;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}

.padd {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.cardTeam {
    position: relative;
    padding: 20px;
    border-radius: 20px;
    width: 575px;
    height: fit-content;
    overflow: hidden;
    background: rgba(0, 8, 43, 0.6);
    border: 3px solid rgba(255, 215, 0, 0.6);
    box-shadow: 0px 0px 15px rgba(255, 215, 0, 0.4);
    transition: transform 0.3s ease-in-out;
}

.cardTeam::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 8, 43, 0.4);
    z-index: 1;
    border-radius: 15px;
}

.cardTeam img {
    position: absolute;
    z-index: 2;
    height: 205px;
    right: 0;
    bottom: -30px;
}

.cardTeam h1 {
    color: #ffd700;
    z-index: 5;
    position: relative;
    text-align: center;
    margin-top: 10px;
    font-family: 'Uncial Antiqua', cursive;
    font-size: 2.5em;
    text-shadow: 0px 0px 8px rgba(255, 215, 0, 0.7);
}

.cardTeam span {
    color: white;
    z-index: 5;
    position: relative;
    text-align: center;
    font-size: 1.5em;
    margin-top: 10px;
    display: inline-block;
    padding: 5px 15px;
    background: rgba(0, 0, 0, 0.5);
    border: 2px solid rgba(255, 215, 0, 0.8);
    border-radius: 10px;
    font-family: 'Uncial Antiqua', cursive;
    animation: glow 1.5s infinite alternate ease-in-out;
}

@keyframes glow {
    from {
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5);
    }
    to {
        box-shadow: 0 0 20px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 215, 0, 0.7);
    }
}

.cardTeam p {
    color: white;
    z-index: 5;
    position: relative;
    margin-top: 10px;
    text-align: center;
    font-family: 'Uncial Antiqua', cursive;
}

@keyframes highlight {
    0% {
        transform: scale(1);
        background-color: rgba(255, 215, 0, 0.3);
    }
    50% {
        transform: scale(1.05);
        background-color: rgba(255, 215, 0, 0.6);
    }
    100% {
        transform: scale(1);
        background-color: rgba(255, 215, 0, 0.3);
    }
}

.ImgTeams.animate-points {
    animation: highlight 1s ease-in-out;
}

.champion span {
    font-family: 'Times New Roman', Times, serif;
}

</style>
