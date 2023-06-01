<template>
  <div class="login-container">
    <div class="login">
      <h1>Inicia sesión</h1>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="email">Correo electrónico</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="input-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="input-group">
          <button type="submit" class="btn-login">Ingresar</button>
        </div>
        <div class="centered-text">
          <label for="social-login">Inicia sesión con redes sociales</label>
        </div>
        <div class="social-login">
          <img class="icon" src="@/assets/google-icon.png">
          <img class="icon" src="@/assets/twitter-icon.png">
          <img class="icon" src="@/assets/facebook-icon.png">
        </div>
        <div class="centered-text">
          <label for="social-login">¿Olvidaste tu contraseña?</label>
        </div>
      </form>
    </div>
    <div class="carousel">
      <div v-for="(image, index) in campaignAssets" :key="index">
        <img v-if="currentImage === index" :src="image" class="carousel-image" alt="Campaign" />
      </div>
    </div>
    <div v-if="isLoading" class="overlay">
      <div class="spinner"></div>
    </div>
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
      isLoading: false,
      currentImage: 0,
      campaignAssets: [
        require('@/assets/carrousel_login_1.png'),
        require('@/assets/carrousel_login_2.png'),
        require('@/assets/carrousel_login_3.png'),
      ],
      transitionName: 'fade',
    };
  },
  created() {
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.campaignAssets.length;
    }, 5000);
  },
  methods: {
    async submitForm() {
      this.isLoading = true;
      try {
        const response = await axios.post('https://fit-go-api.onrender.com/api/users/login', {
          email: this.email,
          password: this.password,
        });
        if (response.data.token) {
          localStorage.setItem('user-token', response.data.token);
          this.$router.push('/user-dashboard');
        }
      } catch (error) {
        this.error = 'An error occurred, please try again.';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #f2f2f2;
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 39px;
  letter-spacing: 0em;
  text-align: center;
  display: flex;
  align-items: center; /* Aligns items vertically in the center */
  justify-content: center; /* Aligns items horizontally in the center */
  height: 100vh; /* Makes body take up full viewport height */
  margin: 0; /* Removes default margin */
  padding: 0; /* Removes default padding */
}

.login-container {
  display: flex;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  align-self: center;
  font-size: 15px;
  max-width: 80%; /* Limits the width to 80% of the body */
  max-height: 90%;
  padding: 16px; /* Provides some space around the elements inside the container */
  box-sizing: border-box; /* Makes sure padding doesn't increase the total width */
  margin: auto; /* Centers the container on the page */
}

.login, .carousel {
  flex: 1; /* Gives equal width to both elements */
}

.login {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter';
  font-weight: 700;
  line-height: 39px;
  letter-spacing: 0em;
  text-align: left;
  padding-left: 2px;
  /* Add 100px of padding to the left */
}

.centered-text {
  text-align: center;
  width: 100%;
  /* Make sure this class takes the full width */
  color: #6C767E;
}

.login h1 {
  display: block; /* Change to block */
  width: 100%; /* Increase the width to 100% */
  height: auto; /* Change height to auto */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  color: #212B36;
  margin-bottom: 1em;
  margin-top: 12px;
  text-align: left;
  margin-left: 120px;
  /* add this line to align the h1 text to the left */
}

.input-group {
  display: flex;
  font-family: 'Inter';
  font-size: 15px;
  flex-direction: column;
  margin-bottom: 30px;
  margin-top: 20px;
}

.input-group label {
  margin-bottom: 0.1em;
  color: #6C767E
}

.input-group input,
.input-group button {
  width: 400px;
  height: 48px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.input-group button {
  margin: 40px 0;
  background-color: #374850;
  padding: 12px 24px;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  transition-duration: 0.4s;
  cursor: pointer;
  border: none;
  /* remove border to maintain the width */
}

.social-login {
  display: flex;
  justify-content: space-between;
  margin-top: 2px;
  text-align: center;
  font-size: 16px;
  color: #6C767E
}

.icon {
  width: 120px;
  /* set the width to 120px */
  height: 45px;
  /* set the height to 45px */
  margin-top: 3px;
  margin-bottom: 40px;
}

.carousel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  max-width: 75%;
  position: relative;
  /* Add this */
  overflow: hidden;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.carousel-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 548px;
  height: 696px;
  object-fit: contain;
  max-height: 96%;
  opacity: 0;
  padding-right: 2px;
  animation: fadeInOut 5s infinite;
}

.carousel-image.fade {
  animation-delay: 0s;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner {
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left: 8px solid black;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


</style>
