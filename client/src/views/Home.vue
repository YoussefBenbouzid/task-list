<template>
  <Header @cambia-pagina="sezioneInHome = $event" @task-aggiunta="taskAggiunta" @mostra-task-tutte="mostraTaskTutte" @mostra-task-salvate="mostraTaskSalvate" />
  <ListaTask v-if="sezioneInHome==='ListaTask'" ref="listaTaskRef" />
  <SezioneProfilo v-else-if="sezioneInHome==='SezioneProfilo'" />
</template>

<script setup>
  import { nextTick, onMounted, ref } from 'vue'
  import Header from '@/components/Header.vue'
  import ListaTask from '@/components/ListaTask.vue'
  import SezioneProfilo from '@/components/SezioneProfilo.vue'
  import router from '@/router'

  const sezioneInHome = ref('ListaTask')
  const listaTaskRef = ref(null)

  const taskAggiunta = async () => {
    sezioneInHome.value = 'ListaTask'
    await nextTick()
    listaTaskRef.value.caricaTask()
  }

  const mostraTaskTutte = async () => {
    sezioneInHome.value = 'ListaTask'
    await nextTick()
    listaTaskRef.value.mostraTaskTutte()
  }

  const mostraTaskSalvate = async () => {
    sezioneInHome.value = 'ListaTask'
    await nextTick()
    listaTaskRef.value.mostraTaskSalvate()
  }

  onMounted(() => {
    const token = localStorage.getItem('token')
    if(!token) {
      router.push('/login')
    }
  })
</script>
