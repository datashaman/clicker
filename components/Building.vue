<template>
  <div :class="buildingClass" @click="commerce({ id })">
    <div class="leading-tight text-2xl">
      <div class="float-right">
        {{ count }}
      </div>
      <div class="float-left w-10">
        <fa-icon :icon="definition.icon" />
      </div>
      {{ id }}
    </div>
    <div class="text-sm">
      <div v-if="count" class="float-right font-light">
        <fa-icon icon="bolt" />
        {{ renderAmount(count * cps) }}/s
      </div>
      <template v-if="commerceOperation === 'buy' || count">
        {{ commerceOperation === 'buy' ? '+' : '-'
        }}{{
          commerceOperation === 'buy'
            ? commerceAmount
            : Math.min(count, commerceAmount)
        }}
        <fa-icon icon="bolt" /> {{ renderAmount(cost) }}
      </template>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import costs from '~/mixins/costs'
import { buildings } from '~/themes/default'

export default {
  mixins: [costs],
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState(['buildings', 'clicks', 'commerceAmount', 'commerceOperation']),
    amount: function () {
      return 1
    },
    buildingClass: function () {
      if (this.commerceOperation === 'buy') {
        return this.cost <= this.clicks
          ? 'font-bold cursor-pointer px-2 my-2'
          : 'text-gray-700 px-2 my-2'
      }

      return this.count > 0
        ? 'font-bold cursor-pointer px-2 text-red-700 my-2'
        : 'text-gray-700 px-2 my-2'
    },
    cost: function () {
      let amount

      if (this.commerceOperation === 'buy') {
        amount = this.commerceAmount
      } else {
        amount = -Math.min(this.count, this.commerceAmount)
      }

      let building = this.buildings[this.id]
      let result = this.buildingCost(this.definition, building, amount)

      if (this.commerceOperation === 'sell') {
        result /= 2
      }

      return result
    },
    cps: function () {
      return this.buildings[this.id].cps
    },
    count: function () {
      return this.buildings[this.id].count
    },
    definition: function () {
      return buildings[this.id]
    },
  },
  mounted: function () {
    this.$nextTick(() => {
      setInterval(() => {
        this.$store.commit('click', {
          amount: this.count * this.cps,
        })
      }, 1000)
    })
  },
  methods: {
    ...mapMutations(['commerce']),
  },
}
</script>
