<template>
  <Header @cambia-pagina="sezioneInHome = $event" @task-aggiunta="taskAggiunta" />
  <ListaTask v-if="sezioneInHome==='ListaTask'" ref="listaTaskRef" />
  <SezioneProfilo v-else-if="sezioneInHome==='SezioneProfilo'" />
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import Header from '@/components/Header.vue'
  import ListaTask from '@/components/ListaTask.vue'
  import SezioneProfilo from '@/components/SezioneProfilo.vue'
  import router from '@/router'

  const sezioneInHome = ref('ListaTask')
  const listaTaskRef = ref(null)

  const taskAggiunta = () => {
    listaTaskRef.value?.caricaTask()
  }

  onMounted(() => {
    const token = localStorage.getItem('token')
    if(!token) {
      router.push('/login')
    }
  })
</script>
