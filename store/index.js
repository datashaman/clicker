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
      cost: 1000,
      factor: 0.05,
      title: 'Manual',
      required: 100,
    },
    'manual++': {
      bought: false,
      cost: 5000,
      factor: 0.05,
      title: 'Manual++',
      required: 1000,
    },
    'a+': {
      bought: false,
      cost: 5000,
      building: 'A',
      factor: 0.05,
      title: 'A+',
      required: 100,
    },
    'a++': {
      bought: false,
      cost: 10000,
      building: 'A',
      factor: 0.1,
      title: 'A++',
      required: 1000,
    },
    'b+': {
      bought: false,
      cost: 50000,
      building: 'B',
      factor: 0.05,
      title: 'B+',
      required: 10000,
    },
    'c+': {
      bought: false,
      cost: 100000,
      building: 'C',
      factor: 0.05,
      title: 'C+',
      required: 100000,
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

    if (upgrade.cost <= state.clicks) {
      if (upgrade.building) {
        state.buildings[upgrade.building].cps += state.buildings[upgrade.building].cps * upgrade.factor
      } else {
        state.factor += state.factor * upgrade.factor
      }
      state.clicks -= upgrade.cost
      upgrade.bought = true
    } else {
      console.error('cannot afford this')
    }
  }
}
