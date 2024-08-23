<template>
  <div>
    <h2>Current Autobots Count: {{ autobotsCount }}</h2>
    <button @click="fetchAutobotsCount">Refresh Count</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      autobotsCount: 0,
    };
  },
  methods: {
    async fetchAutobotsCount() {
      try {
        const response = await axios.get('http://localhost:3000/api/autobots/count');
        this.autobotsCount = response.data.count;
      } catch (error) {
        console.error('Error fetching Autobots count:', error);
      }
    },
  },
  mounted() {
    this.fetchAutobotsCount();
  },
};
</script>

<style scoped>
h2 {
  font-family: Arial, sans-serif;
  color: #333;
}
button {
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #3a9d75;
}
</style>
