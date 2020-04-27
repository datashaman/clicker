import costs from '~/mixins/costs'

export const state = () => ({
  buildings: {
    A: {
      count: 0,
      cost: 10,
      costFactor: 0.1,
      cps: 10,
    },
    B: {
      count: 0,
      cost: 100,
      costFactor: 0.2,
      cps: 100,
    },
    C: {
      count: 0,
      cost: 1000,
      costFactor: 0.4,
      cps: 1000,
    },
  },
  clicks: 0,
  factor: 1,
  upgrades: {
    'manual': {
      bought: false,
      factor: 0.05,
      title: 'Manual',
    },
    'manual++': {
      bought: false,
      factor: 0.05,
      title: 'Manual++',
    },
    'a+': {
      bought: false,
      building: 'A',
      factor: 0.05,
      title: 'A+',
    },
    'a++': {
      bought: false,
      building: 'A',
      factor: 0.1,
      title: 'A++',
    },
    'b+': {
      bought: false,
      building: 'B',
      factor: 0.05,
      title: 'B+',
    },
    'c+': {
      bought: false,
      building: 'C',
      factor: 0.05,
      title: 'C+',
    },
  },
})

export const mutations = {
  building (state, { id, amount }) {
    let building = state.buildings[id]
    let cost = costs.methods.buildingCost(building, amount)

    if (cost <= state.clicks) {
      state.clicks -= cost
      state.buildings[id].count += amount
    } else {
      console.error('cannot afford this')
    }
  },
  click (state, { amount }) {
    state.clicks += amount
  },
  upgrade (state, { id }) {
    let upgrade = state.upgrades[id]

    if (upgrade.building) {
      state.buildings[upgrade.building].cps += state.buildings[upgrade.building].cps * upgrade.factor
    } else {
      state.factor += state.factor * upgrade.factor
    }

    upgrade.bought = true
  }
}
