<template>
  <v-container>
    <h1>
      index
    </h1>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  middleware: 'authenticated',
  setup(_, { root: { $router } }) {
    $router.push('/club')
  }
})
</script>
