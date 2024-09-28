<template>
    <div class="students-container">
        <div v-if="students.length > 0" class="students-table">
            <div class="flexSB">
                <h1>Students</h1>
                <div class="flexSB">
                    <AddStudent @update="update" :teamId="this.selectedTeam" />
                    <RouterLink to="/students" class="simpleBtn">View all</RouterLink>
                </div>
            </div>
            <div class="students-header">
                <p>Name</p>
                <p>Email</p>
                <p>Points</p>
                <p>Actions</p>
            </div>
            <div class="students-body">
                <div v-for="student in students" :key="student.id" class="student-row">
                    <p>{{ student.name }}</p>
                    <p>{{ student.email }}</p>
                    <p>{{ student.points }}</p>
                    <div class="flexIcon">
                        <EditStudent :student="student" @update="update" />
                        <DeleteStudent :student="student" @update="update" />
                        <ChangeTeamStudent :student="student" @update="update" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="!selectedTeam" class="Card loadingtext">
            <p>Please select a team ...</p>
        </div>
        <div v-else class="Card">
            <div class="flexSB">
                <p>No students in this team</p>
                <AddStudent @update="update" :teamId="this.selectedTeam" />
                <RouterLink to="/students" class="simpleBtn">View all</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios'
import EditStudent from './EditStudent.vue';
import DeleteStudent from './DeleteStudent.vue';
import AddStudent from './AddStudent.vue';
import ChangeTeamStudent from './ChangeTeamStudent.vue';
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
            handler(newTeamId) {
                this.fetchStudents(newTeamId);
            }
        }
    },
    methods: {
        async fetchStudents(teamId) {
            if (!teamId)
                return;
            const response = await axios.get(`students/ByTeam?team_id=${teamId}`)
            this.students = response.data
        },
        async update() {
            this.fetchStudents(this.selectedTeam);
        }
    }
}
</script>

<style scoped>

.students-container {
    display: flex;
    justify-content: center;
    flex-grow: 1;
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
    max-height: 250px;
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
