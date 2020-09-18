<template>
  <div class="grid-container">
    <div class="grid">
      <div v-for="row in grid" :key="row.id" class="grid-row">
        <div v-for="cell in row.cells" :key="cell.id" class="grid-cell" :class="cell.object !== undefined ? 'object object-' + cell.object.type + ' object-' + cell.object.type + '-' + cell.object.index : null" />
      </div>
    </div>
    <div class="players">
      <div v-for="player in players" :key="player.index" class="player" :class="['player-' + player.index, 'player-position-' + player.position[0] + '-' + player.position[1]]" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
  },
  computed: {
    ...mapState('game', [
      'grid',
      'players'
    ])
  }
}
</script>

<style scoped lang="scss">

$gridSizeDesktop: 160px;
$marginSizeDesktop: 6px;

$gridSizeTablet: 100px;
$marginSizeTablet: 4px;

$gridSizeMobile: 40px;
$marginSizeMobile: 2px;

div.grid-container {
  @include until($tablet) {
    height: 5 * $gridSizeMobile + 10 * $marginSizeMobile;
  }
  @include between($tablet, $desktop) {
    height: 5 * $gridSizeTablet + 10 * $marginSizeTablet;
  }
  @include from($desktop) {
    height: 5 * $gridSizeDesktop + 10 * $marginSizeDesktop;
  }
}

div.grid {
  position: absolute;
}

div.grid-row {
  display: flex;
}

div.grid-cell {
  background-color: $grey-lighter;

  &.object-wall {
    background-color: $grey-dark;
  }

  @include until($tablet) {
    width: $gridSizeMobile;
    height: $gridSizeMobile;
    border-radius: 4px;
    margin: $marginSizeMobile;
  }
  @include between($tablet, $desktop) {
    width: $gridSizeTablet;
    height: $gridSizeTablet;
    border-radius: 8px;
    margin: $marginSizeTablet;
  }
  @include from($desktop) {
    width: $gridSizeDesktop;
    height: $gridSizeDesktop;
    border-radius: 12px;
    margin: $marginSizeDesktop;
  }
}

div.players {
  position: absolute;
}

div.player {
  position: absolute;
  transition: 200ms ease-in-out;
  transition-property: transform;

  @include until($tablet) {
    width: $gridSizeMobile;
    height: $gridSizeMobile;
    padding: $marginSizeMobile;
    margin: $marginSizeMobile;
  }
  @include between($tablet, $desktop) {
    width: $gridSizeTablet;
    height: $gridSizeTablet;
    padding: $marginSizeTablet;
    margin: $marginSizeTablet;
  }
  @include from($desktop) {
    width: $gridSizeDesktop;
    height: $gridSizeDesktop;
    padding: $marginSizeDesktop;
    margin: $marginSizeDesktop;
  }

  @each $index in (0,1,2,3) {
    &.player-#{$index} {
      background-image: url('~static/' + ($index + 1) + '.svg');
      background-repeat: no-repeat;
      background-position: center;

      @include until($tablet) {
        background-size: $gridSizeMobile / 1.6;
      }
      @include between($tablet, $desktop) {
        background-size: $gridSizeTablet / 1.6;
      }
      @include from($desktop) {
        background-size: $gridSizeDesktop / 1.6;
      }
    }
  }

  @each $row in (0,1,2,3,4) {
    @each $cell in (0,1,2,3,4) {
      &.player-position-#{$row}-#{$cell} {
        @include until($tablet) {
          transform: translate($cell * ($gridSizeMobile + 2 * $marginSizeMobile), $row * ($gridSizeMobile + 2 * $marginSizeMobile));
        }
        @include between($tablet, $desktop) {
          transform: translate($cell * ($gridSizeTablet + 2 * $marginSizeTablet), $row * ($gridSizeTablet + 2 * $marginSizeTablet));
        }
        @include from($desktop) {
          transform: translate($cell * ($gridSizeDesktop + 2 * $marginSizeDesktop), $row * ($gridSizeDesktop + 2 * $marginSizeDesktop));
        }
      }
    }
  }
}
</style>
