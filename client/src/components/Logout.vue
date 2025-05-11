<template>
  <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" @click="logout" />
</template>

<script setup>
  import apiUtenti from '@/utils/AxiosUtenti'
  import { useRouter } from 'vue-router'

  const emit = defineEmits(['logout'])
  const router = useRouter()

  const logout = async () => {
    try {
      await apiUtenti.post('/logout', {}, {
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
