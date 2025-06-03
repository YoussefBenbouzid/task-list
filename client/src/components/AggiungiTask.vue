<template>
  <v-dialog max-width="500" :model-value="isDialogOpen" @update:model-value="isDialogOpen = $event">
    <template #activator="{ props }">
      <v-btn v-bind="props" class="mx-6 rounded-xl selezione-navbar" prepend-icon="mdi-plus" text="Aggiungi task" @click="isDialogOpen = true" />
    </template>
    <v-card class="border-md rounded-lg pa-4">
      <v-btn color="#e32a20" style="position: absolute; top: 0; right: 0;" text="X" @click="chiudiForm" />
      <span class="font-weight-bold text-h5 text-center ma-2">Aggiungi task</span>
      <v-form ref="form" @submit.prevent="aggiungiTask">
        <v-text-field v-model="titolo" label="Titolo" :rules="rules.titolo" />
        <v-text-field v-model="descrizione" label="Descrizione" :rules="rules.descrizione" />
        <div class="d-flex justify-center mb-4">
          <v-date-picker v-model="data" class="border" label="Data" locale="it" />
        </div>
        <v-text-field v-model="priorita" label="Priorità" :rules="rules.priorita" />
        <v-btn block type="submit">Aggiungi task</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { ref } from 'vue'
  import { useNotification } from '@kyvg/vue3-notification'
  import api from '@/plugins/axios.js'

  const { notify } = useNotification()

  const form = ref()
  const isDialogOpen = ref(false)
  const titolo = ref('')
  const descrizione = ref('')
  const data = ref('')
  const priorita = ref(0)
  const salvata = ref(false)
  const utenteId = localStorage.getItem('utenteId')

  const rules = {
    titolo: [
      v => !!v || 'Campo obbligatorio',
      v => v.length >= 3 || 'Il titolo deve avere almeno tre caratteri',
    ],
    descrizione: [
      v => !!v || 'Campo obbligatorio',
      v => v.length >= 3 || 'La descrizione deve avere almeno tre caratteri',
    ],
    priorita: [
      v => !!v || 'Campo obbligatorio',
      v => (v >= 1 && v <= 9) || 'La priorità deve essere un numero compreso tra 1 e 9',
    ]
  }

  function chiudiForm() {
    titolo.value = ''
    descrizione.value = ''
    data.value = ''
    priorita.value = 0
    isDialogOpen.value = false
  }

  const aggiungiTask = async () => {
    const { valid } = await form.value.validate()
    if (valid) {
      try {
        await api.post('/task/createTask', {
          titolo: titolo.value,
          descrizione: descrizione.value,
          data: data.value,
          priorita: priorita.value,
          salvata: salvata.value,
          utenteId,
        })

        notify({
          title: 'Task aggiunta!',
          type: 'success',
        })

        chiudiForm()
      } catch(error) {
        notify({
          title: 'Aggiunta task fallita!',
          type: 'error',
        })
        console.error('Errore:', error)
      }
    } else {
      notify({
        title: 'Registrazione non effettuata',
        text: 'Campi non compilati correttamente',
        type: 'warn',
      })
    }
  }
</script>

<style scoped>
  .selezione-navbar {
    background-color: #190ba4;
    color: #ffffff;
  }
</style>
