<template>
    <div class="logs-container">
        <div v-if="logs.length > 0" class="logs-table">
            <div class="flexSB">
                <h1>Logs Actions</h1>
                <div class="flexSB" style="margin-right: 25px;">
                    <RouterLink to="/dashboard" class="simpleBtn">Back</RouterLink>
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
        <div v-else class="Card flexSB">
            <p>No logs available.</p>
            <RouterLink to="/dashboard" class="simpleBtn">Back</RouterLink>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import DeleteLog from '@/components/DeleteLog.vue';
import { useNotification } from '@/utils/NotificationService';

export default {
    name: 'LogsView',
    components: {
        DeleteLog
    },
    data() {
        return {
            logs: []
        };
    },
    mounted() {
        this.fetchLogs();
    },
    methods: {
        async fetchLogs() {
            const { show } = useNotification();
            try {
                const response = await axios.get(`logs`);
                this.logs = response.data;
            } catch (error) {
                show('An error occured.', 'error')
            }
        },
        async update() {
            this.fetchLogs();
        }
    }
};
</script>

<style scoped>

.flexSB {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.flexIcon {
    display: flex;
    align-content: center;
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

.log-row:hover {
    cursor: pointer;
}

.logs-body {
    padding-right: 5px;
    border-top: 1px solid;
}
</style>
