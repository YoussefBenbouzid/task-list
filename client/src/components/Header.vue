<template>
  <v-app-bar color="#CBCACF" height="100">
    <v-list-item @click="vaiAHome">
      <img height="40" src="@/assets/logo.svg" width="40">
    </v-list-item>
    <v-toolbar-title style="font-family: 'Lucida Handwriting'; font-weight: bold;">Task List</v-toolbar-title>
    <v-btn v-if="!isLogged" class="rounded-xl selezione-navbar" text="Accedi" @click="vaiALogin" />
    <v-btn v-if="!isLogged" class="mx-12 rounded-xl selezione-navbar" text="Registrati" @click="vaiARegister" />
    <v-btn v-if="isLogged" class="mx-6 rounded-xl selezione-navbar" prepend-icon="mdi-plus" text="Aggiungi task" />
    <v-list-item v-if="isLogged" class="ml-6 immagine-profilo" :prepend-avatar="utente.foto" @click.stop="drawer = !drawer" />
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="right" temporary elevation="6">
    <v-list-item v-if="isLogged" class="selezione-sidebar">
      <v-list-item prepend-icon="mdi-folder" title="Mie task" value="mieTask" />
    </v-list-item>
    <v-divider />
    <v-list-item v-if="isLogged" class="selezione-sidebar">
      <v-list-item prepend-icon="mdi-star" title="Task salvate" value="taskSalvate" />
    </v-list-item>
    <v-divider />
    <v-list-item v-if="isLogged" class="selezione-sidebar">
      <v-list-item prepend-icon="mdi-account" title="Profilo" value="Profilo" @click="vaiAProfilo" />
    </v-list-item>
    <v-divider />
    <v-list-item v-if="isLogged" class="selezione-sidebar">
      <v-list-item prepend-icon="mdi-logout" title="Esci" value="logout" @click="logout" />
    </v-list-item>
    <v-divider />
  </v-navigation-drawer>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import api from '@/plugins/axios.js'

  const router = useRouter()

  const drawer = ref(null)

  function vaiAHome () {
    router.push('/')
  }

  function vaiALogin () {
    router.push('/Profilo')
  }

  function vaiARegister () {
    router.push('/Register')
  }

  function vaiAProfilo () {
    router.push('/Profilo')
  }

  const logout = async () => {
    try {
      await api.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    } catch (error) {
      console.error('Errore:', error)
    }

    localStorage.clear()

    router.push('/')
  }

  const isLogged = ref(true) // Test

  const utente = { // Test
    nomeUtente: 'Lydia Serena Benbouzid',
    email: 'lydia.serena.benbouzid@email.com',
    password: 'passwordLydia',
    foto: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
  }
</script>

<style scoped>
  .selezione-navbar {
    background-color: #190BA4;
    color: #FFFFFF;
  }

  .selezione-sidebar:hover {
    background-color: #190BA4;
    color: #FFFFFF;
    cursor: pointer;
  }

  #immagine-profilo {
    transform: translate(50px,50px);
  }
</style>
