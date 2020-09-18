import Vue from 'vue'

const getRandomOpenPosition = (state) => {
  const openPositions = getOpenPositions(state)
  const index = Math.floor(Math.random() * openPositions.length)
  return openPositions[index]
}

const getOpenPositions = (state) => {
  const openPositions = []

  state.grid.forEach((row) => {
    row.cells.forEach((cell) => {
      if (cell.occupant === undefined && cell.object === undefined) {
        openPositions.push(cell.position)
      }
    })
  })

  return openPositions
}

export const state = function () {
  return {
    started: false,
    objects: [],
    players: [],
    turn: 0,
    grid: [],
    width: 5,
    height: 5,
    objectTypes: {
      wall: {
        isObstacle: true,
        count: 6
      }
    }
  }
}

export const mutations = {
  setStarted (state, payload) {
    state.started = payload
  },
  setObjects (state, payload) {
    state.objects = payload
  },
  setPlayers (state, payload) {
    state.players = payload
  },
  setTurn (state, payload) {
    state.turn = payload
  },
  setGrid (state, payload) {
    Vue.set(state, 'grid', payload)
  },
  setObjectPosition (state, payload) {
    // Set object object
    Vue.set(state.objects[payload.objectIndex], 'position', [...payload.position])

    // Set reference in grid cell
    state.grid[payload.position[0]].cells[payload.position[1]].object = payload.objectData

    // Set obstacle flag if the object is an obstacle
    if (payload.objectData.isObstacle) {
      state.grid[payload.position[0]].cells[payload.position[1]].obstacle = true
    }
  },
  setPlayerPosition (state, payload) {
    // Remove reference from old grid cell
    const oldPosition = state.players[payload.playerIndex].position
    if (oldPosition !== null) {
      delete state.grid[oldPosition[0]].cells[oldPosition[1]].occupant
    }

    // Set player object
    Vue.set(state.players[payload.playerIndex], 'position', [...payload.position])

    // Set reference in grid cell
    state.grid[payload.position[0]].cells[payload.position[1]].occupant = payload.playerIndex
  },
  setPlayerMoveStatus (state, payload) {
    state.players[payload.playerIndex].moved = payload.moved
  }
}

export const getters = {

}

export const actions = {
  startGame ({ commit, dispatch }, numPlayers) {
    commit('setStarted', true)
    dispatch('createGrid')
    dispatch('createObjects')
    dispatch('createPlayers', numPlayers)
  },
  endGame ({ commit }) {
    commit('setStarted', false)
    commit('setObjects', [])
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
          id: r + '-' + c,
          position: [r, c]
        })
      }
      grid.push(row)
    }
    commit('setGrid', grid)
  },
  createObjects ({ commit, dispatch, state }) {
    const objects = []

    for (const [type, typeData] of Object.entries(state.objectTypes)) {
      for (let i = 0; i < typeData.count; i++) {
        objects.push({
          index: objects.length,
          position: null,
          isObstacle: typeData.isObstacle,
          type
        })
      }
    }

    commit('setObjects', objects)
    dispatch('positionObjects')
  },
  positionObjects ({ commit, state }) {
    state.objects.forEach((object, index) => {
      commit('setObjectPosition', {
        objectIndex: index,
        position: getRandomOpenPosition(state),
        objectData: object
      })
    })
  },
  createPlayers ({ commit, dispatch }, numPlayers) {
    const players = []

    for (let i = 0; i < numPlayers; i++) {
      players.push({
        index: i,
        position: null,
        moved: false // Track whether the player has moved yet for this turn. Resets each turn.
      })
    }
    commit('setPlayers', players)
    dispatch('positionPlayers')
  },
  positionPlayers ({ commit, state }) {
    state.players.forEach((player, index) => {
      commit('setPlayerPosition', {
        playerIndex: index,
        position: getRandomOpenPosition(state)
      })
    })
  },
  movePlayers ({ commit, state }, direction) {
    // Loop as many times as players, for worst-case scenario when the last player is blocked by all others
    for (let attempt = 0; attempt < state.players.length; attempt++) {
      state.players.forEach((player, index) => {
        // If this player has already moved, do not try to move this player again
        if (player.moved) {
          return
        }

        const newPosition = [...player.position]

        if (direction === 'up') {
          newPosition[0] += -1 + state.height
          newPosition[0] %= state.height
        } else if (direction === 'down') {
          newPosition[0] += 1 + state.height
          newPosition[0] %= state.height
        } else if (direction === 'left') {
          newPosition[1] += -1 + state.width
          newPosition[1] %= state.width
        } else if (direction === 'right') {
          newPosition[1] += 1 + state.width
          newPosition[1] %= state.width
        }

        if (state.grid[newPosition[0]].cells[newPosition[1]].obstacle === undefined &&
          state.grid[newPosition[0]].cells[newPosition[1]].occupant === undefined) {
          commit('setPlayerPosition', {
            playerIndex: index,
            position: newPosition
          })

          // Mark the player as moved so it does not move again on the next loop
          commit('setPlayerMoveStatus', {
            playerIndex: index,
            moved: true
          })
        }
      })
    }

    // Reset all players for the next move
    state.players.forEach((player, index) => {
      commit('setPlayerMoveStatus', {
        playerIndex: index,
        moved: false
      })
    })
  }
}
