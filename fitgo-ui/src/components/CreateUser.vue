<template>
    <div class="user-creation-page">
        <h1 class="title">Crear usuario</h1>
        <form @submit.prevent="createUser">
            <div class="form-group grid-container">
                <div>
                    <label for="name">Nombre:</label>
                    <input type="text" id="name" v-model="user.name" required />

                    <label for="lastName">Apellido:</label>
                    <input type="text" id="lastName" v-model="user.lastName" required />

                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="user.email" required />

                    <label for="phone">Teléfono:</label>
                    <input type="text" id="phone" v-model="user.phone" required />
                </div>
                <div>
                    <label for="personalId">Documento:</label>
                    <input type="text" id="personalId" v-model="user.personalId" required />

                    <label for="roles">Roles</label>
                    <select id="roles" v-model="user.roles" multiple>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <div class="form-group">
                        <label for="password">Contraseña:</label>
                        <input type="password" id="password" v-model="user.password" required />
                    </div>

                    <div class="form-group">
                        <label for="passwordConfirmation">Confirme la contraseña:</label>
                        <input type="password" id="passwordConfirmation" v-model="passwordConfirmation" required />
                    </div>

                </div>
            </div>
            <div class="button-group">
                <button type="submit" class="action-button">Guardar</button>
                <button type="button" @click="goBack" class="action-button cancel-button">Cancelar</button>
            </div>
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
                email: '',
                phone: '',
                personalId: '',
                password: '',
                roles: [],
            },
        };
    },
    methods: {
        goBack() {
            this.$router.push('/user-management');
        },
        async createUser() {
            if (this.user.password !== this.passwordConfirmation) {
                window.alert('La confirmación de la contraseña no coincide con la contraseña ingresada.');
                return;
            }

            try {
                const userToken = localStorage.getItem('user-token');
                const response = await axios.post('https://fit-go-api.onrender.com/api/users/register', this.user, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                if (response.status === 200 || response.status === 201) {
                    window.alert("Usuario creado exitosamente!");
                    this.$router.push('/user-management');
                } else {
                    window.alert("Hubo un error al crear el usuario.");
                }
            } catch (error) {
                console.error('There was an error!', error);
                window.alert("Hubo un error al crear el usuario.");
            }
        },
    },
};
</script>
  
<style scoped>
.user-creation-page {
    padding: 1em;
}

.title {
    font-size: 24px;
    margin-bottom: 1em;
    text-align: left;
    color: #fff;
}

.form-group {
    margin-bottom: 1em;
}

.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
    /* Increase gap between columns */
}

.form-group label {
    display: block;
    margin-bottom: 0.5em;
    color: #fff;
    text-align: left;
    /* Align labels to the left */
}

.form-group input,
.form-group select {
    width: 75%;
    display: flex;
    padding: 0.3em;
    /* Make input fields shorter */
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 1px;
    margin-bottom: 1.5em;
    /* Add padding above each field */
}

.form-group select {
    height: 4em;
}

.action-button {
    display: inline-block;
    padding: 0.5em 1em;
    border: none;
    border-radius: 5px;
    background-color: #555;
    color: #fff;
    text-decoration: none;
    text-align: center;
    line-height: 1.2;
    cursor: pointer;
    height: 40px;
    /* specify a fixed height */
    font-size: 16px;
    /* ensure same font size */
}

/* Specific styles to override default styles of <a> tag */
.action-button:visited {
    color: #fff;
}

.action-button:active {
    color: #fff;
}



.action-button:hover {
    background-color: #333;
}

.button-group {
    display: flex;
    justify-content: space-between;
    /* align horizontally */
    align-items: center;
    /* align vertically */
    width: 200px;
    /* double the width of a single button + desired space between buttons */
    margin-top: 20px;
    /* spacing from the form elements above */
}

.cancel-button {
    background-color: #ff0000;
}
</style>
