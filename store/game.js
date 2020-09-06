import Vue from 'vue'

export const state = function () {
  return {
    started: false,
    players: [],
    turn: 0,
    grid: [],
    width: 5,
    height: 5
  }
}

export const mutations = {
  setStarted (state, payload) {
    state.started = payload
  },
  setPlayers (state, payload) {
    state.players = payload
  },
  setTurn (state, payload) {
    state.turn = payload
  },
  setGrid (state, payload) {
    Vue.set(state, 'grid', payload)
  }
}

export const getters = {

}

export const actions = {
  startGame ({ commit, dispatch }, numPlayers) {
    commit('setStarted', true)
    commit('setPlayers', new Array(numPlayers))
    dispatch('createGrid')
  },
  endGame ({ commit }) {
    commit('setStarted', false)
    commit('setPlayers', [])
    commit('setTurn', 0)
    commit('setGrid', [])
  },
  createGrid ({ commit, state }) {
    const grid = []
    for (let r = 0; r < state.height; r++) {
      const row = {
        id: r,
        cells: []
      }
      for (let c = 0; c < state.width; c++) {
        row.cells.push({
          id: c
        })
      }
      grid.push(row)
    }
    commit('setGrid', grid)
  }
}
