<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>
          サークル編集
        </h1>
        <p>
          内容を編集して、最後に「更新」ボタンを押してください。
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="form.name"
          label="サークル名"
          placeholder="ぐーだら部"
        />
        <v-textarea
          v-model="form.description"
          label="説明文"
          placeholder="よく食べて遊んで寝ます"
        />
        <div class="float-right">
          <v-btn color="primary" @click="btnUpdate">
            更新
          </v-btn>
          <v-btn @click="btnCancel">
            キャンセル
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount } from '@vue/composition-api'
import { IClub } from '@@/models/firestore'

export default defineComponent({
  setup(_, { root: { $firebase, $route, $router } }) {
    const clubId = $route.params.clubId
    const form = reactive({
      name: '',
      description: ''
    } as IClub)

    onBeforeMount(() => {
      $firebase
        .firestore()
        .collection('clubs')
        .doc(clubId)
        .get()
        .then((doc) => {
          const data = doc.data() as IClub
          form.name = data.name
          form.description = data.description
        })
    })

    const btnCancel = () => {
      history.back()
    }

    const btnUpdate = () => {
      $firebase
        .firestore()
        .collection('clubs')
        .doc(clubId)
        .set({
          name: form.name,
          description: form.description
        } as IClub)
        .then(() => {
          $router.push(`/club/${clubId}`)
        })
    }

    return {
      form,
      btnCancel,
      btnUpdate
    }
  }
})
</script>
