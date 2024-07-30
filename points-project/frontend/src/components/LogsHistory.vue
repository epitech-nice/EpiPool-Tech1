<template>
    <div class="team-points flex-column">
        <span class="title-underscore">Last Events</span>
        <div class="log">
            <p v-for="log in logs" :key="log.log_id">
                {{ log.name }} {{ log.points > 0 ? 'a gagné ' + log.points + ' points grâce à ' : 'a perdu ' + Math.abs(log.points) + ' points à cause de ' }}{{ log.reason }}
            </p>
            <p>ef</p>
            <p>ef</p>
            <p>ef</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LogsHistory',
    props: {
        team: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            logs: []
        };
    },
    watch: {
        'team.team_id': {
            immediate: true,
            handler() {
                this.fetchLogs();
            }
        }
    },
    methods: {
        async fetchLogs() {
            if (this.team && this.team.team_id) {
                try {
                    const response = await axios.get('http://localhost:3000/api/logs/logs_by_team', {
                        params: { team_id: this.team.team_id }
                    });
                    this.logs = response.data;
                } catch (error) {
                    console.error('Error fetching logs:', error);
                }
            }
        }
    }
};
</script>

<style>

.title-underscore {
    font-size: 1.5em;
    margin: 0;
    padding: 0;
    color: white;
    border-bottom: 1px solid white;
    width: 100%;
    text-align: center;
    padding-bottom: 10px;
}

.flex-column {
    display: flex;
    flex-direction: column;
}
.log {
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    overflow-x: auto;
    padding: 2px;
}

.log p {
    background-color: #4d4d60;
    border-radius: 5px;
    color: white;
    padding: 5px 0px;
    margin: 0;
    white-space: nowrap;
    width: fit-content;
    min-width: 100%
}

</style>
