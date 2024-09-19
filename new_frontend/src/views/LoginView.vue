<template>
    <div class="centerPage">
        <LoginForm />
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
    name: 'LoginView',
    components: {
        LoginForm
    }
}

</script>

<style>

.centerPage {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
