<template>
  <v-row>
    <v-col-3>
      <SideBar />
    </v-col-3>
    <v-col>
      <v-container>
        <GestioneTask />
        <ListaComponenti />
      </v-container>
    </v-col>
  </v-row>
</template>

<script setup>
  import SideBar from '@/components/SideBar.vue'
  import GestioneTask from '@/components/GestioneTask.vue'
  import ListaComponenti from '@/components/ListaTask.vue'
</script>
