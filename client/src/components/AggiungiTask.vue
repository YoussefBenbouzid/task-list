<template>
  <v-dialog max-width="500" :model-value="isDialogOpen" @update:model-value="isDialogOpen = $event">
    <template #activator="{ props }">
      <v-btn v-bind="props" class="mx-6 rounded-xl selezione-navbar" prepend-icon="mdi-plus" text="Aggiungi task" @click="isDialogOpen = true"/>
    </template>
    <v-card title="Aggiungi task">
      <v-form @submit.prevent="aggiungiTask">
        <v-text-field v-model="titolo" label="Titolo" :rules="rules" />
        <v-text-field v-model="descrizione" label="Descrizione" :rules="rules" />
        <v-date-picker v-model="data" label="Data" locale="it" :rules="rules" />
        <v-text-field v-model="priorita" label="Priorità" :rules="rules" />
        <v-btn block class="mt-2" type="submit">Aggiungi task</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useNotification } from '@kyvg/vue3-notification'
  import api from '@/plugins/axios.js'

  const router = useRouter()
  const emit = defineEmits(['aggiungi-task'])
  const { notify } = useNotification()

  const isDialogOpen = ref(false)
  const titolo = ref('')
  const descrizione = ref('')
  const data = ref('')
  const priorita = ref(0)
  const salvata = ref(false)
  const utenteId = localStorage.getItem('utenteId')

  const aggiungiTask = async () => {
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

      emit('aggiungi-task')

      isDialogOpen.value = false

      router.push('/')
    } catch (error) {
      notify({
        title: 'Aggiunta task fallita!',
        type: 'error',
      })
      console.error('Errore:', error)
    }
  }

  const rules = [v => !!v || 'Campo obbligatorio']
</script>

<style scoped>
  .selezione-navbar {
    background-color: #190BA4;
    color: #FFFFFF;
  }
</style>
