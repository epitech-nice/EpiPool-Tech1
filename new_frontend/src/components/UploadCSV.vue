<template>
    <div class="csv-upload Card">
        <h1>Upload CSV</h1>
        <input type="file" @change="handleFileUpload" accept=".csv" />
        <button
            @click="submitCSV"
            :class="['simpleBtn', { 'ready-to-upload': csvFile }]"
            :disabled="!csvFile"
        >
            Upload
        </button>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import { useNotification } from '@/utils/NotificationService';

export default {
    data() {
        return {
            csvFile: null,
            uploadStatus: '',
        };
    },
    methods: {
        handleFileUpload(event) {
            const { show } = useNotification();
            const file = event.target.files[0];
            if (file && file.type === 'text/csv') {
                this.csvFile = file;
                show('File selected correctly.', 'success');
            } else {
                this.uploadStatus = 'Please select a valid CSV file.';
            }
        },
        async submitCSV() {
            if (!this.csvFile) return;

            const { show } = useNotification();
            const formData = new FormData();
            formData.append('file', this.csvFile);

            try {
                const rep = await axios.post('/csv/Upload', formData);
                show(rep.data.message, 'success');
                this.$emit('update');
            } catch (error) {
                this.uploadStatus = 'Error uploading file. Please try again.';
            }
        },
    },
};
</script>

<style scoped>
.csv-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

button.ready-to-upload {
    background-color: #3498db;
    animation: pulse 1.5s infinite;
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.7), 0 0 20px rgba(52, 152, 219, 0.5);
}

@keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 10px rgba(52, 152, 219, 0.7), 0 0 20px rgba(52, 152, 219, 0.5);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(52, 152, 219, 0.9), 0 0 30px rgba(52, 152, 219, 0.6);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 10px rgba(52, 152, 219, 0.7), 0 0 20px rgba(52, 152, 219, 0.5);
    }
}

button.ready-to-upload:hover {
    animation: none;
}

</style>
