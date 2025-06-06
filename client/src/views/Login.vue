<template>
  <v-container class="fill-height d-flex justify-center align-center" fluid>
    <v-row>
      <v-col class="d-flex justify-center align-center" cols="12" md="6">
        <v-sheet class="rounded-lg w-75" elevation="6">
          <div class="ma-4 text-center">
            <img class="ma-1" height="100" src="@/assets/logo.svg" width="100">
            <p class="ma-2 font-weight-bold text-h2 text-center" style="color: #190ba4; font-family: 'Lucida Handwriting';">Task List</p>
          </div>
          <v-form class="ma-6" @submit.prevent="login">
            <p class="font-weight-black ma-6 text-center">Accedi al tuo account</p>
            <v-text-field v-model="nomeUtente" label="Nome utente" variant="outlined" :rules="rules" />
            <v-text-field v-model="password" label="Password" variant="outlined" :rules="rules" type="password" />
            <v-btn block class="mt-2 rounded-lg" color="#190ba4" type="submit">Accedi</v-btn>
            <p class="ma-6 text-center">Non hai un account? <a class="text-decoration-none" href="/register">Registrati</a></p>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col class="pa-0 d-flex justify-center align-stretch" cols="12" md="6">
        <v-img class="fill-height" cover position="sticky" src="@/assets/login.svg" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useNotification } from '@kyvg/vue3-notification'
  import api from '@/plugins/axios.js'

  const router = useRouter()
  const { notify } = useNotification()

  const nomeUtente = ref('')
  const password = ref('')

  const rules = [v => !!v || 'Campo obbligatorio']

  const login = async () => {
    try {
      const response = await api.post('/utenti/login', {
        nomeUtente: nomeUtente.value,
        password: password.value,
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('nomeUtente', response.data.nomeUtente)
      localStorage.setItem('email', response.data.email)
      localStorage.setItem('foto', response.data.foto)
      localStorage.setItem('utenteId', response.data.id)

      notify({
        title: 'Marhaban!',
        text: 'Autenticazione effettuata con successo',
        type: 'success',
      })

      if(response.data.token) {
        router.push('/')
      }
    } catch (error) {
      notify({
        title: 'Autenticazione fallita!',
        text: 'Nome utente o password non validi',
        type: 'error',
      })
      console.error('Errore:', error)
    }
  }

  onMounted(() => {
    const token = localStorage.getItem('token')
    if(token) {
      router.push('/')
    }
  })
</script>
