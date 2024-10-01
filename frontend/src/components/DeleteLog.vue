<template>
    <div>
        <div class="miniCard error" @click="showDeleteForm = true">
            <i class="fa-solid fa-ban"></i>
        </div>
        <BlurForm
            v-if="showDeleteForm"
            :showForm="showDeleteForm"
            submitText="Confirm"
            @close="closeForm"
            @submit="DeleteLog"
            >
            <h1>Sure you want to delete it ?</h1>
        </BlurForm>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import BlurForm from '@/components/BlurForm.vue';
import { useNotification } from '@/utils/NotificationService';

export default {
    name: 'DeleteLog',
    props: {
        log: {
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
        async DeleteLog() {
            const {show} = useNotification();
            try {
                await axios.delete(`logs/Delete?log_id=${this.log.log_id}`);
                show('Log deleted successfully', 'success');
                this.$emit('update');
                this.closeForm();
            } catch (error) {
                show('Error deleting log', 'error');
            }
        }
    }
};
</script>

<style scoped>
</style>
