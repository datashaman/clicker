<template>
  <div class="container flex" @selectstart.prevent>
    <div class="flex-none w-40">
      <div class="text-center">
        <div class="bg-red-400 m-4">
          <div class="h-20">
            <fa-icon
              icon="bolt"
              class="h-20 cursor-pointer text-4xl hover:text-6xl"
              @click.prevent="click"
            />
          </div>
        </div>

        <div class="text-lg font-bold">
          <fa-icon icon="bolt" />
          {{ renderAmount(Math.round(clicks)) }}
        </div>

        <div class="text-xs font-light">
          <fa-icon icon="bolt" />
          {{ renderAmount(cps) }} CpS
        </div>
      </div>
    </div>

    <div class="flex-none mt-4 w-48">
      <PurchaseAmountSelect />
      <BuildingList />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import BuildingList from '~/components/BuildingList'
import PurchaseAmountSelect from '~/components/PurchaseAmountSelect'
import costs from '~/mixins/costs'

export default {
  components: {
    BuildingList,
    PurchaseAmountSelect,
  },
  mixins: [costs],
  data: () => {
    return {
      manualCps: 0,
    }
  },
  computed: {
    ...mapState(['buildings', 'clicks', 'factor', 'upgrades']),
    cps: function () {
      return (
        this.manualCps +
        Object.keys(this.buildings).reduce((acc, id) => {
          let building = this.buildings[id]
          acc += building.count * building.cps
          return acc
        }, 0)
      )
    },
  },
  mounted: function () {
    this.$nextTick(() => {
      Object.keys(this.buildings).forEach((id) => {
        setInterval(() => {
          let building = this.buildings[id]
          this.$store.commit('click', { amount: building.count * building.cps })
        }, 1000)
      })
    })
  },
  methods: {
    ...mapMutations(['upgrade']),
    click: function () {
      this.$store.commit('click', { amount: this.factor })
      this.manualCps += this.factor
      setTimeout(() => {
        this.manualCps -= this.factor
      }, 1000)
    },
  },
}
</script>
