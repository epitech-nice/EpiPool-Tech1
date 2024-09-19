<template>
    <div class="team-points flex-column" style="width: calc(33.3333%);">
        <span class="title-underscore">Students</span>
        <div class="log">
            <div class="student-orders" v-for="student in students" :key="student.log_id">
                {{ student.name }} - {{ student.email }} ({{ student.points }} points)
                <div class="icons-end">
                    <button @click="openChangeTeamForm(student)" class="icon-button change">
                        <svg-icon type="mdi" :path="changeTeam"></svg-icon>
                    </button>
                    <button @click="removeStudent(student.student_id)" class="icon-button cancel">
                        <svg-icon type="mdi" :path="cancel"></svg-icon>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showForm" class="blurbackground"></div>
    <div v-if="showForm" class="popup">
        <button class="close-button" @click="showForm = false">&#10005;</button>
        <form @submit.prevent="submitChange" class="form-flex">
            <label for="teams">Teams</label>
            <select v-model="selectedTeamId" required>
                <option v-for="team in teams" :key="team.team_id" :value="team.team_id">
                    {{ team.name }} - {{ team.color }}
                </option>
            </select>
            <button type="submit">Change Team</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiCancel } from '@mdi/js';
import { mdiSwapHorizontal } from '@mdi/js';

export default {
    name: 'StudentScoreboard',
    components: {
        SvgIcon,
    },
    props: {
        team: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            students: [],
            teams: [],
            cancel: mdiCancel,
            changeTeam: mdiSwapHorizontal,
            showForm: false,
            selectedStudent: null,
            selectedTeamId: null,
        };
    },
    watch: {
        'team.team_id': {
            immediate: true,
            handler() {
                this.fetchStudents();
                this.fetchTeams();
            }
        }
    },
    methods: {
        async fetchStudents() {
            if (this.team && this.team.team_id) {
                try {
                    const response = await axios.get('http://localhost:3000/api/students/students_by_team', {
                        params: { team_id: this.team.team_id }
                    });
                    this.students = response.data;
                } catch (error) {
                    console.error('Error fetching students:', error);
                }
            }
        },
        async fetchTeams() {
            try {
                const response = await axios.get('http://localhost:3000/api/teams/starter_teams');
                this.teams = response.data;
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        },
        removeStudent(studentId) {
            if (confirm("Are you sure you want to delete this student?")) {
                axios.delete(`http://localhost:3000/api/students/delete_student`, {
                    data: { student_id: studentId }
                })
                .then(response => {
                    this.fetchStudents();
                    if (response.data.affectedRows > 0) {
                        console.log('Student deleted successfully!');
                    }
                })
                .catch(error => {
                    console.error('Error deleting student:', error);
                });
            }
        },
        openChangeTeamForm(student) {
            this.selectedStudent = student;
            this.showForm = true;
        },
        async submitChange() {
            if (this.selectedTeamId && this.selectedStudent) {
                try {
                    console.log('Student id and team id:', this.selectedStudent.student_id, this.selectedTeamId);
                    await axios.put('http://localhost:3000/api/students/changeTeam', {
                        student_id: this.selectedStudent.student_id,
                        team_id: this.selectedTeamId
                    });
                    this.fetchStudents();
                    this.showForm = false;
                    alert('Student team changed successfully!');
                } catch (error) {
                    console.error('Error changing student team:', error);
                    alert('Error changing student team.');
                }
            }
        }
    }
};
</script>

<style>

.student-orders {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #4d4d60;
    padding: 5px 5px;
    border-radius: 5px;
}

.icon-button {
    background-color: transparent;
    padding: 0px;
    margin: 0px;
    display: flex;
    align-items: center;
}

.cancel {
    color: red;
}
.change {
    color: yellow;
}

.icons-end {
    display: flex;
}

.log {
    max-height: 195px;
    overflow-y: auto;
    height: 195px;
}

</style>