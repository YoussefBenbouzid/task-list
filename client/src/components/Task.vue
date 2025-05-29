<template>
  <v-card class="border-lg rounded-xl mx-auto my-4 pa-2" color="#009688" elevation="16" max-width="300">
    <v-card-item>
      <v-card-title>
        <!-- {{ task.titolo }} -->
        Ciao
      </v-card-title>
    </v-card-item>
    <v-divider />
    <v-card-text>
      <!-- {{ task.descrizione }} -->
      Ciao
    </v-card-text>
    <v-card-text>
      <!-- Priorità: {{ task.priorita }} -->
      Ciao
    </v-card-text>
    <v-card-text>
      <!-- Data: {{ formattaData(task.data) }} -->
      Ciao
    </v-card-text>
    <v-row>
      <!-- <v-col>
        <v-btn v-if="task.salvata" class="border-md" color="#ffff00" prepend-icon @click="cambiaSalvataggioTask(task)">
          <v-icon>mdi-star-outline</v-icon>
        </v-btn>
        <v-btn v-else prepend-icon class="border-md" @click="cambiaSalvataggioTask(task)">
          <v-icon>mdi-star</v-icon>
        </v-btn>
      </v-col> -->
      <v-col>
        <v-btn class="border-md ma-1" color="#ffff00" prepend-icon>
          <v-icon>mdi-star</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn class="border-md ma-1" prepend-icon="mdi-pencil" />
      </v-col>
      <v-col>
        <v-btn class="border-md ma-1" prepend-icon="mdi-delete" @click="eliminaTask(task)" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
  import api from '@/plugins/axios.js'

  const emit = defineEmits(['salva-task-selezionato', 'elimina-task-selezionato'])

  const props = defineProps({
    task: Object,
  })

  const cambiaSalvataggioTask = async () => {
    try {
      const response = await api.put(`/task/updateSalvata/${props.task._id}`)
      emit('salva-task-selezionato', response.data)
    } catch (error) {
      console.error('Errore:', error)
    }
  }

  const eliminaTask = async () => {
    try {
      await api.delete(`/task/deleteTask/${props.task._id}`)
      emit('elimina-task-selezionato', props.task._id)
    } catch (error) {
      console.error('Errore:', error)
    }
  }

  const formattaData = iso => {
    return new Date(iso).toLocaleDateString()
  }
</script>
