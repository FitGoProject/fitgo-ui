<template>
    <div class="user-management">
        <h1 class="title">Administración de socios</h1>
        <div class="search-box">
            <input v-model="searchTerm" placeholder="Buscar socios..." @input="filterUsers" />
        </div>
        <div class="results-box">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Documento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers" :key="user.id">
                        <td>{{ user.name }}</td>
                        <td>{{ user.lastName }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.personalId }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            allUsers: [],
            filteredUsers: [],
            searchTerm: '',
        };
    },
    async mounted() {
        try {
            const userToken = localStorage.getItem('user-token');
            const response = await axios.get('https://fit-go-api.onrender.com/api/users', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            this.allUsers = response.data;
            this.sortUsersByDate();
            this.filteredUsers = this.allUsers;
        } catch (error) {
            console.error('There was an error!', error);
        }
    },
    methods: {
        sortUsersByDate() {
            this.allUsers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        },
        filterUsers() {
            this.filteredUsers = this.allUsers.filter((user) =>
                `${user.name} ${user.lastName}`
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase())
            );
        },
    },
};
</script>

  
<style scoped>
.user-management {
    padding: 1em;
}

.title {
    font-size: 24px;
    margin-bottom: 1em;
    text-align: left;
    color: #fff;
}

.search-box {
    width: 33%;
    /* Limit width to one third of container */
    margin-bottom: 1em;
    text-align: left;
}

.search-box input {
    width: 100%;
    padding: 0.5em;
}

.results-box {
    width: 100%;
    /* Make the box fill its container */
    height: 500px;
    /* Set a fixed height */
    overflow-y: auto;
    /* Enable vertical scrolling */
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 1em;
}

.results-box table {
    width: 100%;
    border-collapse: collapse;
}

.results-box th,
.results-box td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
    color: #fff;
    /* Set text color to white */
}

.results-box th {
    background-color: #333;
    color: #fff;
}</style>
  