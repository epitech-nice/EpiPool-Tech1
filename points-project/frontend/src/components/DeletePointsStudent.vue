<template>
    <div class="team-points add-points">
        <h3>Remove Points Student</h3>
        <form @submit.prevent="submitPoints">
            <select v-model="selectedStudent" required>
                <option v-for="student in students" :key="student.email" :value="student">
                    {{ student.name }}
                </option>
            </select>
            <input type="number" v-model="pointsToAdd" placeholder="Enter points" required />
            <button type="submit">Remove Points</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AddPoints',
    props: {
        team: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            pointsToAdd: 0,
            students: [],
            selectedStudent: null
        };
    },
    watch: {
        team: {
            immediate: true,
            handler(newTeam) {
                if (newTeam) {
                    this.fetchStudents(newTeam.team_id);
                }
            }
        }
    },
    methods: {
        async fetchStudents(team_id) {
            try {
                const response = await axios.get('http://localhost:3000/api/students_by_team', {
                    params: { team_id: team_id }
                });
                this.students = response.data;
                if (this.students.length > 0) {
                    this.selectedStudent = this.students[0];
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        },
        async submitPoints() {
            if (!this.selectedStudent) {
                alert('Please select a student.');
                return;
            }

            try {
                await axios.put('http://localhost:3000/api/remove_points_to_student', {
                    student_id: this.selectedStudent.student_id,
                    points: this.pointsToAdd
                });
                this.pointsToAdd = 0;
                this.$emit('points-updated');
            } catch (error) {
                console.error('Error adding points:', error);
            }
        }
    }
};
</script>

<style>
.add-points {
    background-color: #2b2b38;
    border-radius: 10px;
    padding: 20px;
    width: fit-content;
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}
input, select {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #2575fc;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}
button:hover {
    background-color: #6a11cb;
}
</style>
