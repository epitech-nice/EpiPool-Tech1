<template>
    <div class="miniCard blue" @click="showChangeTeamForm = true">
        <i class="fa-solid fa-people-arrows"></i>
    </div>
    <BlurForm
        v-if="showChangeTeamForm"
        :showForm="showChangeTeamForm"
        submitText="Change Team"
        @close="closeForm"
        @submit="changeTeam"
        >
        <h1>Change team for {{ student.name }}</h1>
        <div class="divForm">
            <label for="team">Select a new team:</label>
            <select v-model="selectedTeamId" required>
                <option v-for="team in teams" :key="team.team_id" :value="team.team_id">
                    {{ team.name }} - {{ team.points }} points ({{ team.color }})
                </option>
            </select>
        </div>
    </BlurForm>
</template>

<script>
import axios from '@/utils/axios';
import BlurForm from '@/components/BlurForm.vue';

export default {
    name: 'ChangeTeamStudent',
    components: {
        BlurForm
    },
    props: {
        student: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showChangeTeamForm: false,
            teams: [],
            selectedTeamId: null
        };
    },
    emits: ['update'],
    methods: {
        closeForm() {
            this.showChangeTeamForm = false;
        },
        async fetchTeams() {
            try {
                const response = await axios.get('teams');
                this.teams = response.data;
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        },
        async changeTeam() {
            try {
                const payload = {
                    student_id: this.student.student_id,
                    team_id: this.selectedTeamId
                };
                await axios.put('students/changeTeam', payload);
                this.$emit('update');
                this.closeForm();
            } catch (error) {
                console.error('Error changing team:', error);
            }
        }
    },
    mounted() {
        this.fetchTeams();
    }
};
</script>
