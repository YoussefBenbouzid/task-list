<template>
  <!-- <v-navigation-drawer expand-on-hover rail> -->
  <!-- <v-navigation-drawer> -->
  <container>
    <v-list>
      <v-list-item :prepend-avatar="foto" :subtitle="email" :title="nomeUtente" />
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item v-if="!isLogged">
        <Login @login="caricaDatiUtente" />
      </v-list-item>
      <v-list-item v-if="!isLogged">
        <Register />
      </v-list-item>
      <v-list-item v-if="isLogged">
        <MieTask />
      </v-list-item>
      <v-list-item v-if="isLogged">
        <TaskSalvate />
      </v-list-item>
      <v-list-item v-if="isLogged">
        <Logout @logout="cancellaDatiUtente" />
      </v-list-item>
    </v-list>
  </container>
  <!-- </v-navigation-drawer> -->

  <v-main style="height: 250px" />
</template>

<script setup>
  import { onMounted, ref } from 'vue'
  import Login from '@/views/Login'
  import Register from '@/views/Register'
  import MieTask from '@/components/Body/MieTask'
  import TaskSalvate from '@/components/Body/TaskSalvate'
  import Logout from '@/components/Body/Logout'

  const nomeUtente = ref('')
  const email = ref('')
  const foto = ref('')
  const isLogged = ref(false)

  const caricaDatiUtente = () => {
    const token = localStorage.getItem('token')
    if(token) {
      nomeUtente.value = localStorage.getItem('nomeUtente') || ''
      email.value = localStorage.getItem('email') || ''
      foto.value = localStorage.getItem('foto') || ''
      isLogged.value = true
    }
  }

  const cancellaDatiUtente = () => {
    nomeUtente.value = ''
    email.value = ''
    foto.value = ''
    isLogged.value = false
  }

  onMounted(() => {
    caricaDatiUtente()
  })

</script>
