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
        Da aggiungere form

        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Aggiungi"
            @click="isActive.value = false"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
