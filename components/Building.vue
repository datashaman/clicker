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
      <div
        v-if="count"
        class="float-right font-light"
        :title="
          renderAmount(effectiveCps) +
          '/s per ' +
          id +
          '; ' +
          shareOfCps +
          '% of total'
        "
      >
        <fa-icon icon="bolt" />
        {{ renderAmount(count * effectiveCps) }}/s
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
import { buildings, upgrades } from '~/themes/default'

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
          ? 'font-bold cursor-pointer mb-3'
          : 'font-light text-gray-600 mb-3'
      }

      return this.count > 0
        ? 'font-bold cursor-pointer text-red-700 mb-3'
        : 'text-gray-600 mb-3'
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
    effectiveCps: function () {
      let state = JSON.parse(JSON.stringify(this.$store.state))

      state.upgrades.forEach((id) => {
        upgrades[id].reward(state)
      })

      return state.buildings[this.id].cps
    },
    shareOfCps: function () {
      let effectiveCps = this.$store.getters.effectiveCps

      return Math.round(
        effectiveCps === 0
          ? 0
          : ((this.effectiveCps * this.count) / effectiveCps) * 100
      )
    },
  },
  mounted: function () {
    this.$nextTick(() => {
      setInterval(() => {
        this.$store.commit('click', {
          amount: this.count * this.effectiveCps,
        })
      }, 1000)
    })
  },
  methods: {
    ...mapMutations(['commerce']),
  },
}
</script>
