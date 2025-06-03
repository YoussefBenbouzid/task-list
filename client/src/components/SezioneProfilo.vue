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
            <v-btn class="mb-4 rounded-xl" prepend-icon="mdi-pencil" style="background-color: #190ba4; color: #ffffff;" text="Modifica profilo" />
            <v-btn class="mb-4 rounded-xl" prepend-icon="mdi-delete" style="background-color: #190ba4; color: #ffffff;" text="Elimina profilo" @click="eliminaUtente" />
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

  const nomeUtente = ref('')
  const email = ref('')
  const foto = ref('')

  const caricaDatiUtente = () => {
    nomeUtente.value = localStorage.getItem('nomeUtente')
    email.value = localStorage.getItem('email')
    foto.value = localStorage.getItem('foto')
  }

  // const modificaUtente = async () => {
  //   try {

  //   } catch(error) {
  //     console.error('Errore:', error)
  //   }
  // }

  const eliminaUtente = async () => {
    const utenteId = localStorage.getItem('utenteId')
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
