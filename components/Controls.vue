<template>
  <div class="section">
    <div v-if="!started" class="columns is-centered">
      <div v-for="n in [2, 3, 4]" :key="n" class="column is-narrow has-text-centered">
        <div class="is-inline-block has-text-centered start-button py-5 px-6" tabindex="0" @click="startGame(n)">
          <p class="is-size-1">
            {{ n }}
          </p>
          <p>
            players
          </p>
        </div>
      </div>
    </div>
    <div v-else class="has-text-centered">
      <button class="button is-danger" @click="endGame">
        End Game
      </button>
      <button class="button is-primary" @click="movePlayers('up')">
        Up
      </button>
      <button class="button is-primary" @click="movePlayers('down')">
        Down
      </button>
      <button class="button is-primary" @click="movePlayers('left')">
        Left
      </button>
      <button class="button is-primary" @click="movePlayers('right')">
        Right
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('game', [
      'started'
    ])
  },
  methods: {
    ...mapActions('game', [
      'startGame',
      'endGame',
      'movePlayers'
    ])
  }
}
</script>

<style scoped lang="scss">
  .start-button {
    background-color: $primary;
    border-radius: $radius;
    color: $white;
    cursor: pointer;
    &:hover {
      background-color: darken($primary, 2.5%);
    }
  }
</style>
