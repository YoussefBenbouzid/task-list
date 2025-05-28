<template>
  <v-container fluid>
    <v-row>
      <!-- <v-col class="pa-16 d-flex justify-center align-center" cols="12" md="6"> -->
      <v-col align="center" align-self="center" class="pa-16" cols="12" md="6">
        <v-sheet class="pa-2 rounded-lg" elevation="6">
          <div class="ma-4 text-center">
            <img class="ma-1" height="100" src="@/assets/logo.svg" width="100">
            <p class="ma-2 font-weight-bold text-h2 text-center" style="color: #190BA4; font-family: 'Lucida Handwriting';">Task List</p>
          </div>
          <v-form class="ma-6" @submit.prevent="register">
            <p class="font-weight-black ma-6 text-center">Crea il tuo account</p>
            <p class="font-weight-normal text-left">Nome utente</p>
            <v-text-field v-model="nomeUtente" label="Nome utente" :rules="rules" />
            <p class="font-weight-normal text-left">Email</p>
            <v-text-field v-model="email" label="Email" :rules="rules" type="email" />
            <p class="font-weight-normal text-left">Foto</p>
            <v-text-field v-model="foto" label="Foto" :rules="rules" />
            <p class="font-weight-normal text-left">Password</p>
            <v-text-field v-model="password" label="Password" :rules="rules" type="password" />
            <v-btn block class="mt-2 rounded-lg" color="#190BA4" type="submit">Registrati</v-btn>
            <p class="ma-6 text-center">Hai già un account? <a class="text-decoration-none" href="/Login">Accedi</a></p>
          </v-form>
        </v-sheet>
      </v-col>
      <!-- <v-col class="pa-0 d-flex justify-center align-stretch" cols="12" md="6"> -->
      <v-col align="center" align-self="stretch" class="pa-0" cols="12" md="6">
        <v-img class="fill-height" cover position="sticky" src="@/assets/register.svg" />
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
  const emit = defineEmits(['register'])
  const { notify } = useNotification()

  const nomeUtente = ref('')
  const email = ref('')
  const password = ref('')
  const foto = ref('')

  const register = async () => {
    try {
      if(nomeUtente.value.trim() !== '' && email.value.trim() !== '' && password.value.trim() !== '' && foto.value.trim() !== '') {
        const response = await api.post('/utenti/register', {
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

        notify({
          title: 'Marhaban!',
          text: 'La tua utenza è stata registrata',
          type: 'success',
        })

        emit('register')

        if(response.data.token) {
          router.push('/')
        }
      } else {
        notify({
          title: 'Registrazione non effettuata',
          text: 'Campi non compilati',
          type: 'warn',
        })
      }
    } catch (error) {
      notify({
        title: 'Registrazione fallita!',
        text: 'Errore nella registrazione',
        type: 'error',
      })
      console.error('Errore:', error)
    }
  }

  const rules = [v => !!v || 'Campo obbligatorio']
</script>
