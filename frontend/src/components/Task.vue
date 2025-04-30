<template>
  <v-card class="mx-auto my-8" color="#009688" elevation="16" max-width="344">
    <v-card-item>
      <v-card-title>
        {{ task.titolo }}
      </v-card-title>
    </v-card-item>

    <v-divider />

    <v-card-text>
      {{ task.descrizione }}
    </v-card-text>

    <v-card-text>
      Priorità: {{ task.priorita }}
    </v-card-text>

    <v-card-text>
      Data: {{ task.data }}
    </v-card-text>

    <v-container>
      <v-row>
        <v-col>
          <v-btn prepend-icon="mdi-star" />
        </v-col>
        <v-col>
          <v-btn prepend-icon="mdi-pencil" />
        </v-col>
        <v-col>
          <v-btn prepend-icon="mdi-delete" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
  defineProps({
    task: {
      type: Object,
      required: true,
    },
  })
</script>
