<template>
  <v-container class="fill-height d-flex justify-center align-center" fluid>
    <v-card class="h-75 w-66 ma-8 pa-12 rounded-lg" elevation="6">
      <v-row>
        <v-col>
          <v-img aspect-ratio="1" class="ma-4 rounded" cover :src="utente.foto" :width="250" />
          <v-card-title class="text-h6 font-weight-bold">
            <span style="font-family: 'Lucida Handwriting';">{{ utente.nomeUtente }}</span>
          </v-card-title>
          <v-card-subtitle>
            <span class="font-weight-bold">Email: </span>{{ utente.email }}
          </v-card-subtitle>
        </v-col>
        <v-col>
          <v-card-text>
            <p><span style="font-family: 'Lucida Handwriting'; font-weight: bold">Marhaban </span> {{ utente.nomeUtente }}!</p>
            <p>Qui potrai modificare i tuoi dati e gestire il tuo account.</p>
          </v-card-text>
          <v-card-text class="d-flex flex-column">
            <v-btn class="mb-4 rounded-xl" prepend-icon="mdi-pencil" style="background-color: #190BA4; color: #FFFFFF;" text="Modifica profilo" />
            <v-btn class="mb-4 rounded-xl" prepend-icon="mdi-delete" style="background-color: #190BA4; color: #FFFFFF;" text="Elimina profilo" />
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
  const utente = {
    nomeUtente: 'Lydia Serena Benbouzid',
    email: 'lydia.serena.benbouzid@email.com',
    password: 'passwordLydia',
    foto: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
  }
</script>
