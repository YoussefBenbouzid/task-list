<template>
  <v-dialog max-width="500">
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="#03A9F4"
        prepend-icon="mdi-plus"
        text="Aggiungi task"
        variant="flat"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="Aggiungi task">
        <v-form fast-fail @submit.prevent>
          <v-text-field
            v-model="titolo"
            label="Titolo"
          />

          <v-text-field
            v-model="descrizione"
            label="Descrizione"
          />

          <v-text-field
            v-model="data"
            label="Data"
          />

          <v-text-field
            v-model="priorita"
            label="Priorità"
          />

          <v-btn block class="mt-2" type="submit" @click="isActive.value = false">Aggiungi</v-btn>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>
