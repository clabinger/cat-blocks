<template>
  <div>
    <Grid v-if="started" />
    <Controls />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Grid from '~/components/Grid.vue'
import Controls from '~/components/Controls.vue'

export default {
  components: {
    Grid,
    Controls
  },
  computed: {
    ...mapState('game', [
      'started'
    ])
  }
}
</script>
