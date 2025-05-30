<template>
  <v-card class="border-lg rounded-xl mx-auto my-4 pa-2" color="#009688" elevation="16" max-width="300">
    <v-card-item>
      <v-card-title>
        {{ task.titolo }}
      </v-card-title>
    </v-card-item>
    <v-divider />
    <v-card-text>
      {{ task.descrizione }}
    </v-card-text>
    <v-card-text>
      <span class="font-weight-bold">Priorità:</span> {{ task.priorita }}
    </v-card-text>
    <v-card-text>
      <span class="font-weight-bold">Data:</span> {{ formattaData(task.data) }}
    </v-card-text>
    <v-row>
      <v-col>
        <v-btn v-if="task.salvata" class="border-md" color="#ffff00" prepend-icon="mdi-star" @click="flaggaTask(task)" />
        <v-btn v-else class="border-md" prepend-icon="mdi-star-outline" @click="flaggaTask(task)" />
      </v-col>
      <v-col>
        <v-btn class="border-md ma-1" prepend-icon="mdi-pencil" />
      </v-col>
      <v-col>
        <v-btn class="border-md ma-1" prepend-icon="mdi-delete" @click="eliminaTask" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
  import api from '@/plugins/axios.js'

  const emit = defineEmits(['task-flaggato', 'task-eliminato'])

  const props = defineProps({
    task: Object,
  })

  const flaggaTask = async () => {
    try {
      const response = await api.put(`/task/updateSalvata/${props.task._id}`)
      emit('task-flaggato', response.data)
    } catch (error) {
      console.error('Errore:', error)
    }
  }

  const eliminaTask = async () => {
    try {
      await api.delete(`/task/deleteTask/${props.task._id}`)
      emit('task-eliminato', props.task._id)
    } catch (error) {
      console.error('Errore:', error)
    }
  }

  const formattaData = iso => {
    return new Date(iso).toLocaleDateString()
  }
</script>
