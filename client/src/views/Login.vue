<template>
  <v-container fluid>
    <v-row>
      <v-col align="center" align-self="center" class="pa-16" cols="12" md="6">
        <v-sheet class="pa-2 rounded-lg" elevation="6">
          <div class="ma-4 text-center">
            <img class="ma-1" height="100" src="@/assets/logo.svg" width="100">
            <p class="ma-2 font-weight-bold text-h2 text-center" style="color: #190BA4; font-family: 'Lucida Handwriting';">Task List</p>
          </div>
          <v-form class="ma-6" @submit.prevent="login">
            <p class="font-weight-black ma-6 text-center">Accedi al tuo account</p>
            <p class="font-weight-normal text-left">Nome utente</p>
            <v-text-field v-model="nomeUtente" label="Nome utente" :rules="rules" />
            <p class="font-weight-normal text-left">Password</p>
            <v-text-field v-model="password" label="Password" :rules="rules" type="password" />
            <v-btn block class="mt-2 rounded-lg" color="#190BA4" type="submit">Accedi</v-btn>
            <p class="ma-6 text-center">Non hai un account? <a class="text-decoration-none" href="/Register">Registrati</a></p>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col align="center" align-self="stretch" class="pa-0" cols="12" md="6">
        <v-img class="fill-height" cover position="sticky" src="@/assets/login.svg" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useNotification } from '@kyvg/vue3-notification'
  import api from '@/plugins/axios.js'

  const router = useRouter()
  const emit = defineEmits(['login'])
  const { notify } = useNotification()

  const nomeUtente = ref('')
  const password = ref('')

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

      emit('login')

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

  const rules = [v => !!v || 'Campo obbligatorio']

</script>
