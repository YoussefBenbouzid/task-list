<template>
  <v-row>
    <v-col-3>
      <SideBar />
    </v-col-3>
    <v-col>
      <v-container>
        <GestioneTask />
        <ListaTask />
      </v-container>
    </v-col>
  </v-row>
</template>

<script setup>
  import SideBar from '@/components/SideBar.vue'
  import GestioneTask from '@/components/GestioneTask.vue'
  import ListaTask from '@/components/ListaTask.vue'
</script>
