<template>
  <v-container fluid>
    <v-row>
      <v-col align="center" align-self="center" class="pa-16" cols="12" md="6">
        <v-sheet class="pa-2 rounded-lg" elevation="6">
          <div class="ma-4 text-center">
            <img class="ma-1" height="100" src="@/assets/logo.svg" width="100">
            <p class="ma-2 font-weight-bold text-h2 text-center" style="color: #190BA4; font-family: 'Lucida Handwriting';">Task List</p>
          </div>
          <v-form class="ma-6" @submit.prevent>
            <p class="font-weight-black ma-6 text-center">Accedi al tuo account</p>
            <p class="font-weight-normal text-left">Nome utente</p>
            <v-text-field v-model="nomeUtente" label="Nome utente" :rules="rules" />
            <p class="font-weight-normal text-left">Password</p>
            <v-text-field v-model="password" label="Password" type="password" :rules="rules" />
            <v-btn block class="mt-2 rounded-lg" color="#190BA4" type="submit">Accedi</v-btn>
            <p class="ma-6 text-center">Non hai un account? <a class="text-decoration-none" href="/Register">Registrati</a></p>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col align="center" align-self="stretch" class="pa-0" cols="12" md="6">
        <v-img class="fill-height" cover src="@/assets/login.svg" position="sticky" />
      </v-col>
    </v-row>
  </v-container>
</template>

<!-- <template>
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
  import apiUtenti from '@/plugins/AxiosUtentiti'
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
</script> -->
