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
        <div class="social-login">
          <label for="social-login" class="centered-text">Inicia sesión con redes sociales</label>
        </div>
        <div class="social-login">
          <img class="icon" src="@/assets/google-icon.png">
          <img class="icon" src="@/assets/twitter-icon.png">
          <img class="icon" src="@/assets/facebook-icon.png">
        </div>
        <div class="social-login">
          <label for="social-login" class="centered-text">¿Olvidaste tu contraseña?</label>
        </div>
      </form>
    </div>
    <div class="carousel">
      <div v-for="(image, index) in campaignAssets" :key="index">
        <img v-if="currentImage === index" :src="image" class="carousel-image" alt="Campaign" />
      </div>
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
  text-align: left;
}

.login-container {
  display: flex;
  width: 1170px;
  height: 734px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: auto;
  font-size: 15px;
  padding: 2em;
}

.login {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 700;
  line-height: 39px;
  letter-spacing: 0em;
  text-align: left;
  padding-left: 100px;
  /* Add 100px of padding to the left */
}

.centered-text {
  text-align: center;
}

.login h1 {
  width: 195px;
  height: 39px;
  display: inline-block;
  /* change display to inline-block */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  color: #212B36;
  margin-bottom: 1em;
  text-align: left;
  /* add this line to align the h1 text to the left */
}

.input-group {
  display: flex;
  font-family: 'Inter';
  font-size: 15px;
  flex-direction: column;
  margin-bottom: 1em;
}

.input-group label {
  margin-bottom: 0.5em;
  color: #6C767E
}

.input-group input,
.input-group button {
  width: 400px;
  /* set width to 400px */
  height: 48px;
  /* set height to 48px */
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
  margin-top: 1em;
  text-align: center;
  font-size: 16px;
  color: #6C767E
}

.icon {
  width: 120px;
  /* set the width to 120px */
  height: 45px;
  /* set the height to 45px */
}

.carousel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* Add this */
  overflow: hidden;
  /* Add this to prevent images from extending the container */
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
  opacity: 0;
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
</style>
