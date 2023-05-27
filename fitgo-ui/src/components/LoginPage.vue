<template>
  <div class="login">
    <h1>FitGo</h1>
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div class="input-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="input-group">
        <button type="submit">Iniciar sesión</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      // Additional data properties
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('https://fit-go-api.onrender.com/api/users/login', {
          email: this.email,
          password: this.password,
        });
        if (response.data.token) {
          // Save the token in local storage or in a Vuex store
          localStorage.setItem('user-token', response.data.token);
          // Redirect to a new page, or update the state of your app
          this.$router.push('/user-dashboard');
        }
      } catch (error) {
        this.error = 'An error occurred, please try again.';
      }
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2em;
  color: #333;
  font-family: Arial, sans-serif;
}

.login h1 {
  font-size: 2em;
  margin-bottom: 1em;
  color: #333;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  margin-bottom: 1em;
}

.input-group label {
  margin-bottom: 0.5em;
  font-weight: bold;
  color: #555;
}

.input-group input {
  padding: 0.5em;
  font-size: 1em;
  border: 2px solid #ddd;
  border-radius: 5px;
}

.input-group button {
  padding: 0.5em 1em;
  font-size: 1em;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.input-group button:hover {
  background-color: #555;
}
</style>
