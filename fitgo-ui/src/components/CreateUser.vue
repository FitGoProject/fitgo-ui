<template>
    <div class="create-user">
      <h1>Create User</h1>
      <form @submit.prevent="createUser">
        <label for="name">Name:</label>
        <input id="name" v-model="user.name" required />
  
        <label for="lastName">Last Name:</label>
        <input id="lastName" v-model="user.lastName" required />
  
        <label for="birthday">Birthday:</label>
        <input id="birthday" v-model="user.birthday" type="date" />
  
        <label for="email">Email:</label>
        <input id="email" v-model="user.email" required type="email" />
  
        <label for="phone">Phone:</label>
        <input id="phone" v-model="user.phone" required />
  
        <label for="personalId">Personal ID:</label>
        <input id="personalId" v-model="user.personalId" required />
  
        <label for="password">Password:</label>
        <input id="password" v-model="user.password" required type="password" />
  
        <!-- Simplified Roles and Subscriptions, adapt as needed -->
        <label for="roles">Roles:</label>
        <input id="roles" v-model="user.roles" />
  
        <label for="subscriptions">Subscriptions:</label>
        <input id="subscriptions" v-model="user.subscriptions" />
  
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          name: '',
          lastName: '',
          birthday: '',
          email: '',
          phone: '',
          personalId: '',
          password: '',
          roles: '',
          subscriptions: '',
        },
      };
    },
    methods: {
      async createUser() {
        try {
          const userToken = localStorage.getItem('user-token'); 
          await axios.post('https://fit-go-api.onrender.com/api/users/register', this.user, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
          // Redirect to user management after successful creation
          this.$router.push('/user-management');
        } catch (error) {
          console.error('There was an error!', error);
        }
      },
    },
  };
  </script>
  