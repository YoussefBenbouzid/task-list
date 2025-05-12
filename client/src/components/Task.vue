<template>
  <v-card class="mx-auto my-8" color="#009688" elevation="16" max-width="344">
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
      Priorità: {{ task.priorita }}
    </v-card-text>

    <v-card-text>
      Data: {{ formattaData(task.data) }}
    </v-card-text>

    <v-container>
      <v-row>
        <v-col>
          <v-btn v-if="task.salvata" color="yellow" prepend-icon @click="cambiaSalvataggioTask(task)">
            <v-icon>mdi-star</v-icon>
          </v-btn>
          <v-btn v-else prepend-icon @click="cambiaSalvataggioTask(task)">
            <v-icon>mdi-star-outline</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <v-btn prepend-icon="mdi-pencil" />
        </v-col>
        <v-col>
          <v-btn prepend-icon="mdi-delete" @click="deleteTask(task)" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
  import apiTask from '@/utils/AxiosTask'

  const emit = defineEmits(['salvata-toggled', 'delete-toggled'])

  const props = defineProps({
    task: Object,
  })

  const cambiaSalvataggioTask = async () => {
    try {
      const response = await apiTask.put(`/updateSalvata/${props.task._id}`)
      emit('salvata-toggled', response.data)
    } catch (error) {
      console.error('Errore:', error)
    }
  }

  const deleteTask = async () => {
    try {
      await apiTask.delete(`/deleteTask/${props.task._id}`)
      emit('delete-toggled', props.task._id)
    } catch (error) {
      console.error('Errore:', error)
    }
  }

  const formattaData = iso => {
    return new Date(iso).toLocaleDateString()
  }

</script>
