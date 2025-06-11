<template>
  <div class="ma-6 w-100">
    <v-toolbar class="mx-16 rounded-lg" floating>
      <div class="px-4">
        <v-text-field v-model="filtro" density="compact" flat hide-details placeholder="Cerca task" prepend-inner-icon="mdi-magnify" single-line variant="solo" width="800" />
      </div>
    </v-toolbar>

    <v-row class="ma-6 w-75">
      <v-col v-for="(task, i) in taskFiltrati" :key="i" cols="12" lg="3" md="4">
        <Task :task="task" @task-eliminato="rimuoviTask" @task-flaggato="aggiornaTask" @task-modificato="aggiornaTask" />
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
  const mostraSoloTaskSalvate = ref(false)

  const taskFiltrati = computed(() => {
    let tasks = arrayTask.value
    if (mostraSoloTaskSalvate.value) {
      tasks = tasks.filter(task => task.salvata === true)
    }
    if (filtro.value) {
      tasks = tasks.filter(task =>
        task.titolo.toLowerCase().includes(filtro.value.toLowerCase()) ||
        task.descrizione.toLowerCase().includes(filtro.value.toLowerCase())
      )
    }
    return tasks
  })

  function resetFiltro () {
    filtro.value = ''
  }

  function mostraTaskTutte () {
    mostraSoloTaskSalvate.value = false
    resetFiltro()
    caricaTask()
  }

  function mostraTaskSalvate () {
    mostraSoloTaskSalvate.value = true
    resetFiltro()
    caricaTask()
  }

  const caricaTask = async () => {
    try {
      const utenteId = localStorage.getItem('utenteId')
      const response = await api.get(`/task/getTasksByUtente/${utenteId}`)
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

  defineExpose({ caricaTask, mostraTaskTutte, mostraTaskSalvate })

  onMounted(() => {
    caricaTask()
  })
</script>
