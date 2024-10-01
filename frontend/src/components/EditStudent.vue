<template>
    <div>
        <div class="miniCard warning" @click="showEditForm = true">
            <i class="fa-solid fa-pen-to-square"></i>
        </div>
        <BlurForm v-if="showEditForm" :showForm="showEditForm" submitText="Save" @close="closeForm" @submit="editStudent">
            <h1>Edit Student informations</h1>
            <div class="divForm">
                <input type="text" required v-model="formData.name" placeholder="Name" />
                <input type="email" required v-model="formData.email" placeholder="Email" />
            </div>
        </BlurForm>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import BlurForm from '@/components/BlurForm.vue';
import { useNotification } from '@/utils/NotificationService';

export default {
    name: 'EditStudent',
    props: {
        student: {
            type: Object,
            required: true
        }
    },
    components: {
        BlurForm
    },
    data() {
        return {
            showEditForm: false,
            formData: { ...this.student }
        };
    },
    methods: {
        closeForm() {
            this.showEditForm = false;
        },
        async editStudent() {
            const { show } = useNotification();
            try {
                await axios.put(`students/Update`, this.formData)
                this.$emit('update');
                this.closeForm();
                show('Student edited successfully', 'success');
            } catch (error) {
                show('Error editing student', 'error');
            }
        }
    }
};
</script>

<style scoped>

</style>
