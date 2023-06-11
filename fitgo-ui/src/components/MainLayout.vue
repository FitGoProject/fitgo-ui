<template>
    <div class="dashboard">
      <div class="sidebar">
        <div class="user-info">
          <img class="avatar" src="https://www.w3schools.com/w3images/avatar2.png" alt="User Avatar" />
          <h2 class="user-info">{{ username }}</h2>
        </div>
        <hr class="divider" />
        <ul class="menu-list">
          <li><router-link to="/user-dashboard">Inicio</router-link></li>
          <hr class="divider" />
          <li><router-link to="/user-management">Administración de socios</router-link></li>
          <hr class="divider" />
          <li>Clases</li>
          <hr class="divider" />
          <li>Horarios</li>
        </ul>
      </div>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainLayout',
    data() {
      return {
        username: 'Danilo Orrego',
      };
    },
  };
  </script>
  
  <style scoped>
  body {
    background-color: #111;
    font-family: 'Inter', sans-serif;
    color: #fff;
    font-size: 16px;
  }
  
  .dashboard {
    display: flex;
    height: 100vh;
  }
  
  .sidebar {
    width: 20%;
    background-color: #222;
    color: #fff;
    padding: 2em;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-right: 1px solid #333;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
  }
  
  .user-info .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 1em;
  }
  
  .user-info {
    font-size: 22px;
    font-weight: bold;
    color: #fff;
  }
  
  .divider {
    width: 100%;
    height: 1px;
    background-color: #333;
    border: none;
    margin: 1em 0;
  }
  
  .menu-list {
    list-style-type: none;
    padding: 0;
    font-size: 18px;
    width: 100%;
  }
  
  .menu-list li {
    margin-bottom: 1em;
    cursor: pointer;
    color: #aaa;
  }
  
  .menu-list li:hover {
    color: #fff;
  }
  
  .main-content {
    width: 80%;
    padding: 2em;
    box-sizing: border-box;
    overflow-y: auto;
    background-color: #111;
  }
  
  .main-content h1 {
    font-size: 28px;
    font-weight: bold;
    color: #fff;
  }
  </style>
  