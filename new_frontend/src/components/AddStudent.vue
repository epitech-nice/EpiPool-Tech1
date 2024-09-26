<template>
    <div>
        <div class="simpleBtn" @click="showAddForm = true">
            <i class="fa-solid fa-plus"></i>
        </div>
        <BlurForm v-if="showAddForm" :showForm="showAddForm" submitText="Create" @close="closeForm" @submit="addStudent">
            <h1>Create a new student !</h1>
            <div class="divForm">
                <input type="text" required v-model="formData.name" placeholder="Name" />
                <input type="email" required v-model="formData.email" placeholder="Email" />
                <input type="number" required v-model="formData.points" placeholder="Points" />
            </div>
        </BlurForm>
    </div>
</template>


<script>
import axios from '@/utils/axios';
import BlurForm from './BlurForm.vue';

export default {
    name: 'AddStudent',
    components: {
        BlurForm
    },
    props: {
        teamId: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            showAddForm: false,
            formData: { name: '', email: '', points: 0, team_id: this.teamId }
        };
    },
    methods: {
        closeForm() {
            this.showAddForm = false;
        },
        async addStudent() {
            await axios.post('students/Create', this.formData);
            this.$emit('update');
            this.closeForm();
        }
    }
};
</script>
