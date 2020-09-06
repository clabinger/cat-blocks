<template>
  <div class="grid">
    <div v-for="row in grid" :key="row.id" class="grid-row columns is-mobile is-centered">
      <div v-for="cell in row.cells" :key="cell.id" class="grid-cell column">
        {{ cell.id }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('game', [
      'grid'
    ])
  }
}
</script>

<style scoped lang="scss">

$gridSizeDesktop: 160px;
$gridSizeTablet: 100px;
$gridSizeMobile: 40px;

.grid-cell {
  background-color: $grey-lighter;

  @include until($tablet) {
    flex: 0 0 $gridSizeMobile;
    height: $gridSizeMobile;
    border-radius: 4px;
    margin: 2px;
  }
  @include between($tablet, $desktop) {
    flex: 0 0 $gridSizeTablet;
    height: $gridSizeTablet;
    border-radius: 8px;
    margin: 4px;
  }
  @include from($desktop) {
    flex: 0 0 $gridSizeDesktop;
    height: $gridSizeDesktop;
    border-radius: 12px;
    margin: 6px;
  }
}
</style>
