import costs from '~/mixins/costs'

const units = {
  kilo: 1000 ** 1,
  mega: 1000 ** 2,
  giga: 1000 ** 3,
  tera: 1000 ** 4,
  peta: 1000 ** 5,
  exa: 1000 ** 6,
  zetta: 1000 ** 7,
  yotta: 1000 ** 8,
}

export const state = () => ({
  buildings: {
    cursor: {
      count: 10,
      cost: 15,
      cps: 0.1,
    },
    cpu: {
      count: 5,
      cost: 100,
      cps: 1,
    },
    process: {
      count: 0,
      cost: 1.1 * units.kilo,
      cps: 8,
    },
    service: {
      count: 0,
      cost: 12 * units.kilo,
      cps: 47,
    },
    computer: {
      count: 0,
      cost: 130 * units.kilo,
      cps: 260,
    },
    cluster: {
      count: 0,
      cost: 1.4 * units.mega,
      cps: 1.4 * units.kilo,
    },
    dataCenter: {
      count: 0,
      cost: 20 * units.mega,
      cps: 7.8 * units.kilo,
    },
  },
  clicks: 0,
  factor: 1,
  upgrades: {},
})

export const mutations = {
  building(state, { id, amount }) {
    let building = state.buildings[id]
    let cost = costs.methods.buildingCost(building, amount)

    if (cost <= state.clicks) {
      state.clicks = Math.round(state.clicks - cost)
      state.buildings[id].count += amount
    } else {
      console.error('cannot afford this')
    }
  },
  click(state, { amount }) {
    state.clicks += amount
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
      console.error('cannot afford this')
    }
  },
}
