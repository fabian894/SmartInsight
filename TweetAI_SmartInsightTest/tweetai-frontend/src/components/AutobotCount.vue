<template>
  <div>
    <h1>Current Count of Autobots: {{ autobotCount }}</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      autobotCount: 0
    };
  },
  created() {
    this.fetchAutobotCount();
    setInterval(this.fetchAutobotCount, 60000); // Update every minute
  },
  methods: {
    async fetchAutobotCount() {
      try {
        const response = await axios.get('http://localhost:3000/api/autobots/count');
        this.autobotCount = response.data.count;
      } catch (error) {
        console.error('Error fetching autobot count:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add any styles here */
</style>
