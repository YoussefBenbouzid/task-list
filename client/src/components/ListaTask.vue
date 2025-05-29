<template>
  <v-row class="ma-6 w-75">
    <v-col v-for="(task, i) in arrayTask" :key="i" cols="12" md="4" lg="3">
      <!-- <Task :task="task" @elimina-task-selezionato="eliminaTask" @salva-task-selezionato="salvaTask" /> -->
      <Task />
    </v-col>
  </v-row>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import api from '@/plugins/axios.js'
  import Task from '@/components/Task.vue'

  const arrayTask = ref([])

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

  const eliminaTask = taskId => {
    task.value = arrayTask.value.filter(task => task._id !== taskId)
  }

  const salvaTask = taskSalvata => {
    const i = tasks.value.findIndex(task => task._id === taskSalvata._id)
    if(i!== -1) {
      arrayTask.value[index] = taskSalvata
    }
  }

  onMounted(() => {
    caricaTask()
  })


  arrayTask.value= [{
                      _id: '6819b72502300e034628fbe2',
                      titolo: 'Comprare il latte',
                      descrizione: 'Non dimenticare di comprare il latte al supermercato.',
                      priorita: 5,
                      data: '2025-04-30T00:00:00.000Z',
                      utenteId: '6818a3bffb2c1e52a3eeb2ea',
                      salvata: true,
                    },
                    {
                      _id: '6819b72502300e034628fbe2',
                      titolo: 'Comprare il latte',
                      descrizione: 'Non dimenticare di comprare il latte al supermercato.',
                      priorita: 5,
                      data: '2025-04-30T00:00:00.000Z',
                      utenteId: '6818a3bffb2c1e52a3eeb2ea',
                      salvata: true,
                    },
                    {
                      _id: '6819b72502300e034628fbe2',
                      titolo: 'Comprare il latte',
                      descrizione: 'Non dimenticare di comprare il latte al supermercato.',
                      priorita: 5,
                      data: '2025-04-30T00:00:00.000Z',
                      utenteId: '6818a3bffb2c1e52a3eeb2ea',
                      salvata: true,
                    },
                    {
                      _id: '6819b72502300e034628fbe2',
                      titolo: 'Comprare il latte',
                      descrizione: 'Non dimenticare di comprare il latte al supermercato.',
                      priorita: 5,
                      data: '2025-04-30T00:00:00.000Z',
                      utenteId: '6818a3bffb2c1e52a3eeb2ea',
                      salvata: true,
                    },
                    {
                      _id: '6819b72502300e034628fbe2',
                      titolo: 'Comprare il latte',
                      descrizione: 'Non dimenticare di comprare il latte al supermercato.',
                      priorita: 5,
                      data: '2025-04-30T00:00:00.000Z',
                      utenteId: '6818a3bffb2c1e52a3eeb2ea',
                      salvata: true,
                    },
                    {
                      _id: '6819b72502300e034628fbe2',
                      titolo: 'Comprare il latte',
                      descrizione: 'Non dimenticare di comprare il latte al supermercato.',
                      priorita: 5,
                      data: '2025-04-30T00:00:00.000Z',
                      utenteId: '6818a3bffb2c1e52a3eeb2ea',
                      salvata: true,
                    },
                    {
                      _id: '6819b72502300e034628fbe2',
                      titolo: 'Comprare il latte',
                      descrizione: 'Non dimenticare di comprare il latte al supermercato.',
                      priorita: 5,
                      data: '2025-04-30T00:00:00.000Z',
                      utenteId: '6818a3bffb2c1e52a3eeb2ea',
                      salvata: true,
                    },
                    {
                      _id: '6819b72502300e034628fbe2',
                      titolo: 'Comprare il latte',
                      descrizione: 'Non dimenticare di comprare il latte al supermercato.',
                      priorita: 5,
                      data: '2025-04-30T00:00:00.000Z',
                      utenteId: '6818a3bffb2c1e52a3eeb2ea',
                      salvata: true,
                    },
                    {
                      _id: '6819b72502300e034628fbe2',
                      titolo: 'Comprare il latte',
                      descrizione: 'Non dimenticare di comprare il latte al supermercato.',
                      priorita: 5,
                      data: '2025-04-30T00:00:00.000Z',
                      utenteId: '6818a3bffb2c1e52a3eeb2ea',
                      salvata: true,
                    },
                    {
                      _id: '6819b72502300e034628fbe2',
                      titolo: 'Comprare il latte',
                      descrizione: 'Non dimenticare di comprare il latte al supermercato.',
                      priorita: 5,
                      data: '2025-04-30T00:00:00.000Z',
                      utenteId: '6818a3bffb2c1e52a3eeb2ea',
                      salvata: true,
                    },
                    {
                      _id: '6819b72502300e034628fbe2',
                      titolo: 'Comprare il latte',
                      descrizione: 'Non dimenticare di comprare il latte al supermercato.',
                      priorita: 5,
                      data: '2025-04-30T00:00:00.000Z',
                      utenteId: '6818a3bffb2c1e52a3eeb2ea',
                      salvata: true,
                    },
                    {
                      _id: '6819b72502300e034628fbe2',
                      titolo: 'Comprare il latte',
                      descrizione: 'Non dimenticare di comprare il latte al supermercato.',
                      priorita: 5,
                      data: '2025-04-30T00:00:00.000Z',
                      utenteId: '6818a3bffb2c1e52a3eeb2ea',
                      salvata: true,
                    }, 
  ]






  
</script>
