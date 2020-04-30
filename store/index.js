import costs from '~/mixins/costs'
import { buildings, upgrades } from '~/themes/default'

const initialState = () => {
  let state = {
    buildings: {},
    clicks: 0,
    commerceAmount: 1,
    commerceAmounts: [1, 10, 100],
    commerceOperation: 'buy',
    defaultCommerceAmount: 1,
    factor: 1,
    resetCounter: 0,
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

export const getters = {
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
  random(context) {
    let el = document.getElementById('clicker').cloneNode(true)
    let x = Math.random() * (screen.availWidth - 200)
    let y = Math.random() * (screen.availHeight - 200)

    el.classList.add('random')
    el.style.position = 'absolute'
    el.style.fontSize = '0.5em'
    el.style.left = -(Math.random() * 30) + x + 15 + 'px'
    el.style.top = -(Math.random() * 25) + y - 25 + 'px'

    el = document.body.appendChild(el)

    el.addEventListener('click', () => {
      let amount = ((2 + Math.random() * 8) / 100) * context.state.clicks
      context.commit('click', { amount })
      document.body.removeChild(el)
    })

    setTimeout(() => {
      if (document.body.contains(el)) {
        document.body.removeChild(el)
      }
    }, 3000 + Math.random() * 7000)
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
  },
  reset(state) {
    const s = initialState()
    const resetCounter = state.resetCounter || 0
    Object.keys(s).forEach((key) => {
      state[key] = s[key]
    })
    state.resetCounter = resetCounter + 1
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
