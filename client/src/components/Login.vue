<template>
  <v-dialog max-width="500" :model-value="isDialogOpen" @update:model-value="isDialogOpen = $event">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        flat
        prepend-icon="mdi-account"
        text="Login"
        @click="isDialogOpen = true"
      />
    </template>

    <template #default>
      <v-card title="Login">
        <v-form @submit.prevent="login">
          <v-text-field v-model="nomeUtente" label="Nome utente" />
          <v-text-field v-model="password" label="Password" type="password" />
          <v-btn block class="mt-2" type="submit">Accedi</v-btn>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
  import { ref } from 'vue'
  import apiUtenti from '@/utils/AxiosUtenti'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const emit = defineEmits(['login'])

  const isDialogOpen = ref(false)
  const nomeUtente = ref('')
  const password = ref('')

  const login = async () => {
    try {
      const response = await apiUtenti.post('/login', {
        nomeUtente: nomeUtente.value,
        password: password.value,
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('nomeUtente', response.data.nomeUtente)
      localStorage.setItem('email', response.data.email)
      localStorage.setItem('foto', response.data.foto)
      localStorage.setItem('utenteId', response.data.id)

      emit('login')
      isDialogOpen.value = false
      router.push('/')
    } catch (error) {
      console.error('Errore:', error)
    }
  }
</script>
