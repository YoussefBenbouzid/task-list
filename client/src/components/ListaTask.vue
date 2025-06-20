<template>
  <div class="ma-6 w-100">
    <v-toolbar class="mx-16 rounded-lg" floating>
      <div class="px-4">
        <v-text-field v-model="filtro" density="compact" flat hide-details placeholder="Cerca task" prepend-inner-icon="mdi-magnify" single-line variant="solo" width="800" />
      </div>
    </v-toolbar>

    <v-row class="ma-6 w-75">
      <v-col v-for="(task, i) in taskFiltrati" :key="i" cols="12" lg="3" md="4">
        <Task :task="task" @task-modificata="aggiornaTask" @task-eliminata="rimuoviTask" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import Task from '@/components/Task.vue'
  import api from '@/plugins/axios.js'
  import { getDatiUtente } from '@/plugins/getDatiUtente.js'

  const router = useRouter()

  const arrayTask = ref([])
  const filtro = ref('')
  const mostraSoloTaskSalvate = ref(false)
  const datiUtente = getDatiUtente() || {}
  if (!datiUtente) {
    router.push('/login')
  }
  const utenteId = datiUtente.utenteId

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

  const resetFiltro = () => {
    filtro.value = ''
  }

  const mostraTaskTutte = () => {
    mostraSoloTaskSalvate.value = false
    resetFiltro()
    caricaTask()
  }

  const mostraTaskSalvate = () => {
    mostraSoloTaskSalvate.value = true
    resetFiltro()
    caricaTask()
  }

  const caricaTask = async () => {
    try {
      const response = await api.get(`/task/getTasksByUtente/${utenteId}`)
      arrayTask.value = response.data
    } catch (error) {
      console.error('Errore:', error)
    }
  }

  const aggiornaTask = updatedTask => {
    const index = arrayTask.value.findIndex(task => task._id === updatedTask._id)
    if (index !== -1) {
      arrayTask.value[index] = updatedTask
    }
  }

  const rimuoviTask = taskId => {
    arrayTask.value = arrayTask.value.filter(task => task._id !== taskId)
  }

  defineExpose({ caricaTask, mostraTaskTutte, mostraTaskSalvate })

  onMounted(() => {
    caricaTask()
  })
</script>
