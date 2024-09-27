<template>
    <div class="students-container">
        <div v-if="students.length > 0" class="students-table">
            <div class="flexSB">
                <h1>Students</h1>
                <div class="flexSB">
                    <AddStudent @update="update" :teamId="this.selectedTeam" />
                    <RouterLink to="/dashboard" class="simpleBtn">Back</RouterLink>
                </div>
            </div>
            <div class="students-header">
                <p>Name</p>
                <p>Email</p>
                <p>Points</p>
                <p>Team</p>
                <p>Actions</p>
            </div>
            <div class="students-body">
                <div v-for="student in students" :key="student.id" class="student-row">
                    <p>{{ student.name }}</p>
                    <p>{{ student.email }}</p>
                    <p>{{ student.points }}</p>
                    <p>{{ student.team_name ? student.team_name : 'None' }}</p>
                    <div class="flexIcon">
                        <EditStudent :student="student" @update="update" />
                        <DeleteStudent :student="student" @update="update" />
                        <ChangeTeamStudent :student="student" @update="update" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="Card">
            <div class="flexSB">
                <p>No students</p>
                <AddStudent @update="update" :teamId="this.selectedTeam" />
                <RouterLink to="/dashboard" class="simpleBtn">Back</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios'
import EditStudent from '@/components/EditStudent.vue';
import DeleteStudent from '@/components/DeleteStudent.vue';
import AddStudent from '@/components/AddStudent.vue';
import ChangeTeamStudent from '@/components/ChangeTeamStudent.vue';
import { useTeamStore } from '@/stores/teamStore';
import { computed } from 'vue';

export default {
    name: 'StudentsTeam',
    components: {
        EditStudent,
        DeleteStudent,
        AddStudent,
        ChangeTeamStudent
    },
    setup() {
        const teamStore = useTeamStore();
        const selectedTeam = computed(() => teamStore.selectedTeam);
        
        return {
            selectedTeam
        };
    },
    data() {
        return {
            teamName: null,
            students: []
        }
    },
    watch: {
        selectedTeam: {
            immediate: true,
            handler() {
                this.fetchStudents();
            }
        }
    },
    methods: {
        async fetchStudents() {
            const response = await axios.get(`students`)
            this.students = response.data
        },
        async update() {
            this.fetchStudents();
        }
    },
    mounted() {
        this.fetchStudents();
    }
}
</script>


<style scoped>

.students-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.students-table {
    background-color: var(--secondaryBg);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px var(--shadowLight);
    width: 100%;
}

.students-header,
.student-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 10px 0;
    color: var(--primaryText);
    text-align: center;
    transition: all 0.7s;
}

.students-header p {
    font-size: 1.2rem;
    color: var(--secondaryAccent);
}

.students-header {
    font-weight: bold;
    border-bottom: 2px solid var(--border);
}

.student-row:nth-child(odd) {
    background-color: var(--primaryBg);
}

.students-body {
    /* max-height: 250px; */
    overflow-y: auto;
    padding-right: 5px;
    border-top: 1px solid;
}

.student-row:hover {
    cursor: pointer;
}

.flexIcon {
    display: flex;
    align-content: center;
    gap: 10px;
    justify-content: center;
}

</style>
