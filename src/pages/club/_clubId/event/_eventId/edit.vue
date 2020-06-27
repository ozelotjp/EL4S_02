<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>
          イベント編集
        </h1>
        <p>
          フォームに情報を入力して「更新」ボタンを押してください。
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="form.title"
          label="イベント名"
          placeholder="ねる王"
        />
        <v-text-field
          v-model="form.date"
          label="日時"
          placeholder="2020/06/28 13:15"
        />
        <v-text-field
          v-model="form.location"
          label="場所"
          placeholder="マルチホール"
        />
        <v-textarea
          v-model="form.description"
          label="説明文"
          placeholder="賑やかなマルチホールで誰が一番早く寝れるか競います"
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
import { IClubEvent } from '@@/models/firestore'
import { timestampToDate } from '@/utils/format-data'

export default defineComponent({
  setup(_, { root: { $firebase, $route, $router } }) {
    const clubId = $route.params.clubId
    const eventId = $route.params.eventId

    const form = reactive({
      title: '',
      date: '',
      location: '',
      description: ''
    })

    onBeforeMount(() => {
      $firebase
        .firestore()
        .collection('clubs')
        .doc(clubId)
        .collection('events')
        .doc(eventId)
        .get()
        .then((doc) => {
          const data = doc.data() as IClubEvent
          form.title = data.title
          form.date = timestampToDate(data.date)
          form.location = data.location
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
        .collection('events')
        .doc(eventId)
        .set({
          title: form.title,
          date: $firebase.firestore.Timestamp.fromDate(new Date(form.date)),
          location: form.location,
          description: form.description
        } as IClubEvent)
        .then(() => {
          $router.push(`/club/${clubId}/event/${eventId}`)
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
