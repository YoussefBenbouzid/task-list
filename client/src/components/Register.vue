<template>
  <v-dialog max-width="500" :model-value="isDialogOpen" @update:model-value="isDialogOpen = $event">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        flat
        prepend-icon="mdi-account"
        text="Registrati"
        @click="isDialogOpen = true"
      />
    </template>

    <template #default>
      <v-card title="Register">
        <v-form @submit.prevent="register">
          <v-text-field v-model="nomeUtente" label="Nome utente" />
          <v-text-field v-model="email" label="email" />
          <v-text-field v-model="password" label="Password" type="password" />
          <v-text-field v-model="foto" label="foto" />
          <v-btn block class="mt-2" type="submit">Registrati</v-btn>
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
  const emit = defineEmits(['register'])

  const isDialogOpen = ref(false)
  const nomeUtente = ref('')
  const email = ref('')
  const password = ref('')
  const foto = ref('')

  const register = async () => {
    try {
      const response = await apiUtenti.post('/register', {
        nomeUtente: nomeUtente.value,
        email: email.value,
        password: password.value,
        foto: foto.value,
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('nomeUtente', response.data.nomeUtente)
      localStorage.setItem('email', response.data.email)
      localStorage.setItem('foto', response.data.foto)
      localStorage.setItem('utenteId', response.data.id)

      emit('register')
      isDialogOpen.value = false
      router.push('/')
    } catch (error) {
      console.error('Errore:', error)
    }
  }
</script>
