<template>
  <v-app-bar color="#cbcacf" height="100">
    <v-list-item @click="$emit('cambiaPagina', 'ListaTask')">
      <img height="60" src="@/assets/logo.svg" width="60">
    </v-list-item>
    <v-toolbar-title style="font-family: 'Lucida Handwriting'; font-weight: bold;">Task List</v-toolbar-title>
    <v-btn v-if="!utenteLoggato" class="rounded-xl selezione-navbar" text="Accedi" @click="vaiALogin" />
    <v-btn v-if="!utenteLoggato" class="mx-12 rounded-xl selezione-navbar" text="Registrati" @click="vaiARegister" />
    <AggiungiTask v-if="utenteLoggato" />
    <v-list-item v-if="utenteLoggato" class="ml-6 immagine-profilo" :prepend-avatar="utente.foto" @click.stop="drawer = !drawer" />
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="right" temporary elevation="6">
    <v-list-item v-if="utenteLoggato" class="selezione-sidebar">
      <v-list-item prepend-icon="mdi-calendar-check" title="Le mie task" value="mieTask" @click="$emit('cambiaPagina', 'ListaTask')" />
    </v-list-item>
    <v-list-item v-if="utenteLoggato" class="selezione-sidebar">
      <v-list-item prepend-icon="mdi-star" title="Task salvate" value="taskSalvate" @click="$emit('cambiaPagina', 'ListaTask')" />
    </v-list-item>
    <v-list-item v-if="utenteLoggato" class="selezione-sidebar">
      <v-list-item prepend-icon="mdi-account" title="Profilo" value="profilo" @click="$emit('cambiaPagina', 'SezioneProfilo')" />
    </v-list-item>
    <v-list-item v-if="utenteLoggato" class="selezione-sidebar">
      <v-list-item prepend-icon="mdi-logout" title="Esci" value="logout" @click="logout" />
    </v-list-item>
  </v-navigation-drawer>
</template>

<script setup>
  import AggiungiTask from '@/components/AggiungiTask.vue'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import api from '@/plugins/axios.js'

  const router = useRouter()
  const drawer = ref(null)

  const emit = defineEmits(['cambiaPagina'])

  function vaiALogin () {
    router.push('/Login')
  }

  function vaiARegister () {
    router.push('/Register')
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

    emit('cambiaPagina', 'ListaTask')
  }

  const utenteLoggato = ref(true) // Test

  const utente = { // Test
    nomeUtente: 'Lydia Serena Benbouzid',
    email: 'lydia.serena.benbouzid@email.com',
    password: 'passwordLydia',
    foto: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
  }
</script>

<style scoped>
  .selezione-navbar {
    background-color: #190ba4;
    color: #ffffff;
  }

  .selezione-sidebar:hover {
    background-color: #190ba4;
    color: #ffffff;
    cursor: pointer;
  }

  #immagine-profilo {
    transform: translate(50px,50px);
  }
</style>
