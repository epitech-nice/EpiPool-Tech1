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
import BlurForm from '@/components/BlurForm.vue';
import axios from '@/utils/axios';
import { useNotification } from '@/utils/NotificationService';

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
            const { show } = useNotification();
            try {
                await axios.delete(`teams/Delete?id=${this.selectedTeamId}`)
                this.selectedTeamId = null;
                this.showForm = false;
                this.$emit('update');
                show('Team successfully deleted', 'success')
            } catch(error) {
                show('An Error occured.', 'error')
            }
        }
    }
}
</script>

<style scoped>

select {
    padding: 15px;
    background-color: var(--secondaryBg);
    border: none;
    cursor: pointer;
    margin-bottom: 15px;
    color: white;
    font-weight: bold;
    font-size: 16px;
    border-radius: 5px;
}

select option {
    background-color: var(--secondaryBg);
    color: white;
    font-size: 16px;
    padding: 10px;
}

select:focus {
    outline: none;
}

</style>
