<template>
    <div class="adjust-points">
        <span class="title-underscore">Adjust Points</span>
        <button @click="showForm = true" style="font-weight: bold; margin: 15px;">Add / Remove Points</button>
        <div v-if="showForm" class="blurbackground"></div>
        <div v-if="showForm" class="popup">
            <button class="close-button" @click="showForm = false">&#10005;</button>
            <form @submit.prevent="submitPoints" class="form-flex">
                <label for="action">Action</label>
                <select v-model="action">
                    <option value="add">Add Points</option>
                    <option value="remove">Remove Points</option>
                </select>
                <label for="target">Target</label>
                <select v-model="target">
                    <option value="team">Team ({{ this.team.color }})</option>
                    <option value="student">Student</option>
                </select>
                <label v-if="target === 'student'" for="selectedStudent">Student</label>
                <select v-if="target === 'student'" v-model="selectedStudent" required>
                    <option value="">Select a student</option>
                    <option v-for="student in students" :key="student.email" :value="student">
                    {{ student.name }} - {{ student.points }} points
                    </option>
                </select>
                <label for="points">Quantity</label>
                <input type="number" class="smallCube" v-model="points" required />
                <label for="reason">Reason</label>
                <input type="text" id="reason" v-model="reason" required placeholder="Enter a reason or leave as 'Pedago'" />
                <div class="flex-line">
                    <button @click="showForm = false">Cancel</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdjustPoints',
    props: {
        team: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            points: 0,
            action: 'add',
            target: 'team',
            students: [],
            selectedStudent: null,
            showForm: false,
            reason: "Pedago"
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
                if (this.students.length > 0) {
                this.selectedStudent = this.students[0];
                }
            } catch (error) {
                console.error('Error fetching students:', error);
            }
            }
        },
        async submitPoints() {
            let url, data;
            if (this.target === 'team') {
                url = this.action === 'add' ? 'http://localhost:3000/api/points/add_points_to_team' : 'http://localhost:3000/api/points/remove_points_to_team';
                data = { team_id: this.team.team_id, points: this.points, reason: this.reason };
            } else if (this.target === 'student' && this.selectedStudent) {
                url = this.action === 'add' ? 'http://localhost:3000/api/students/add_points_to_student' : 'http://localhost:3000/api/students/remove_points_from_student';
                data = { student_id: this.selectedStudent.student_id, points: this.points, reason: this.reason };
            } else {
                alert('Please select a student.');
                return;
            }
            try {
                await axios.put(url, data);
                this.points = 0;
                this.showForm = false;
                this.$emit('points-updated');
            } catch (error) {
                console.error('Error modifying points:', error);
            }
        }
    }
};
</script>

<style>
.adjust-points {
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
    border: 1px solid #8a8a8a;
    background-color: #2b2b38;
    color: white;
    width: 100%;
    font-size: 16px;
}
.popup {
    position: fixed;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #3a3b4b;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    z-index: 2;
    border-radius: 10px;
    min-width: 15%;
    max-width: 30%;
    width: 20%;
}
button {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #2575fc;
    color: white;
    cursor: pointer;
    transition: transform 0.3s ease;
    will-change: transform;
}

button:hover {
    transform: scale(1.1);
}

.blurbackground {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
}
h3 {
    font-size: 2em;
    padding: 10px;
    margin: 0;
    background: linear-gradient(to right, white, white);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.form-flex {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-content: center;
    align-items: center;
    width: 100%;
}
.form-flex label {
    font-weight: 500;
    text-transform: uppercase;
    color: #9292a0;
    cursor: pointer;
    font-size: 20px
}
.flex-line {
    display: flex;
    gap: 50px;
    justify-content: space-between;
    width: 100%;
}
.smallCube {
    width: 55px;
    border-radius: 0px;
    border: 1px solid #2b2b38;
    text-align: center;
}
.smallCube::-webkit-inner-spin-button,
.smallCube::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
.smallCube {
    -moz-appearance: textfield;
}
.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
}
.close-button:hover {
    color: #ccc;
}
</style>
