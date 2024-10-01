<template>
    <transition name="fade">
        <div v-if="visible" :class="`notification ${type}`" @click="closeNotification">
            <p>{{ message }}</p>
        </div>
    </transition>
</template>


<script>
export default {
    data() {
        return {
            visible: false,
            message: '',
            type: 'success',
        };
    },
    methods: {
        showNotification(message, type = 'success') {
            this.message = message;
            this.type = type;
            this.visible = true;

            setTimeout(() => {
                this.visible = false;
            }, 4000);
        },
        closeNotification() {
            this.visible = false;
        },
    },
};
</script>

<style scoped>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1em;
    border-radius: 5px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.5s ease, transform 0.5s ease;
    z-index: 25;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
}

.notification.success {
    background-color: var(--success);
}

.notification.error {
    background-color: var(--error);
}

.notification.info {
    background-color: var(--highlight);
}

.fade-enter-active,
.fade-leave-active {
    transition: all 1s ease
}

.fade-leave-active {
    animation: slidefastright 1s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}


.fade-enter-to {
    opacity: 1;
    animation: shake 1s;
}

@keyframes shake {
    0% { transform: translateX(0); }
    30%, 50%, 70% { transform: translateX(-5px); }
    40%, 60% { transform: translateX(5px); }
    100% { transform: translateX(0); }
}

@keyframes slidefastright {
    90% {
        transform: translateX(-150px);
    }
    100% {
        transform: translateX(200%);
    }
}

</style>
