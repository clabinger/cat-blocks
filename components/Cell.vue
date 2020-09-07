<template>
  <div>
    <div v-if="occupant !== null" class="player" :class="'player-' + occupant" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    occupant: {
      type: Number,
      default: null
    }
  }
}
</script>
