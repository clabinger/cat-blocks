<template>
  <div class="grid">
    <div v-for="row in grid" :key="row.id" class="grid-row columns is-mobile is-centered">
      <div v-for="cell in row.cells" :key="cell.id" class="grid-cell column is-paddingless">
        <Cell v-bind="cell" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Cell from '~/components/Cell.vue'

export default {
  components: {
    Cell
  },
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
  display: flex;
  justify-content: center;
  align-items: center;

  @include until($tablet) {
    flex: 0 0 $gridSizeMobile;
    height: $gridSizeMobile;
    border-radius: 4px;
    margin: 2px;
    & /deep/ .player {
      width: $gridSizeMobile / 2;
      height: $gridSizeMobile / 2;
    }
  }
  @include between($tablet, $desktop) {
    flex: 0 0 $gridSizeTablet;
    height: $gridSizeTablet;
    border-radius: 8px;
    margin: 4px;
    & /deep/ .player {
      width: $gridSizeTablet / 2.3;
      height: $gridSizeTablet / 2.3;
    }
  }
  @include from($desktop) {
    flex: 0 0 $gridSizeDesktop;
    height: $gridSizeDesktop;
    border-radius: 12px;
    margin: 6px;
    & /deep/ .player {
      width: $gridSizeDesktop / 2.5;
      height: $gridSizeDesktop / 2.5;
    }
  }

  & /deep/ .player {
    border-radius: 50%;
    @each $index in (0,1,2,3) {
      &.player-#{$index} {
        background-color: nth($playerColors, $index + 1);
      }
    }
  }

}
</style>
