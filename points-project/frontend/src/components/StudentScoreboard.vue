<template>
    <div class="team-points flex-column">
        <span class="title-underscore">Students</span>
        <div class="log">
            <div class="student-orders" v-for="student in students" :key="student.log_id">
                {{ student.name }} - {{ student.email }} ({{ student.points }} points)
                <div class="icons-end">
                    <button @click="changeStudent(student.student_id)" class="icon-button change">
                        <svg-icon type="mdi" :path="changeTeam"></svg-icon>
                    </button>
                    <button @click="removeStudent(student.student_id)" class="icon-button cancel">
                        <svg-icon type="mdi" :path="cancel"></svg-icon>
                    </button>
                </div>
            </div>
        </div>
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
            cancel: mdiCancel,
            changeTeam: mdiSwapHorizontal,
        };
    },
    watch: {
        'team.team_id': {
            immediate: true,
            handler() {
                this.fetchStudents();
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
        changeStudent(studentId) {
            console.log('Changing team for student:', studentId);
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