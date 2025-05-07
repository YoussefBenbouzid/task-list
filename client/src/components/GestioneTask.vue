<template>
  <v-container>
    <v-row>
      <v-col>
        <v-container>
          <AggiungiTask />
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

<script setup>
  import AggiungiTask from '@/components/AggiungiTask.vue'
</script>
