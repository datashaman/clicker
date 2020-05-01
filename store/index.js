import bean from 'bean'
import costs from '~/mixins/costs'
import { buildings, upgrades } from '~/themes/default'

const initialState = () => {
  let started = new Date()

  let state = {
    buildings: {},
    clicks: 0,
    commerceAmount: 1,
    commerceOperation: 'buy',
    defaultCommerceAmount: 1,
    factor: 1,
    legacy: {
      clicks: 0,
      cells: 0,
      resetCounter: 0,
      spentCells: 0,
      started: started,
      upgrades: [],
    },
    runClicks: 0,
    started: started,
    upgrades: [],
  }

  let keys = Object.keys(buildings)

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    let building = buildings[key]
    state.buildings[key] = {
      count: building.count,
      cps: building.cps,
    }
  }

  return state
}

export const state = () => initialState()

const units = costs.data().units

export const getters = {
  cells: function (state) {
    const clicks = state.legacy.clicks || 0

    return parseInt(Math.cbrt(clicks / (1 * units.tera)))
  },
  effectiveCps: function (state) {
    state = JSON.parse(JSON.stringify(state))

    state.upgrades.forEach((id) => {
      let upgrade = upgrades[id]
      upgrade.reward(state)
    })

    return Object.keys(state.buildings).reduce((acc, key) => {
      let building = state.buildings[key]
      acc += building.count * building.cps
      return acc
    }, 0)
  },
}

export const actions = {
  random({ dispatch }, args) {
    args = args || {}

    const randomNumber = Math.random() * 100

    switch (true) {
      case randomNumber < 5:
        dispatch('storm', args)
        break
      default:
        dispatch('bolt', args)
    }
  },
  storm({ dispatch }, args) {
    args = args || {}
    args.storm = true

    const bolts = 16 + Math.random() * 16

    for (let i = 0; i < bolts; i++) {
      setTimeout(() => {
        dispatch('bolt', args)
      }, 1000 * i + Math.random() * 300 - 150)
    }
  },
  bolt({ commit, state }, args) {
    args = args || {}

    let el = document.getElementById('clicker')

    if (!el) {
      return
    }

    el = el.cloneNode(true)

    const vx = Math.min(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )

    const vy = Math.min(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    )

    const fontSize = Number(((Math.random() * 4 + 1) / 2).toFixed(1))

    const rotate = parseInt(Math.random() * 3) * 30 - 60
    const rotateClass = (rotate < 0 ? '-' : '') + 'rotate-' + Math.abs(rotate)

    el.classList.add('transform')
    el.classList.add(rotateClass)

    if (args.storm) {
      el.classList.add('duration-500')
    } else {
      el.classList.add('duration-3000')
    }

    el.style.opacity = 0
    el.style.position = 'absolute'
    el.style.fontSize = fontSize + 'em'
    el.style.left = 80 + parseInt(Math.random() * (vx - 160)) + 'px'
    el.style.top = 80 + parseInt(Math.random() * (vy - 240)) + 'px'

    el = document.body.appendChild(el)

    el.classList.add('transition')

    bean.one(el, 'click', (e) => {
      el.style.opacity = 0

      let amount = parseInt(((2.5 + Math.random() * 5) / 100) * state.clicks)

      if (args.storm) {
        amount = parseInt(amount / 4)
      }

      commit('click', { amount })

      let note = document.createElement('DIV')
      note.innerText = costs.methods.renderAmount(amount)
      note.style.fontWeight = 'bold'
      note.style.position = 'absolute'
      note.style.left = -(Math.random() * 45) + e.pageX + 22.5 + 'px'
      note.style.top = -(Math.random() * 45) + e.pageY - 25 + 'px'
      note.classList.add('transition')
      note.classList.add('duration-700')
      note.classList.add('ease-out')
      note = document.body.appendChild(note)

      setTimeout(() => {
        if (document.body.contains(el)) {
          setTimeout(() => {
            document.body.removeChild(el)
          }, 3000)
        }

        note.style.opacity = 0
        setTimeout(() => {
          document.body.removeChild(note)
        }, 800)
      }, 250)
    })

    el.style.opacity = 1

    const duration = args.storm
      ? 2000 + Math.random() * 2000
      : 5000 + Math.random() * 7000

    setTimeout(() => {
      if (document.body.contains(el)) {
        el.style.opacity = 0

        setTimeout(() => {
          if (document.body.contains(el)) {
            document.body.removeChild(el)
          }
        }, 3000)
      }
    }, duration)
  },
}

export const mutations = {
  commerce(state, { id }) {
    let definition = buildings[id]
    let building = state.buildings[id]

    if (state.commerceOperation === 'buy') {
      let cost = costs.methods.buildingCost(
        definition,
        building,
        state.commerceAmount
      )
      if (cost <= state.clicks) {
        state.clicks = Math.max(0, Math.round(state.clicks - cost))
        state.buildings[id].count += state.commerceAmount
      } else {
        console.error('cannot afford this', { cost, clicks: state.clicks })
      }
    } else if (state.commerceOperation === 'sell') {
      let amount = Math.min(state.commerceAmount, building.count)
      let cost = costs.methods.buildingCost(definition, building, -amount)
      if (cost) {
        state.clicks = Math.max(0, Math.round(state.clicks + cost / 2))
        state.buildings[id].count -= amount
      }
    } else {
      throw new Error(
        'Unhandled commerce operation: ' + state.commerceOperation
      )
    }
  },
  click(state, { amount }) {
    state.clicks += amount
    state.runClicks += amount
    if (state.legacy) {
      state.legacy.clicks += amount
    }
  },
  migrate(state) {
    if (!state.legacy) {
      state.legacy = {
        clicks: 0,
        cells: 0,
        resetCounter: 0,
        spentCells: 0,
        started: new Date(),
        upgrades: [],
      }
    }

    if (!state.legacy.cells) {
      state.legacy.cells = 0
    }

    if (!state.legacy.spentCells) {
      state.legacy.spentCells = 0
    }

    if (!state.buildings.internet) {
      state.buildings.internet = {
        count: 0,
        cps: buildings.internet.cps,
      }
    }

    if (!state.runClicks) {
      state.runClicks = 0
    }
  },
  reset(state) {
    const s = initialState()
    const legacy = state.legacy || {}
    legacy.cells = parseInt(this.getters.cells)
    const resetCounter = state.resetCounter || legacy.resetCounter || 0

    Object.keys(s).forEach((key) => {
      state[key] = s[key]
    })

    state.legacy = legacy

    state.legacy.resetCounter = resetCounter + 1
    delete state.resetCounter
  },
  resetCommerceAmount(state) {
    state.commerceAmount = state.defaultCommerceAmount
  },
  setDefaultCommerceAmount(state, { amount }) {
    state.commerceAmount = state.defaultCommerceAmount = amount
  },
  setCommerceAmount(state, { amount }) {
    state.commerceAmount = amount
  },
  setCommerceOperation(state, { operation }) {
    state.commerceOperation = operation
  },
  upgrade(state, { id }) {
    let upgrade = upgrades[id]

    if (state.upgrades.indexOf(id) !== -1) {
      console.error('upgrade already bought')
      return
    }

    if (upgrade.cost <= state.clicks) {
      state.clicks = Math.round(state.clicks - upgrade.cost)
      state.upgrades.push(id)
    } else {
      console.error('cannot afford this', {
        cost: upgrade.cost,
        clicks: state.clicks,
      })
    }
  },
}
