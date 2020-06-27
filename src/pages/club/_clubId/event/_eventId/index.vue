<template>
  <v-container>
    <v-row>
      <v-col>
        <p>
          <nuxt-link :to="`/club/${clubId}`">
            {{ clubName }}のページへ戻る
          </nuxt-link>
        </p>
        <v-card>
          <v-card-title>
            {{ event.title }}
          </v-card-title>
          <v-card-text>
            <dl>
              <dt>
                日時
              </dt>
              <dd>
                {{ event.date }}
              </dd>
              <dt>
                場所
              </dt>
              <dd>
                {{ event.location }}
              </dd>
              <dt>
                内容
              </dt>
              <dd>
                {{ event.description }}
              </dd>
            </dl>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="btnJoin">
              イベントに参加する
            </v-btn>
            <v-btn :to="`/club/${clubId}/event/${eventId}/edit`">
              イベント情報を編集
            </v-btn>
          </v-card-actions>
        </v-card>
        <h2 class="mt-5">
          参加者リスト
        </h2>
        <ul>
          <li v-for="(member, i) in members" :key="i">
            {{ member.class }} / {{ member.name }}
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onBeforeMount
} from '@vue/composition-api'
import { IClub, IClubEvent, IUser } from '@@/models/firestore'
import { timestampToDate } from '@/utils/format-data'

export default defineComponent({
  setup(_, { root: { $firebase, $route } }) {
    const clubId = $route.params.clubId
    const eventId = $route.params.eventId

    const clubName = ref('')
    const event = reactive({
      title: '',
      date: '',
      location: '',
      description: ''
    })
    const members = ref([] as IUser[])

    onBeforeMount(() => {
      $firebase
        .firestore()
        .collection('clubs')
        .doc(clubId)
        .get()
        .then((doc) => {
          const data = doc.data() as IClub
          clubName.value = data.name
        })
      $firebase
        .firestore()
        .collection('clubs')
        .doc(clubId)
        .collection('events')
        .doc(eventId)
        .get()
        .then((doc) => {
          const data = doc.data() as IClubEvent
          event.title = data.title
          event.date = timestampToDate(data.date)
          event.location = data.location
          event.description = data.description
        })
      $firebase
        .firestore()
        .collection('clubs')
        .doc(clubId)
        .collection('events')
        .doc(eventId)
        .collection('members')
        .get()
        .then((snap) => {
          snap.docs.forEach((doc) => {
            const data = doc.data() as IUser
            members.value.push(data)
          })
        })
    })

    const btnJoin = () => {
      $firebase
        .firestore()
        .collection('users')
        .doc($firebase.auth().currentUser!.uid)
        .get()
        .then((doc) => {
          $firebase
            .firestore()
            .collection('clubs')
            .doc(clubId)
            .collection('events')
            .doc(eventId)
            .collection('members')
            .doc(doc.id)
            .set({
              ...doc.data()
            })
            .then(() => {
              window.alert('イベントに参加しました')
              location.reload()
            })
        })
    }

    return {
      clubId,
      eventId,
      clubName,
      event,
      members,
      btnJoin
    }
  }
})
</script>
