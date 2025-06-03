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
      <!-- Flagga task -->
      <v-col class="d-flex justify-center" cols="4">
        <v-btn v-if="task.salvata" class="border-md" color="#ffff00" prepend-icon="mdi-star" @click="flaggaTask(task)" />
        <v-btn v-else class="border-md" prepend-icon="mdi-star-outline" @click="flaggaTask(task)" />
      </v-col>
      <!-- Modifica task -->
      <v-col>
        <v-dialog max-width="500" :model-value="isDialogOpen" @update:model-value="isDialogOpen = $event">
          <template #activator="{ props }">
            <v-btn v-bind="props" class="border-md ma-1" prepend-icon="mdi-pencil" @click="isDialogOpen = true" />
          </template>
          <v-card class="border-md rounded-lg pa-4">
            <v-btn color="#e32a20" style="position: absolute; top: 0; right: 0;" text="X" @click="chiudiForm" />
            <span class="font-weight-bold text-h5 text-center ma-2">Modifica task</span>
            <v-form ref="form" @submit.prevent="modificaTask">
              <v-text-field v-model="titoloNuovo" label="Nuovo titolo" :rules="rules.titoloNuovo" />
              <v-text-field v-model="descrizioneNuova" label="Nuova descrizione" :rules="rules.descrizioneNuova" />
              <div class="d-flex justify-center mb-4">
                <v-date-picker v-model="dataNuova" class="border" label="Nuova data" locale="it" />
              </div>
              <v-text-field v-model="prioritaNuova" label="Nuova priorità" :rules="rules.prioritaNuova" />
              <v-btn block type="submit">Modifica task</v-btn>
            </v-form>
          </v-card>
        </v-dialog>
      </v-col>
      <!-- Elimina task -->
      <v-col>
        <v-btn class="border-md ma-1" prepend-icon="mdi-delete" @click="eliminaTask" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'
  import { useNotification } from '@kyvg/vue3-notification'
  import api from '@/plugins/axios.js'

  const { notify } = useNotification()

  const emit = defineEmits(['task-flaggato', 'task-eliminato'])

  const props = defineProps({
    task: Object,
  })

  const isDialogOpen = ref(false)
  const form = ref()
  const titoloNuovo = ref('')
  const descrizioneNuova = ref('')
  const dataNuova = ref('')
  const prioritaNuova = ref(1)

  const rules = {
    titoloNuovo: [
      v => !v || v.length >= 3 || 'Il titolo deve avere almeno tre caratteri',
    ],
    descrizioneNuova: [
      v => !v || v.length >= 3 || 'La descrizione deve avere almeno tre caratteri',
    ],
    prioritaNuova: [
      v => !v || (v >= 1 && v <= 9) || 'La priorità deve essere un numero compreso tra 1 e 9',
    ],
  }

  function chiudiForm () {
    titoloNuovo.value = ''
    descrizioneNuova.value = ''
    dataNuova.value = ''
    prioritaNuova.value = 1
    isDialogOpen.value = false
  }

  const flaggaTask = async () => {
    try {
      const response = await api.put(`/task/updateSalvata/${props.task._id}`)
      emit('task-flaggato', response.data)
    } catch (error) {
      console.error('Errore:', error)
    }
  }

  const modificaTask = async () => {
    const { valid } = await form.value.validate()
    if (valid) {
      try {
        await api.put(`/task/updateTask/${props.task._id}`, {
          titolo: titoloNuovo.value,
          descrizione: descrizioneNuova.value,
          data: dataNuova.value,
          priorita: prioritaNuova.value,
        })

        notify({
          title: 'Task modificata!',
          type: 'success',
        })

        chiudiForm()
      } catch(error) {
        notify({
          title: 'Modifica task fallita!',
          type: 'error',
        })
        console.error('Errore:', error)
      }
    } else {
      notify({
        title: 'Modifica task non effettuata',
        text: 'Campi non compilati correttamente',
        type: 'warn',
      })
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
