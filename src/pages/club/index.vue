<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>
          サークル一覧
        </h1>
        <p>
          カードを選択すると詳細を表示します。
        </p>
        <v-btn to="/club/add" color="primary" class="float-right">
          サークルを作成する
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="item in list" :key="item.id" cols="12">
        <v-card :to="`/club/${item.id}`" color="accent">
          <v-card-title>
            {{ item.name }}
          </v-card-title>
          <v-card-text>
            {{ item.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from '@vue/composition-api'
import { IClub, IHasId } from '@@/models/firestore'

export default defineComponent({
  setup(_, { root: { $firebase, $nuxt } }) {
    const list = ref([] as (IClub & IHasId)[])

    onBeforeMount(() => {
      $firebase
        .firestore()
        .collection('clubs')
        .get()
        .then((snap) => {
          snap.docs.forEach((doc) => {
            list.value.push({ ...doc.data(), id: doc.id } as IClub & IHasId)
          })
        })
        .finally(() => {
          $nuxt.$loading.finish()
        })
    })

    return {
      list
    }
  }
})
</script>
