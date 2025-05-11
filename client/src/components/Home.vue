<template>
  <v-row>
    <v-col-3>
      <SideBar />
    </v-col-3>
    <v-col>
      <v-container v-if="isLogged">
        <v-container>
          <v-row>
            <v-col>
              <v-container>
                <AggiungiTask @aggiungi-task="onAggiungiTask" />
              </v-container>
            </v-col>
            <v-col>
              <CercaTask />
            </v-col>
          </v-row>
        </v-container>
        <ListaTask ref="listaTaskRef" />
      </v-container>
    </v-col>
  </v-row>
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import SideBar from '@/components/SideBar.vue'
  import AggiungiTask from '@/components/AggiungiTask.vue'
  import CercaTask from '@/components/CercaTask.vue'
  import ListaTask from '@/components/ListaTask.vue'

  const isLogged = ref(false)

  const listaTaskRef = ref(null)

  const onAggiungiTask = () => {
    listaTaskRef.value?.caricaTask()
  }

  onMounted(() => {
    const token = localStorage.getItem('token')
    if (token) {
      isLogged.value = true
    }
    listaTaskRef.value?.caricaTask()
  })
</script>
