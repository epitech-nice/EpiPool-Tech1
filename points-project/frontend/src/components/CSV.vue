<template>
    <div class="upload-container">
        <div 
            class="drop-zone" 
            @dragover.prevent="onDragOver" 
            @drop.prevent="onDrop"
            @click="fileInputClick"
        >
            Drag and drop a CSV file here or click to select
        </div>
        <input 
            type="file" 
            ref="fileInput" 
            @change="onFileChange" 
            style="display: none;" 
            accept=".csv"
        />
        <button @click="uploadFile" :disabled="!file">Upload</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            file: null
        };
    },
    methods: {
        onDragOver(event) {
            event.preventDefault();
        },
        onDrop(event) {
            const files = event.dataTransfer.files;
            if (files.length > 0 && this.isCsvFile(files[0])) {
            this.file = files[0];
            } else {
            alert('Please drop a CSV file.');
            }
        },
        fileInputClick() {
            this.$refs.fileInput.click();
        },
        onFileChange(event) {
            const files = event.target.files;
            if (files.length > 0 && this.isCsvFile(files[0])) {
            this.file = files[0];
            } else {
            alert('Please select a CSV file.');
            }
        },
        isCsvFile(file) {
            return file.type === 'text/csv' || file.name.endsWith('.csv');
        },
        async uploadFile() {
            if (!this.file) {
                alert('No file selected.');
                return;
            }
            const formData = new FormData();
            formData.append('file', this.file);
            try {
                const response = await axios.post('http://localhost:3000/api/csv/upload_csv', formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('File uploaded successfully', response.data);
                alert('File uploaded successfully.');
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Error uploading file.');
            }
        }
    }
};
</script>

<style>
.upload-container {
    padding: 20px;
    border: 2px dashed #ccc;
    text-align: center;
    margin: 20px;
    cursor: pointer;
}

.drop-zone {
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #4d4d60;
    margin-bottom: 10px;
}
</style>
