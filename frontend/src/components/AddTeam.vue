<template>
    <div>
        <span class="round AddBtn" @click="toggleForm">
            <i class="fa-solid fa-plus"></i>
        </span>
        <BlurForm :showForm="showForm" @close="toggleForm" @submit="addTeam" submitText="Ajouter">
            <h1>Add a New Team</h1>
            <div class="divForm">
                <input type="text" placeholder="name" v-model="name" required>
                <input type="text" placeholder="color" v-model="color" required>
                <input type="file" @change="onImageChange" accept="image/*">
                
                <div v-if="imageUrl && !croppedImageUrl" class="image-crop-container">
                    <img :src="imageUrl" ref="image" alt="Selected Image" />
                </div>

                <div v-if="imageUrl && !croppedImageUrl">
                    <button class="simpleBtn" @click.prevent="cropImage">Crop Image</button>
                </div>

                <input type="number" min="0" step="1" placeholder="select team points" v-model="points" required>
            </div>

            <div v-if="croppedImageUrl">
                <img :src="croppedImageUrl" alt="Cropped Image" class="round"/>
            </div>
        </BlurForm>
    </div>
</template>


<script>
import BlurForm from '@/components/BlurForm.vue';
import axios from '@/utils/axios';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { useNotification } from '@/utils/NotificationService';

export default {
    name: 'AddTeamForm',
    components: {
        BlurForm
    },
    data() {
        return {
            showForm: false,
            name: null,
            color: null,
            points: null,
            imageUrl: null,
            croppedImageUrl: null,
            cropper: null
        };
    },
    methods: {
        toggleForm() {
            this.showForm = !this.showForm;
            if (!this.showForm) {
                this.resetForm();
            }
        },
        onImageChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.imageUrl = URL.createObjectURL(file);
                this.$nextTick(() => {
                    const imageElement = this.$refs.image;
                    if (imageElement) {
                        this.cropper = new Cropper(imageElement, {
                            aspectRatio: 1,
                            viewMode: 1,
                            dragMode: 'move',
                            background: false,
                            autoCropArea: 1,
                            responsive: true,
                            cropBoxResizable: false,
                            cropBoxMovable: false
                        });
                    }
                });
            }
        },
        cropImage() {
            const { show } = useNotification();
            if (this.cropper) {
                const croppedCanvas = this.cropper.getCroppedCanvas({
                    width: 100,
                    height: 100,
                    imageSmoothingQuality: 'high'
                });
                this.croppedImageUrl = croppedCanvas.toDataURL('image/png');
                show('Image cropped properly !', 'info')
                this.cropper.destroy();
            }
        },
        async addTeam() {
            const { show } = useNotification();
            try {
                const response = await axios.post(`teams/Create`, {
                    name: this.name,
                    color: this.color,
                    points: this.points,
                    image_name: this.croppedImageUrl
                })
                show(response.data.message, 'success');
                this.resetForm();
                this.$emit('update');
            } catch (error) {
                show(error.response.data.error, 'error');
            }
        },
        resetForm() {
            this.showForm = false;
            this.name = null;
            this.color = null;
            this.points = null;
            this.imageUrl = null;
            this.croppedImageUrl = null;
            this.cropper = null;
        }
    }
}

</script>

<style>

.image-crop-container {
    width: 300px;
    height: 300px;
    position: relative;
    overflow: hidden;
}

.image-crop-container img {
    max-width: 100%;
    display: block;
}

.cropper-crop-box, .cropper-view-box {
    border-radius: 50%;
}

</style>
