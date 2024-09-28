<template>
    <div v-if="this.selectedTeam">
        <div class="bluebg littleCard" @click="showAddForm = true">
            <i class="fa-solid fa-plus"></i>
        </div>
        
        <BlurForm v-if="showAddForm" :showForm="showAddForm" submitText="Add Points" @close="closeForm" @submit="submitPoints">
            <h1>Add Points to ?</h1>
            <div class="divForm">
                <select v-model="addTo" @change="onAddToChange">
                    <option value="team">Team</option>
                    <option value="student">Student</option>
                </select>
            </div>

            <div class="divForm" v-if="addTo === 'student'">
                <label for="student">Select student:</label>
                <select v-model="formData.student_id">
                    <option v-for="student in students" :key="student.student_id" :value="student.student_id">
                    {{ student.name }}
                    </option>
                </select>
            </div>
    
            <div class="divForm">
            <input type="number" v-model="formData.points" required placeholder="Points" />
            <input type="text" v-model="formData.reason" required placeholder="Reason" />
            </div>

        </BlurForm>
    </div>
    <div v-else class="Card loadingtext">
        <p>Please select a team ... </p>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import BlurForm from './BlurForm.vue';
import { useTeamStore } from '@/stores/teamStore';
import { useNotification } from '@/utils/NotificationService';
import { computed } from 'vue';

export default {
    name: 'AddPoints',
    components: {
        BlurForm,
    },
    setup() {
        const teamStore = useTeamStore();
        const selectedTeam = computed(() => teamStore.selectedTeam);
        
        return {
            selectedTeam,
        };
    },
    data() {
        return {
            showAddForm: false,
            addTo: 'team',
            formData: {
                student_id: null,
                points: 0,
                reason: '', 
            },
            students: [],
        };
    },
    watch: {
        selectedTeam: {
            immediate: true,
            handler(newTeamId) {
                this.fetchStudents(newTeamId);
            }
        }
    },
    methods: {
        closeForm() {
            this.showAddForm = false;
            this.formData = {
                student_id: null,
                points: 0,
                reason: '',
            };
        },
        async submitPoints() {
            try {
                const { show } = useNotification();
                if (this.addTo === 'student') {
                    const response = await axios.put('students/AddPoints', {
                        student_id: this.formData.student_id,
                        points: this.formData.points,
                        reason: this.formData.reason,
                    });
                    show(response.data.message, 'success');
                } else {
                    const response = await axios.put('teams/AddPoints', {
                        team_id: this.selectedTeam,
                        points: this.formData.points,
                        reason: this.formData.reason,
                    });
                    show(response.data.message, 'success');
                }
                this.$emit('update');
                this.closeForm();
            } catch (error) {
                show(response.data.error, 'error');
            }
        },
        onAddToChange() {
            this.formData.student_id = null;
            this.formData.reason = '';
        },
        async fetchStudents(teamId) {
            if (!teamId)
                return;
            const response = await axios.get(`students/ByTeam?team_id=${teamId}`)
            this.students = response.data
        },
        async update() {
            this.fetchStudents(this.selectedTeam);
        }
    },
};
</script>
