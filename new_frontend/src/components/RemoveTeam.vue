<template>
    <div>
        <span class="round AddBtn" @click="toggleForm"><i class="fa-solid fa-minus"></i></span>
        <BlurForm :showForm="showForm" @close="toggleForm" @submit="removeTeam" submitText="Supprimer">
            <h1>Remove a team</h1>
            <select v-model="selectedTeamId">
                <option v-for="team in teams" :value="team.team_id" :key="team.team_id">{{ team.name }} - {{ team.points }} points ({{ team.color }})</option>
            </select>
        </BlurForm>
    </div>
</template>

<script>
import BlurForm from './BlurForm.vue';
import axios from '@/utils/axios';

export default {
    name: 'RemoveTeamForm',
    components: {
        BlurForm
    },
    props: {
        teams: Array
    },
    data() {
        return {
            showForm: false,
            selectedTeamId: null
        };
    },
    methods: {
        toggleForm() {
            this.showForm = !this.showForm;
        },
        async removeTeam() {
            await axios.delete(`teams/Delete?id=${this.selectedTeamId}`)
            .catch(error => {
                console.log(error);
            });
            this.selectedTeamId = null;
            this.showForm = false;
            this.$emit('update');
        }
    }
}
</script>

<style scoped>
</style>
