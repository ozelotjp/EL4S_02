<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>
          サークル作成
        </h1>
        <p>
          フォームに情報を入力して「作成」ボタンを押してください。
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
          <v-btn color="primary" @click="btnAdd">
            作成
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
import { defineComponent, reactive } from '@vue/composition-api'
import { IClub } from '@@/models/firestore'

export default defineComponent({
  setup(_, { root: { $firebase, $router } }) {
    const form = reactive({
      name: '',
      description: ''
    })

    const btnCancel = () => {
      history.back()
    }

    const btnAdd = () => {
      $firebase
        .firestore()
        .collection('clubs')
        .add({
          name: form.name,
          description: form.description
        } as IClub)
        .then((doc) => {
          $router.push(`/club/${doc.id}`)
        })
    }

    return {
      form,
      btnCancel,
      btnAdd
    }
  }
})
</script>
