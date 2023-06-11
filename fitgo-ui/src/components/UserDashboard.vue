<template>
  <div>
    <h1>Welcome to the dashboard, {{ username }}!</h1>
    <!-- Place your dashboard content here -->
  </div>
</template>

<script>
export default {
  name: 'UserDashboard',
  data() {
    return {
      username: 'Danilo Orrego' // Set the default username directly in the data property
    };
  }
  // other options...
}
</script>

<style scoped>
  /* Place your CSS styles here */
  /* Only styles specific to the main content of this component */
</style>
