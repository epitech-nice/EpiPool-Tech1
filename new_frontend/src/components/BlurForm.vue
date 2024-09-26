<template>
    <div v-if="showForm" class="overlay">
        <div class="form-container" style="background-color: var(--primaryBg)">
            <form @submit.prevent="onSubmit" style="text-align: center;">
                <slot></slot>
                <div class="flexSB">
                    <button type="button" class="simpleBtn" @click="closeForm">Cancel</button>
                    <button type="submit" class="simpleBtn">{{ submitText }}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlurForm',
    props: {
        showForm: {
            type: Boolean,
            default: false
        },
        submitText: {
            type: String,
            default: 'Valider'
        }
    },
    methods: {
        closeForm() {
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.form-container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
}

.flexSB {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}
</style>
