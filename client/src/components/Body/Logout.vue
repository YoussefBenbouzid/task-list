<template>
  <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" @click="logout" />
</template>

<script setup>
  import api from '@/plugins/axios'
  import { useRouter } from 'vue-router'

  const emit = defineEmits(['logout'])
  const router = useRouter()

  const logout = async () => {
    try {
      await api.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    } catch (error) {
      console.error('Errore:', error)
    }
    localStorage.clear()
    emit('logout')
    router.push('/')
  }
</script>
