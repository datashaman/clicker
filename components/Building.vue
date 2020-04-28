<template>
  <div :class="buildingClass" @click.prevent="building(id)">
    <div class="text-2xl">
      <div class="float-right">{{ definition.count }}</div>
      {{ id }}
    </div>
    <div class="text-lg">
      <template v-if="scale > 1">x{{ scale }}</template>
      <fa-icon icon="bolt" />
      {{ renderAmount(cost) }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import costs from '~/mixins/costs'

export default {
  mixins: [costs],
  props: {
    id: {
      type: String,
      default: '',
    },
    purchaseAmount: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    ...mapState(['buildings']),
    amount: function () {
      return 1
    },
    buildingClass: function () {
      return this.cost <= this.$store.state.clicks
        ? 'font-bold cursor-pointer'
        : 'text-gray-700 font-hairline'
    },
    cost: function () {
      return this.buildingCost(this.definition, this.purchaseAmount)
    },
    definition: function () {
      return this.buildings[this.id]
    },
  },
  methods: {
    building: function (id) {
      this.$store.commit('building', { id, amount: this.purchaseAmount })
    },
  },
}
</script>
