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
      if (cell.occupant === undefined && cell.obstacle === undefined) {
        openPositions.push(cell.position)
      }
    })
  })

  return openPositions
}

export const state = function () {
  return {
    started: false,
    obstacles: [],
    players: [],
    turn: 0,
    grid: [],
    width: 5,
    height: 5,
    obstacleCount: 6
  }
}

export const mutations = {
  setStarted (state, payload) {
    state.started = payload
  },
  setObstacles (state, payload) {
    state.obstacles = payload
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
  setObstaclePosition (state, payload) {
    // Set obstacle object
    Vue.set(state.obstacles[payload.obstacleIndex], 'position', [...payload.position])

    // Set reference in grid cell
    state.grid[payload.position[0]].cells[payload.position[1]].obstacle = payload.obstacleIndex
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
  }
}

export const getters = {

}

export const actions = {
  startGame ({ commit, dispatch }, numPlayers) {
    commit('setStarted', true)
    dispatch('createGrid')
    dispatch('createObstacles')
    dispatch('createPlayers', numPlayers)
  },
  endGame ({ commit }) {
    commit('setStarted', false)
    commit('setObstacles', [])
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
  createObstacles ({ commit, dispatch, state }) {
    const obstacles = []

    for (let i = 0; i < state.obstacleCount; i++) {
      obstacles.push({
        index: i,
        position: null
      })
    }
    commit('setObstacles', obstacles)
    dispatch('positionObstacles')
  },
  positionObstacles ({ commit, state }) {
    state.obstacles.forEach((obstacle, index) => {
      commit('setObstaclePosition', {
        obstacleIndex: index,
        position: getRandomOpenPosition(state)
      })
    })
  },
  createPlayers ({ commit, dispatch }, numPlayers) {
    const players = []

    for (let i = 0; i < numPlayers; i++) {
      players.push({
        index: i,
        position: null
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
    state.players.forEach((player, index) => {
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

      commit('setPlayerPosition', {
        playerIndex: index,
        position: newPosition
      })
    })
  }
}
