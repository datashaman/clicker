<template>
  <div :class="buildingClass" @click="commerce({ id })">
    <div class="leading-tight text-2xl">
      <div class="float-right">
        {{ definition.count }}
      </div>
      <div class="float-left w-10">
        <fa-icon :icon="definition.icon" />
      </div>
      {{ id }}
    </div>
    <div class="text-sm">
      <template v-if="commerceAmount > 1"> +{{ commerceAmount }} </template>
      <fa-icon icon="bolt" /> {{ renderAmount(cost) }}
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
    ...mapState(['buildings', 'commerceAmount', 'commerceOperation']),
    amount: function () {
      return 1
    },
    buildingClass: function () {
      if (this.commerceOperation === 'buy') {
        return this.cost <= this.$store.state.clicks
          ? 'font-bold cursor-pointer px-2 m-2'
          : 'text-gray-700 px-2 m-2'
      }

      return this.definition.count > 0
        ? 'font-bold cursor-pointer px-2'
        : 'text-gray-700 px-2'
    },
    cost: function () {
      return this.buildingCost(this.definition, this.commerceAmount)
    },
    definition: function () {
      return this.buildings[this.id]
    },
  },
  methods: {
    ...mapMutations(['commerce']),
  },
}
</script>
