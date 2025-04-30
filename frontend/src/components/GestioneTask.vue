<template>
  <v-container>
    <v-row>
      <v-col>
        <v-container>
          <v-btn color="#03A9F4" prepend-icon="mdi-plus">
            Aggiungi task
          </v-btn>
        </v-container>
      </v-col>
      <v-col>
        <v-toolbar class="rounded-lg" floating>
          <div class="px-4">
            <v-text-field
              density="compact"
              flat
              hide-details
              placeholder="Cerca"
              prepend-inner-icon="mdi-magnify"
              single-line
              variant="solo"
              width="200"
            />
          </div>
        </v-toolbar>
      </v-col>
    </v-row>
  </v-container>
</template>
