<template>
  <div class="ma-6 w-100">
    <v-toolbar class="mx-16 rounded-lg" floating>
      <div class="px-4">
        <v-text-field v-model="filtro" density="compact" placeholder="Cerca task" prepend-inner-icon="mdi-magnify" variant="solo" width="800" flat hide-details single-line />
      </div>
    </v-toolbar>

    <v-row class="ma-6 w-75">
      <v-col v-for="(task, i) in taskFiltrati" :key="i" cols="12" md="4" lg="3">
        <Task :task="task" @task-flaggato="aggiornaTask" @task-modificato="aggiornaTask" @task-eliminato="rimuoviTask" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import api from '@/plugins/axios.js'
  import Task from '@/components/Task.vue'

  const arrayTask = ref([])
  const filtro = ref('')

  const taskFiltrati = computed(() => {
    if (!filtro.value) {
      return arrayTask.value
    }
    return arrayTask.value.filter(task =>
      task.titolo.toLowerCase().includes(filtro.value.toLowerCase()) ||
      task.descrizione.toLowerCase().includes(filtro.value.toLowerCase())
    )
  })

  const caricaTask = async () => {
    try {
      const token = localStorage.getItem('token')
      const utenteId = localStorage.getItem('utenteId')
      const response = await api.get(`/task/getTasksByUtente/${utenteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      arrayTask.value = response.data
    } catch (error) {
      console.error('Errore:', error)
    }
  }

  const rimuoviTask = taskId => {
    arrayTask.value = arrayTask.value.filter(task => task._id !== taskId)
  }

  const aggiornaTask = updatedTask => {
    const index = arrayTask.value.findIndex(task => task._id === updatedTask._id)
    if (index !== -1) {
      arrayTask.value[index] = updatedTask
    }
  }

  defineExpose({ caricaTask })

  onMounted(() => {
    caricaTask()
  })
</script>
