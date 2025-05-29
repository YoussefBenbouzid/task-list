<template>
  <Header @cambiaPagina="sezioneInHome = $event" />
  <ListaTask v-if="sezioneInHome === 'ListaTask'" />
  <SezioneProfilo v-else-if="sezioneInHome === 'SezioneProfilo'" />
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import Header from '@/components/Header.vue'
  import ListaTask from '@/components/ListaTask.vue'
  import SezioneProfilo from '@/components/SezioneProfilo.vue'

  const utenteLoggato = ref(false)
  const sezioneInHome = ref('ListaTask')

  onMounted(() => {
    const token = localStorage.getItem('token')
    if(token) {
      utenteLoggato.value = true
    }
  })
</script>
