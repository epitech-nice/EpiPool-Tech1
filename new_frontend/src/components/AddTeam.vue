<template>
    <div>
        <span class="round AddBtn" @click="toggleForm"><i class="fa-solid fa-plus"></i></span>
        <BlurForm :showForm="showForm" @close="toggleForm" @submit="addTeam" submitText="Ajouter">
            <h1>Add a New Team</h1>
            <div class="divForm">
                <input type="text" placeholder="name" v-model="name" required>
                <input type="text" placeholder="color" v-model="color" required>
                <input type="file" accept="image/*">
                <input type="number" min="0" step="1" placeholder="select team points" v-model="points" required>
            </div>
        </BlurForm>
    </div>
</template>

<script>
import BlurForm from './BlurForm.vue';
import axios from '@/utils/axios';

export default {
    name: 'AddTeamForm',
    components: {
        BlurForm
    },
    props: {
        teams: Array
    },
    data() {
        return {
            showForm: false,
            selectedTeamId: null,
            name: null,
            color: null,
            points: null
        };
    },
    methods: {
        toggleForm() {
            this.showForm = !this.showForm;
        },
        async addTeam() {
            await axios.post(`teams/Create`, {
                name: this.name,
                color: this.color,
                points: this.points
            })
            .catch(error => {
                console.log(error);
            });
            this.selectedTeamId = null;
            this.showForm = false;
            this.$emit('update');
        }
    }
}
</script>

<style scoped>

.divForm {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

input {
    padding: 10px;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 0;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
    background-color: var(--secondaryBg);
    outline: none;
    color: var(--primaryText);
}

input:focus {
    border-bottom-color: var(--buttonPrimary);
}

input::placeholder {
    color: var(--secondaryText);
    font-style: italic;
}

</style>
