<template>
  <v-row>
    <v-col
      v-for="(task, index) in tasks"
      :key="index"
      cols="3"
    >
      <Task :task="task" @delete-toggled="rimuoviTask" @salvata-toggled="aggiornaTask" />
    </v-col>
  </v-row>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import api from '@/utils/AxiosTask.js'
  import Task from '@/components/Task.vue'

  const tasks = ref([])

  const caricaTask = async () => {
    try {
      const token = localStorage.getItem('token')
      const utenteId = localStorage.getItem('utenteId')
      const response = await api.get(`/getTasksByUtente/${utenteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      tasks.value = response.data
    } catch (error) {
      console.error('Errore:', error)
    }
  }

  const rimuoviTask = taskId => {
    tasks.value = tasks.value.filter(task => task._id !== taskId)
  }

  const aggiornaTask = updatedTask => {
    const index = tasks.value.findIndex(task => task._id === updatedTask._id)
    if (index !== -1) {
      tasks.value[index] = updatedTask
    }
  }

  defineExpose({ caricaTask })

  onMounted(() => {
    caricaTask()
  })

</script>
