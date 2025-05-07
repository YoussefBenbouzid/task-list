<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="name.value.value"
      :counter="10"
      :error-messages="name.errorMessage.value"
      label="Nome utente"
    />

    <v-text-field
      v-model="phone.value.value"
      :counter="7"
      :error-messages="phone.errorMessage.value"
      label="Email"
    />

    <v-text-field
      v-model="email.value.value"
      :error-messages="email.errorMessage.value"
      label="Password"
    />

    <v-select
      v-model="select.value.value"
      :error-messages="select.errorMessage.value"
      :items="items"
      label="Select"
    />

    <v-checkbox
      v-model="checkbox.value.value"
      :error-messages="checkbox.errorMessage.value"
      label="Option"
      type="checkbox"
      value="1"
    />

    <v-btn
      class="me-4"
      type="submit"
    >
      Registrati
    </v-btn>

    <v-btn @click="handleReset">
      Cancella
    </v-btn>
  </form>
</template>
