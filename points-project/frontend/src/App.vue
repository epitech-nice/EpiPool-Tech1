<template>
  <div>
    <form @submit.prevent="addButton">
      <input v-model="newButtonLabel" placeholder="New button label" required />
      <button type="submit">Add Button</button>
    </form>
    <div v-for="button in buttons" :key="button.id">
      <button>{{ button.label }}</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ButtonList',
  data() {
    return {
      buttons: [],
      newButtonLabel: ''
    };
  },
  created() {
    this.fetchButtons();
  },
  methods: {
    async fetchButtons() {
      try {
        const response = await axios.get('http://localhost:3000/api/buttons');
        this.buttons = response.data;
      } catch (error) {
        console.error('There was an error fetching the buttons!', error);
      }
    },
    async addButton() {
      try {
        const response = await axios.post('http://localhost:3000/api/buttons', {
          label: this.newButtonLabel
        });
        this.buttons.push(response.data);
        this.newButtonLabel = '';
      } catch (error) {
        console.error('There was an error adding the button!', error);
      }
    }
  }
};
</script>

<style scoped>
button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
}
form {
  margin-bottom: 20px;
}
</style>
