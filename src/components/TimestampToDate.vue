<template>
  <span>
    {{ value }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import firebase from 'firebase/app'
import { timestampToDate } from '@/utils/format-data'

export default defineComponent({
  props: {
    timestamp: {
      type: firebase.firestore.Timestamp,
      required: true
    }
  },
  setup({ timestamp }) {
    const value = timestampToDate(timestamp)

    return {
      value
    }
  }
})
</script>
