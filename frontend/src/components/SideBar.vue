<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item
        :prepend-avatar="utente.foto"
        :subtitle="utente.email"
        :title="utente.nomeUtente"
      />
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-folder" title="Mie task" value="mieTask" />
      <v-list-item prepend-icon="mdi-star" title="Task salvate" value="taskSalvate" />
      <v-list-item prepend-icon="mdi-account" title="Profilo" value="profilo" />
      <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" />
    </v-list>
  </v-navigation-drawer>

  <v-main style="height: 250px" />
</template>

<script setup>
  const utente = {
    nomeUtente: 'Lydia Serena Benbouzid',
    email: 'lydia.serena.benbouzid@email.com',
    password: 'password1',
    foto: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',   
  }
</script>
