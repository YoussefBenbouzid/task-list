<template>
  <v-app-bar color="#CBCACF">
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />

    <v-toolbar-title>Task List</v-toolbar-title>

    <v-btn icon="mdi-dots-vertical" variant="text" />
    <v-btn icon="mdi-dots-vertical" variant="text" />
    <v-btn icon="mdi-dots-vertical" variant="text" />
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
    <v-list :items="items" />
  </v-navigation-drawer>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const items = [
    {
      title: 'Foo',
      value: 'foo',
    },
    {
      title: 'Bar',
      value: 'bar',
    },
    {
      title: 'Fizz',
      value: 'fizz',
    },
    {
      title: 'Buzz',
      value: 'buzz',
    },
  ]

  const drawer = ref(false)
  const group = ref(null)

  watch(group, () => {
    drawer.value = false
  })
</script>
