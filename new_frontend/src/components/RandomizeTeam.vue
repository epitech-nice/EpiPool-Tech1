<template>
    <div class="Card randomContainer">
        <h1>Randomize Students in Teams!</h1>
        <button @click="showConfirmation = true" class="simpleBtn">Randomize Team</button>

        <BlurForm 
            v-if="showConfirmation" 
            :showForm="showConfirmation" 
            submitText="Confirm" 
            @close="closeForm" 
            @submit="randomizeTeam">
            <h1>Confirm Randomization</h1>
            <p>You can randomize the students only once. Are you sure you want to proceed?</p>
        </BlurForm>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import BlurForm from '@/components/BlurForm.vue';
import { useNotification } from '@/utils/NotificationService';

export default {
    components: {
        BlurForm,
    },
    data() {
        return {
            showConfirmation: false,
        };
    },
    methods: {
        closeForm() {
            this.showConfirmation = false;
        },
        async randomizeTeam() {
            const { show } = useNotification();
            try {
                const rep = await axios.get('teams/RandomTeam');
                show(rep.data.message, 'success');
                this.$emit('update');
                this.closeForm();
            } catch (error) {
                show(error.response.data.error, 'error');
            }
        },
    },
};
</script>

<style scoped>
.randomContainer {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 20px;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s;
}

button.simpleBtn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>
