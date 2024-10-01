<template>
    <div class="logs-container">
        <div v-if="logs.length > 0" class="logs-table">
            <div class="flexSB">
                <h1>Logs</h1>
                <div class="flexSB">
                    <RouterLink to="/logs" class="simpleBtn">View all</RouterLink>
                </div>
            </div>
            <div class="logs-header">
                <p>Team</p>
                <p>Student</p>
                <p>Points</p>
                <p>Reason</p>
                <p>Actions</p>
            </div>
            <div class="logs-body">
                <div v-for="log in logs" :key="log.log_id" class="log-row">
                    <p>{{ log.team_name }}</p>
                    <p>{{ log.student_name }}</p>
                    <p>{{ log.points }}</p>
                    <p>{{ log.reason }}</p>
                    <div class="flexIcon">
                        <DeleteLog :log="log" @update="update" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="!selectedTeam" class="Card loadingtext loadingtext">
            <p>Please select a team to view logs...</p>
        </div>
        <div v-else class="Card">
            <div class="flexSB loadingtext">
                <p>No logs for this team</p>
                <RouterLink to="/logs" class="simpleBtn">View all</RouterLink>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import { useTeamStore } from '@/stores/teamStore';
import DeleteLog from '@/components/DeleteLog.vue';
import { computed } from 'vue';

export default {
    name: 'LogsAction',
    components: {
        DeleteLog
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
            logs: []
        };
    },
    watch: {
        selectedTeam: {
            immediate: true,
            handler(newTeamId) {
                this.fetchLogs(newTeamId);
            }
        }
    },
    methods: {
        async fetchLogs(teamId) {
            try {
                if (!teamId) return;
                const response = await axios.get(`logs/ByTeam?team_id=${teamId}`);
                this.logs = response.data;
            } catch(error) {
                console.log(error.response.data.msg)
            }
        },
        async update() {
            this.fetchLogs(this.selectedTeam);
        }
    }
};
</script>

<style scoped>
.flexIcon {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.logs-container {
    display: flex;
    justify-content: center;
    flex-grow: 1;
}

.logs-table {
    background-color: var(--secondaryBg);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px var(--shadowLight);
    width: 100%;
}

.logs-header,
.log-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 10px 0;
    color: var(--primaryText);
    text-align: center;
    transition: all 0.7s;
}

.logs-header p {
    font-size: 1.2rem;
    color: var(--secondaryAccent);
}

.logs-header {
    font-weight: bold;
    border-bottom: 2px solid var(--border);
}

.log-row:nth-child(odd) {
    background-color: var(--primaryBg);
}

.logs-body {
    max-height: 250px;
    overflow-y: auto;
    padding-right: 5px;
    border-top: 1px solid;
}

.log-row:hover {
    cursor: pointer;
}
</style>
