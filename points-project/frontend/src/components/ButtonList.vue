<template>
    <div>
        <button v-for="button in buttons" :key="button.id">
            {{ button.label }}
        </button>
    </div>
</template>

<script>
    import axios from 'axios';
    
    export default {
        name: 'ButtonList',
        data() {
        return {
            buttons: []
        };
        },
        created() {
        axios.get('http://localhost:3000/api/buttons')
            .then(response => {
            this.buttons = response.data;
            })
            .catch(error => {
            console.error('There was an error!', error);
            });
        }
    };
</script>

<style scoped>
    button {
        margin: 5px;
        padding: 10px 20px;
        font-size: 16px;
    }
</style>
