<template>
  <v-app-bar color="#cbcacf" height="100">
    <v-list-item @click="cambiaPagina('ListaTask')">
      <img height="60" src="@/assets/logo.svg" width="60">
    </v-list-item>
    <v-toolbar-title style="font-family: 'Lucida Handwriting'; font-weight: bold;">Task List</v-toolbar-title>
    <AggiungiTask @task-aggiunta="taskAggiunta" />
    <v-list-item class="ml-6 immagine-profilo" :prepend-avatar="foto" @click.stop="drawer=!drawer" />
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" elevation="6" location="right" temporary>
    <v-list-item class="selezione-sidebar" prepend-icon="mdi-calendar-check" title="Le mie task" value="mieTask" @click="cambiaPagina('ListaTask')" />
    <v-list-item class="selezione-sidebar" prepend-icon="mdi-star" title="Task salvate" value="taskSalvate" @click="cambiaPagina('ListaTask')" />
    <v-list-item class="selezione-sidebar" prepend-icon="mdi-account" title="Profilo" value="profilo" @click="cambiaPagina('SezioneProfilo')" />
    <v-list-item class="selezione-sidebar" prepend-icon="mdi-logout" title="Esci" value="logout" @click="logout" />
  </v-navigation-drawer>
</template>

<script setup>
  import AggiungiTask from '@/components/AggiungiTask.vue'
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import api from '@/plugins/axios.js'

  const router = useRouter()
  const drawer = ref(null)
  const foto = ref('')

  const emit = defineEmits(['cambia-pagina', 'task-aggiunta'])

  const caricaDatiUtente = () => {
    foto.value = localStorage.getItem('foto')
  }

  function cambiaPagina (pagina) {
    emit('cambia-pagina', pagina)
  }

  function taskAggiunta () {
    emit('task-aggiunta')
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

    router.push('/login')
  }

  onMounted(() => {
    caricaDatiUtente()
  })
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
