<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup(_, { root: { $route, $router } }) {
    const clubId = $route.params.clubId
    $router.push(`/club/${clubId}`)
  }
})
</script>
