<template>
  <v-app-bar color="#CBCACF">
    <v-list-item>
      <img height="40" src="@/assets/logo.svg" width="40">
    </v-list-item>
    <v-toolbar-title style="font-family: 'Lucida Handwriting'; font-weight: bold;">Task List</v-toolbar-title>
    <v-btn v-if="!isLogged" style="background-color: #190BA4; color: #FFFFFF;" class="rounded-xl" text="Accedi" @click="vaiALogin" />
    <v-btn v-if="!isLogged" style="background-color: #190BA4; color: #FFFFFF;" class="mx-12 rounded-xl" text="Registrati" @click="vaiARegister" />
    <v-btn v-if="isLogged" style="background-color: #190BA4; color: #FFFFFF;" class="mx-6 rounded-xl" prepend-icon="mdi-plus" text="Aggiungi task" @click="isDialogOpen = true" />
    <v-list-item v-if="isLogged" class="ml-6" :prepend-avatar="utente.foto" />
  </v-app-bar>

  <v-navigation-drawer elevation="6">
    <v-list-item v-if="isLogged" prepend-icon="mdi-folder" title="Le mie task" value="mieTask" />
    <v-divider />
    <v-list-item v-if="isLogged" prepend-icon="mdi-star" title="Task salvate" value="taskSalvate" />
    <v-divider />
    <v-list-item v-if="isLogged" prepend-icon="mdi-account" title="Profilo" value="Profilo" />
    <v-divider />
    <v-list-item v-if="isLogged" prepend-icon="mdi-logout" title="Esci" value="logout" @click="logout" />
    <v-divider />
  </v-navigation-drawer>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function vaiALogin() {
    router.push('/Login')
  }

  function vaiARegister() {
    router.push('/Register')
  }

  const isLogged = ref(true)

  const utente = {
    nomeUtente: "Lydia Serena Benbouzid",
    email: "lydia.serena.benbouzid@email.com",
    password: "passwordLydia",
    foto: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
  }
</script>
