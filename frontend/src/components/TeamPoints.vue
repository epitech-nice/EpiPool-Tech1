<template>
    <div class="Card fit Title successbg">
        <p v-if="teamPoints !== null">{{ teamPoints }} points</p>
        <p v-else class="loadingtext">Please select a team ...</p>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import { useTeamStore } from '@/stores/teamStore';
import { computed } from 'vue';

export default {
    name: 'TeamPoints',
    setup() {
        const teamStore = useTeamStore();
        const selectedTeam = computed(() => teamStore.selectedTeam);
        
        return {
            selectedTeam
        };
    },
    data() {
        return {
            teamPoints: null
        }
    },
    watch: {
        selectedTeam: {
            immediate: true,
            handler(newTeamId) {
                this.fetchTeamPoints(newTeamId);
            }
        }
    },
    methods: {
        fetchTeamPoints(teamId) {
            if (!teamId)
                return;

            axios.get(`teams/GetPointsByTeam?id=${teamId}`).then(response => {
                this.teamPoints = response.data.points;
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des points:', error);
            });
        }
    }
}
</script>
