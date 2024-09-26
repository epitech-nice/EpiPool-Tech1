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
            await axios.delete(`students/Delete?student_id=${this.student.student_id}`);
            this.$emit('update');
            this.closeForm();
        }
    }
};
</script>

<style scoped>
</style>
