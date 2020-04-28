<template>
  <div :class="buildingClass + ' p-2'" @click="build({ id })">
    <div class="text-2xl">
      <div class="float-right">
        {{ definition.count }}
      </div>
      {{ id }}
    </div>
    <div>
      <template v-if="purchaseAmount > 1"> x{{ purchaseAmount }} </template>
      <fa-icon icon="bolt" />
      {{ renderAmount(cost) }}
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import costs from '~/mixins/costs'

export default {
  mixins: [costs],
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState(['buildings', 'purchaseAmount']),
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
    ...mapMutations(['build']),
  },
}
</script>
