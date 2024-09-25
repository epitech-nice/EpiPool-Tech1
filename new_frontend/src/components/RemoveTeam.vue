<template>
    <div>
        <span class="round AddBtn" @click="toggleForm"><i class="fa-solid fa-minus"></i></span>
        <form v-if="showForm" @submit.prevent="removeTeam">
            <select v-model="selectedTeamId">
                <option v-for="team in teams" :value="team.team_id" :key="team.team_id">{{ team.name }}</option>
            </select>
            <button type="submit">Supprimer</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'RemoveTeamForm',
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
        removeTeam() {
            this.$emit('team-removed', this.selectedTeamId);
            this.selectedTeamId = null;
            this.showForm = false;
        }
    }
}
</script>

<style scoped>
</style>
