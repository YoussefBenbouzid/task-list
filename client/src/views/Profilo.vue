<template>
  <v-card>
    <v-layout>
      <Header />
      <v-main style="height: 800px;">
        <SezioneProfilo />
      </v-main>
    </v-layout>
  </v-card>

  <Footer />
</template>

<script setup>
  import Header from '@/components/Header.vue'
  import SezioneProfilo from '@/components/SezioneProfilo.vue'
  import Footer from '@/components/Footer.vue'
</script>
