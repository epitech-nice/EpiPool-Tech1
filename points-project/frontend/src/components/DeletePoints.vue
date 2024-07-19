<template>
    <div class="team-points add-points">
        <h3>Delete Points</h3>
        <form @submit.prevent="submitPoints">
            <input type="number" v-model="pointsToAdd" placeholder="Enter points" required />
            <button type="submit">Delete Points</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DeletePoints',
    props: {
        team: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            pointsToAdd: 0
        };
    },
    methods: {
        async submitPoints() {
            try {
                const response = await axios.put('http://localhost:3000/api/remove_points_to_team', {
                    team_id: this.team.team_id,
                    points: this.pointsToAdd
                });
                this.$emit('points-added', response.data.updatedPoints);
                this.pointsToAdd = 0;
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
input {
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
