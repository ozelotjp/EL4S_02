<template>
  <v-container>
    <v-row>
      <v-col>
        <p>
          <nuxt-link to="/club">
            サークル一覧へ戻る
          </nuxt-link>
        </p>
        <v-card>
          <v-card-title>
            {{ club.name }}
          </v-card-title>
          <v-card-text>
            <p>
              {{ club.description }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn :to="`/club/${clubId}/event/add`">
              イベント情報を作成する
            </v-btn>
            <v-btn :to="`/club/${clubId}/edit`">
              サークル情報を編集する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2>
          イベント情報
        </h2>
      </v-col>
      <v-col v-for="event in events" :key="event.id" cols="12">
        <v-card :to="`/club/${clubId}/event/${event.id}`" color="accent">
          <v-card-title>
            {{ event.title }}
          </v-card-title>
          <v-card-text>
            <dl>
              <dt>
                日時
              </dt>
              <dd>
                <timestamp-to-date :timestamp="event.date" />
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  onBeforeMount,
  ref
} from '@vue/composition-api'
import { IClub, IClubEvent, IHasId } from '@@/models/firestore'
import TimestampToDate from '@/components/TimestampToDate.vue'

export default defineComponent({
  components: {
    TimestampToDate
  },
  setup(_, { root: { $firebase, $route } }) {
    const clubId = $route.params.clubId
    const club = reactive({
      name: '',
      description: ''
    } as IClub)
    const events = ref([] as (IClubEvent & IHasId)[])

    onBeforeMount(() => {
      $firebase
        .firestore()
        .collection('clubs')
        .doc(clubId)
        .get()
        .then((doc) => {
          const data = doc.data() as IClub
          club.name = data.name
          club.description = data.description
        })
      $firebase
        .firestore()
        .collection('clubs')
        .doc(clubId)
        .collection('events')
        .orderBy('date', 'desc')
        .get()
        .then((snap) => {
          snap.docs.forEach((doc) => {
            events.value.push({
              ...doc.data(),
              id: doc.id
            } as IClubEvent & IHasId)
          })
        })
    })

    return {
      clubId,
      club,
      events
    }
  }
})
</script>
