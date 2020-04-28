export default {
  data: () => {
    return {
      units: {
        kilo: 1000 ** 1,
        mega: 1000 ** 2,
        giga: 1000 ** 3,
        tera: 1000 ** 4,
        peta: 1000 ** 5,
        exa: 1000 ** 6,
        zetta: 1000 ** 7,
        yotta: 1000 ** 8,
      },
    }
  },
  methods: {
    buildingCost(building, amount) {
      return Math.round(
        (building.cost *
          (1.15 ** (building.count + amount) - 1.15 ** building.count)) /
          0.15
      )
    },
    renderAmount(amount) {
      if (amount < 1000) {
        return amount
      }

      let selected = null
      let keys = Object.keys(this.units)
      let length = keys.length
      let value

      for (let index = 0; index < length; index++) {
        let key = keys[index]
        value = this.units[key]
        if (amount / value < 1000) {
          selected = key
          break
        }
      }

      if (selected) {
        return Number((amount / value).toFixed(3)) + selected[0].toUpperCase()
      }

      throw new Error('Cannot find unit for amount')
    },
  },
}
