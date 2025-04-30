<template>
  <v-container>
    <v-sheet class="mx-auto" width="300">
      <v-form @submit.prevent>
        <v-text-field
          v-model="nomeUtente"
          label="Nome utente"
          :rules="rules"
        />
        <v-text-field
          v-model="password"
          label="Password"
          :rules="rules"
        />
        <v-btn block class="mt-2" type="submit">Accedi</v-btn>
      </v-form>
    </v-sheet>
  </v-container>

</template>
