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
      <template v-if="commerceOperation === 'buy' || definition.count">
        {{ commerceOperation === 'buy' ? '+' : '-'
        }}{{
          commerceOperation === 'buy'
            ? commerceAmount
            : Math.min(definition.count, commerceAmount)
        }}
        <fa-icon icon="bolt" /> {{ renderAmount(cost) }}
      </template>
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
          ? 'font-bold cursor-pointer px-2 my-2'
          : 'text-gray-700 px-2 my-2'
      }

      return this.definition.count > 0
        ? 'font-bold cursor-pointer px-2 text-red-700 my-2'
        : 'text-gray-700 px-2 my-2'
    },
    cost: function () {
      let amount

      if (this.commerceOperation === 'buy') {
        amount = this.commerceAmount
      } else {
        amount = -Math.min(this.definition.count, this.commerceAmount)
      }

      let result = this.buildingCost(this.definition, amount)

      if (this.commerceOperation === 'sell') {
        result /= 2
      }

      return result
    },
    definition: function () {
      return this.buildings[this.id]
    },
  },
  mounted: function () {
    this.$nextTick(() => {
      setInterval(() => {
        this.$store.commit('click', {
          amount: this.definition.count * this.definition.cps,
        })
      }, 1000)
    })
  },
  methods: {
    ...mapMutations(['commerce']),
  },
}
</script>
