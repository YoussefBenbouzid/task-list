<template>
  <v-container class="fill-height d-flex justify-center align-center" fluid>
    <v-row>
      <v-col class="d-flex justify-center align-center" cols="12" md="6">
        <v-sheet class="rounded-lg w-75" elevation="6">
          <div class="ma-4 text-center">
            <img class="ma-1" height="100" src="@/assets/logo.svg" width="100">
            <p class="ma-2 font-weight-bold text-h2 text-center" style="color: #190ba4; font-family: 'Lucida Handwriting';">Task List</p>
          </div>
          <v-form ref="form" class="ma-6" @submit.prevent="register">
            <p class="font-weight-black ma-6 text-center">Crea il tuo account</p>
            <v-text-field v-model="nomeUtente" label="Nome utente" variant="outlined" :rules="rules.nomeUtente" />
            <v-text-field v-model="email" label="Email" variant="outlined" :rules="rules.email" type="email" />
            <v-text-field v-model="foto" label="Foto" variant="outlined" :rules="rules.foto" type="url" />
            <v-text-field v-model="password" label="Password" variant="outlined" :rules="rules.password" type="password" />
            <v-btn block class="mt-2 rounded-lg" color="#190ba4" type="submit">Registrati</v-btn>
            <p class="ma-6 text-center">Hai già un account? <a class="text-decoration-none" href="/login">Accedi</a></p>
          </v-form>
        </v-sheet>
      </v-col>
      <v-col class="pa-0 d-flex justify-center align-stretch" cols="12" md="6">
        <v-img class="fill-height" cover position="sticky" src="@/assets/register.svg" />
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

  const form = ref()
  const nomeUtente = ref('')
  const email = ref('')
  const password = ref('')
  const foto = ref('')

  const rules = {
    nomeUtente: [
      v => !!v || 'Campo obbligatorio',
      v => v.length >= 3 || 'Il nome utente deve avere almeno tre caratteri',
    ],
    email: [
      v => !!v || 'Campo obbligatorio',
      v => /.+@.+\..+/.test(v) || 'Email non valida',
    ],
    password: [
      v => !!v || 'Campo obbligatorio',
      v => v.length >= 8 || 'La password deve avere almeno otto caratteri',
      v => /[A-Z]/.test(v) || 'La password deve avere almeno una lettera maiuscola',
    ],
    foto: [
      v => !!v || 'Campo obbligatorio',
    ],
  }

  const register = async () => {
    const { valid } = await form.value.validate()
    if (!valid) {
      notify({
        title: 'Registrazione non effettuata',
        text: 'Campi non compilati correttamente',
        type: 'warn',
      })
    }
    try {
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

      if(response.data.token) {
        router.push('/')
      }
    } catch(error) {
      notify({
        title: 'Registrazione fallita!',
        text: 'Errore nella registrazione',
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
