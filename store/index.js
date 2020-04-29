import costs from '~/mixins/costs'

const units = costs.data().units

export const state = () => ({
  buildings: {
    cursor: {
      count: 10,
      cost: 15,
      cps: 0.1,
      icon: 'hand-pointer',
    },
    cpu: {
      count: 5,
      cost: 100,
      cps: 1,
      icon: 'microchip',
    },
    process: {
      count: 0,
      cost: 1.1 * units.kilo,
      cps: 8,
      icon: 'project-diagram',
    },
    service: {
      count: 0,
      cost: 12 * units.kilo,
      cps: 47,
      icon: 'cogs',
    },
    computer: {
      count: 0,
      cost: 130 * units.kilo,
      cps: 260,
      icon: 'desktop',
    },
    cluster: {
      count: 0,
      cost: 1.4 * units.mega,
      cps: 1.4 * units.kilo,
      icon: 'network-wired',
    },
    dataCenter: {
      count: 0,
      cost: 20 * units.mega,
      cps: 7.8 * units.kilo,
      icon: 'database',
    },
  },
  clicks: 0,
  commerceAmount: 1,
  commerceAmounts: [1, 10, 100],
  commerceOperation: 'buy',
  defaultCommerceAmount: 1,
  factor: 1,
  upgrades: {},
})

export const mutations = {
  commerce(state, { id }) {
    let building = state.buildings[id]

    if (state.commerceOperation === 'buy') {
      let cost = costs.methods.buildingCost(building, state.commerceAmount)
      if (cost <= state.clicks) {
        state.clicks = Math.max(0, Math.round(state.clicks - cost))
        state.buildings[id].count += state.commerceAmount
      } else {
        console.error('cannot afford this', { cost, clicks: state.clicks })
      }
    } else if (state.commerceOperation === 'sell') {
      let amount = Math.min(state.commerceAmount, building.count)
      let cost = costs.methods.buildingCost(building, -amount)
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
    let upgrade = state.upgrades[id]

    if (upgrade.cost <= state.clicks) {
      if (upgrade.building) {
        state.buildings[upgrade.building].cps +=
          state.buildings[upgrade.building].cps * upgrade.factor
      } else {
        state.factor += state.factor * upgrade.factor
      }
      state.clicks = Math.round(state.clicks - upgrade.cost)
      upgrade.bought = true
    } else {
      console.error('cannot afford this', {
        cost: upgrade.cost,
        clicks: state.clicks,
      })
    }
  },
}
