<template>
  <div>
    <h1 class="heading">Bienvenido al Inicio, {{ username }}!</h1>
    <!-- Place your dashboard content here -->
  </div>
</template>

<script>
export default {
  name: 'UserDashboard',
  data() {
    return {
      username: 'Danilo' // Set the default username directly in the data property
    };
  }
  // other options...
}
</script>

<style scoped>
.heading {
  text-align: left;
}
</style>
