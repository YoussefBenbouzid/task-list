<template>
  <v-container class="fill-height d-flex justify-center align-center" fluid>
    <v-card class="h-75 w-66 ma-8 pa-12 rounded-lg" elevation="6">
      <v-row>
        <v-col>
          <v-img aspect-ratio="1" class="ma-4 rounded" cover :src="foto" :width="250" />
          <v-card-title class="text-h6 font-weight-bold">
            <span class="font-weight-bold text-h4">{{ nomeUtente }}</span>
          </v-card-title>
          <v-card-subtitle>
            <span class="font-weight-bold">Email: </span>{{ email }}
          </v-card-subtitle>
        </v-col>
        <v-col>
          <v-card-text>
            <p><span style="font-family: 'Lucida Handwriting'; font-weight: bold">Marhaban </span> {{ nomeUtente }}!</p>
            <p>Qui potrai modificare i tuoi dati e gestire il tuo account.</p>
          </v-card-text>
          <v-card-text class="d-flex flex-column">
            <!-- Modifica utente -->
            <v-dialog v-model="isDialogModificaOpen" max-width="500">
              <template #activator="{ props }">
                <v-btn class="mb-4 rounded-xl" prepend-icon="mdi-pencil" style="background-color: #190ba4; color: #ffffff;" text="Modifica profilo" v-bind="props" />
              </template>
              <v-card class="border-md rounded-lg pa-4">
                <v-btn color="#e32a20" style="position: absolute; top: 0; right: 0;" text="X" @click="chiudiForm" />
                <span class="font-weight-bold text-h5 text-center ma-2">Modifica la tua utenza</span>
                <v-form ref="form" @submit.prevent="modificaUtente">
                  <v-text-field v-model="nomeUtenteNuovo" label="Nuovo nome utente" :rules="rules.nomeUtenteNuovo" />
                  <v-text-field v-model="emailNuova" label="Nuova email" :rules="rules.emailNuova" />
                  <v-text-field v-model="passwordNuova" label="Nuova password" :rules="rules.passwordNuova" />
                  <v-text-field v-model="fotoNuova" label="Nuova foto" :rules="rules.fotoNuova" />
                  <v-btn block type="submit">Modifica</v-btn>
                </v-form>
              </v-card>
            </v-dialog>
            <!-- Elimina utente -->
            <v-dialog v-model="isDialogEliminaOpen" max-width="500">
              <template #activator="{ props }">
                <v-btn class="mb-4 rounded-xl" prepend-icon="mdi-delete" style="background-color: #190ba4; color: #ffffff;" text="Elimina profilo" v-bind="props" />
              </template>
              <v-card>
                <v-card-title class="text-h6">Conferma eliminazione</v-card-title>
                <v-card-text>Sei sicuro di voler eliminare la tua utenza?</v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="eliminaUtente(); isDialogEliminaOpen=false">Sì</v-btn>
                  <v-btn @click="isDialogEliminaOpen=false">No</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useNotification } from '@kyvg/vue3-notification'
  import api from '@/plugins/axios.js'

  const router = useRouter()
  const { notify } = useNotification()

  const isDialogModificaOpen = ref(false)
  const isDialogEliminaOpen = ref(false)
  const form = ref()
  const nomeUtente = ref('')
  const email = ref('')
  const foto = ref('')
  const nomeUtenteNuovo = ref('')
  const emailNuova = ref('')
  const fotoNuova = ref('')
  const passwordNuova = ref('')
  const utenteId = localStorage.getItem('utenteId')

  const rules = {
    nomeUtenteNuovo: [
      v => !!v || 'Campo obbligatorio',
      v => v.length >= 3 || 'Il nome utente deve avere almeno tre caratteri',
    ],
    emailNuova: [
      v => !!v || 'Campo obbligatorio',
      v => /.+@.+\..+/.test(v) || 'Email non valida',
    ],
    passwordNuova: [
      v => !!v || 'Campo obbligatorio',
      v => v.length >= 8 || 'La password deve avere almeno otto caratteri',
      v => /[A-Z]/.test(v) || 'La password deve avere almeno una lettera maiuscola',
    ],
    fotoNuova: [
      v => !!v || 'Campo obbligatorio',
    ],
  }

  const caricaDatiUtente = () => {
    nomeUtente.value = localStorage.getItem('nomeUtente')
    email.value = localStorage.getItem('email')
    foto.value = localStorage.getItem('foto')
  }

  function chiudiForm () {
    nomeUtenteNuovo.value = '',
    emailNuova.value = '',
    fotoNuova.value = '',
    passwordNuova.value = '',
    isDialogModificaOpen.value = false
  }

  const modificaUtente = async () => {
    const { valid } = await form.value.validate()
    if (valid) {
      try {
        await api.put(`/utenti/updateUtente/${utenteId}`, {
          nomeUtente: nomeUtenteNuovo.value,
          email: emailNuova.value,
          password: passwordNuova.value,
          foto: fotoNuova.value,
        })

        notify({
          title: 'Profilo modificato con successo!',
          type: 'success',
        })

        localStorage.clear()
        router.push('/login')
      } catch(error) {
        notify({
          title: 'Modifica del profilo fallita!',
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

  const eliminaUtente = async () => {
    try {
      await api.delete(`/utenti/deleteUtente/${utenteId}`)

      notify({
        title: 'Profilo eliminato con successo!',
        type: 'success',
      })

      localStorage.clear()
      router.push('/login')
    } catch(error) {
      notify({
        title: 'Eliminazione del profilo fallita!',
        type: 'error',
      })
      console.error('Errore:', error)
    }
  }

  onMounted(() => {
    caricaDatiUtente()
  })
</script>
