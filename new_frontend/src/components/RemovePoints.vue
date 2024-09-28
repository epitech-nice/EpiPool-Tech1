<template>
    <div v-if="this.selectedTeam">
        <div class="littleCard errorbg" @click="showRemoveForm = true">
            <i class="fa-solid fa-minus"></i>
        </div>
        
        <BlurForm v-if="showRemoveForm" :showForm="showRemoveForm" submitText="Remove Points" @close="closeForm" @submit="submitPoints">
            <h1>Remove Points from ?</h1>
            <div class="divForm">
                <select v-model="removeFrom" @change="onRemoveFromChange">
                    <option value="team">Team</option>
                    <option value="student">Student</option>
                </select>
            </div>

            <div class="divForm" v-if="removeFrom === 'student'">
                <label for="student">Select student:</label>
                <select v-model="formData.student_id">
                    <option v-for="student in students" :key="student.student_id" :value="student.student_id">
                    {{ student.name }}
                    </option>
                </select>
            </div>
    
            <div class="divForm">
                <input type="number" v-model="formData.points" required placeholder="Points to remove" />
                <input type="text" v-model="formData.reason" required placeholder="Reason" />
            </div>

        </BlurForm>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import BlurForm from './BlurForm.vue';
import { useTeamStore } from '@/stores/teamStore';
import { useNotification } from '@/utils/NotificationService';
import { computed } from 'vue';

export default {
    name: 'RemovePoints',
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
            showRemoveForm: false,
            removeFrom: 'team',
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
            this.showRemoveForm = false;
            this.formData = {
                student_id: null,
                points: 0,
                reason: '',
            };
        },
        async submitPoints() {
            const { show } = useNotification();
            try {
                if (this.removeFrom === 'student') {
                    const response = await axios.put('students/RemovePoints', {
                        student_id: this.formData.student_id,
                        points: this.formData.points,
                        reason: this.formData.reason,
                    });
                    show(response.data.message, 'success');
                } else {
                    const response = await axios.put('teams/RemovePoints', {
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
        onRemoveFromChange() {
            this.formData.student_id = null;
            this.formData.reason = '';
        },
        async fetchStudents(teamId) {
            if (!teamId)
                return;
            const response = await axios.get(`students/ByTeam?team_id=${teamId}`);
            this.students = response.data;
        },
        async update() {
            this.fetchStudents(this.selectedTeam);
        }
    },
};
</script>
