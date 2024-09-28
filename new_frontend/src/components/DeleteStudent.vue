<template>
    <div>
        <div class="miniCard error" @click="showDeleteForm = true">
            <i class="fa-solid fa-ban"></i>
        </div>
        <BlurForm
            v-if="showDeleteForm"
            :showForm="showDeleteForm"
            submitText="Valider"
            @close="closeForm"
            @submit="deleteStudent"
            >
            <h1>Want to delete {{ student.name }} ?</h1>
        </BlurForm>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import BlurForm from '@/components/BlurForm.vue';
import { useNotification } from '@/utils/NotificationService';

export default {
    name: 'DeleteStudent',
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
            showDeleteForm: false
        };
    },
    methods: {
        closeForm() {
            this.showDeleteForm = false;
        },
        async deleteStudent() {
            const {show} = useNotification();
            try {
                await axios.delete(`students/Delete?student_id=${this.student.student_id}`);
                this.$emit('update');
                this.closeForm();
                show('Student deleted successfully', 'success');
            } catch (error) {
                show('Error deleting student', 'error');
            }
        }
    }
};
</script>

<style scoped>
</style>
