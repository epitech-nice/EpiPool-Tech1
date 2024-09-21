<template>
    <div class="Card Title">
        <p v-if="teamName !== null">{{ teamName }}</p>
        <p v-else>Please select a team ...</p>
    </div>
</template>

<script>
import axios from 'axios';
import { useTeamStore } from '@/store/teamStore';
import { computed } from 'vue';
import { getToken } from '@/utils/token';

export default {
    name: 'teamName',
    setup() {
        const teamStore = useTeamStore();
        const selectedTeam = computed(() => teamStore.selectedTeam);
        
        return {
            selectedTeam
        };
    },
    data() {
        return {
            teamName: null
        }
    },
    watch: {
        selectedTeam: {
            immediate: true,
            handler(newTeamId) {
                this.fetchteamName(newTeamId);
            }
        }
    },
    methods: {
        fetchteamName(teamId) {
            if (!teamId) return;
            
            const token = getToken();
            axios.get(`http://localhost:3000/api/teams/GetPointsByTeam?id=${teamId}`, {
                headers: {
                    'x-auth-token': `${token}`
                }
            })
            .then(response => {
                this.teamName = response.data.name;
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des points:', error);
            });
        }
    }
}
</script>
