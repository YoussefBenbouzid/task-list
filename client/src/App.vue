<template>
  <v-app>
    <v-main :style="{ backgroundImage: `url(${sfondo})` }">
      <notifications position="center" width="500" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import sfondo from '@/assets/sfondo.jpg'
</script>
