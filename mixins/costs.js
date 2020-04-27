export default {
  methods: {
    buildingCost(building, amount) {
      return building.count
        ? building.cost * building.costFactor * building.count * amount
        : building.cost * amount
    },
  },
}
