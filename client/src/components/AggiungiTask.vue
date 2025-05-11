<template>
  <v-dialog max-width="500" :model-value="isDialogOpen" @update:model-value="isDialogOpen = $event">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="#03A9F4"
        flat
        prepend-icon="mdi-plus"
        text="Aggiungi task"
        @click="isDialogOpen = true"
      />
    </template>

    <template #default>
      <v-card title="Aggiungi task">
        <v-form @submit.prevent="aggiungiTask">
          <v-text-field v-model="titolo" label="Titolo" />
          <v-text-field v-model="descrizione" label="Descrizione" />
          <!-- <v-text-field v-model="data" label="Data" /> -->
          <v-date-picker v-model="data" label="Data" locale="it" />
          <v-text-field v-model="priorita" label="Priorità" />
          <v-btn block class="mt-2" type="submit">Aggiungi task</v-btn>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
  import { ref } from 'vue'
  import apiTask from '@/utils/AxiosTask'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const emit = defineEmits(['aggiungi-task'])

  const isDialogOpen = ref(false)
  const titolo = ref('')
  const descrizione = ref('')
  const data = ref('')
  const priorita = ref(0)
  const salvata = ref(false)
  const utenteId = localStorage.getItem('utenteId')

  const aggiungiTask = async () => {
    console.log('ciao')
    try {
      await apiTask.post('/createTask', {
        titolo: titolo.value,
        descrizione: descrizione.value,
        data: data.value,
        priorita: priorita.value,
        salvata: salvata.value,
        utenteId,
      })

      emit('aggiungi-task')
      isDialogOpen.value = false
      router.push('/')
    } catch (error) {
      console.error('Errore:', error)
    }
  }
</script>
