export default {
  methods: {
    buildingCost(building, amount) {
      return Math.round(
        (building.cost *
          (1.15 ** (building.count + amount) - 1.15 ** building.count)) /
          0.15
      )
    },
  },
}
