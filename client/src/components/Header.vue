<template>
  <v-app-bar color="#cbcacf" height="100">
    <v-list-item @click="mostraTaskTutte">
      <img height="60" src="@/assets/logo.svg" width="60">
    </v-list-item>
    <v-toolbar-title style="font-family: 'Lucida Handwriting'; font-weight: bold;">Task List</v-toolbar-title>
    <AggiungiTask @task-aggiunta="taskAggiunta" />
    <v-list-item class="ml-6 immagine-profilo" :prepend-avatar="foto" @click.stop="drawer=!drawer" />
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" elevation="6" location="right" temporary>
    <v-list-item class="selezione-sidebar" prepend-icon="mdi-calendar-check" title="Le mie task" @click="mostraTaskTutte" />
    <v-list-item class="selezione-sidebar" prepend-icon="mdi-star" title="Task salvate" @click="mostraTaskSalvate" />
    <v-list-item class="selezione-sidebar" prepend-icon="mdi-account" title="Profilo" @click="vaiASezioneProfilo" />
    <v-dialog v-model="isDialogLogoutOpen" max-width="500">
      <template #activator="{ props }">
        <v-list-item class="selezione-sidebar" prepend-icon="mdi-logout" title="Esci" v-bind="props" />
      </template>
      <v-card>
        <v-card-title class="text-h6">Esci</v-card-title>
        <v-card-text>Confermi di voler uscire?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="logout(); isDialogLogoutOpen=false">Esci</v-btn>
          <v-btn @click="isDialogLogoutOpen=false">Annulla</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  const isDialogLogoutOpen = ref(false)

  const emit = defineEmits(['cambia-pagina', 'task-aggiunta', 'mostra-task-tutte', 'mostra-task-salvate'])

  const caricaDatiUtente = () => {
    foto.value = localStorage.getItem('foto')
  }

  function logout () {
    localStorage.clear()
    router.push('/login')
  }

  function vaiASezioneProfilo () {
    emit('cambia-pagina', 'SezioneProfilo')
  }

  function taskAggiunta () {
    emit('cambia-pagina', 'ListaTask')
    emit('task-aggiunta')
  }

  function mostraTaskTutte () {
    emit('cambia-pagina', 'ListaTask')
    emit('mostra-task-tutte')
  }

  function mostraTaskSalvate () {
    emit('cambia-pagina', 'ListaTask')
    emit('mostra-task-salvate')
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
