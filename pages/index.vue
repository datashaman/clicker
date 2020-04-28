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

    <div class="flex-none m-4 w-48">
      <ul>
        <li
          v-for="amount in purchaseAmounts"
          :key="amount"
          class="w-1/3 inline-block text-center"
          @click="setPurchaseAmount({ amount })"
        >
          <template v-if="amount === purchaseAmount">
            <div class="font-bold">
              {{ amount }}
            </div>
          </template>
          <template v-else>
            <div class="font-light">
              {{ amount }}
            </div>
          </template>
        </li>
      </ul>
      <BuildingList />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import BuildingList from '~/components/BuildingList'
import costs from '~/mixins/costs'

export default {
  components: {
    BuildingList,
  },
  mixins: [costs],
  data: () => {
    return {
      manualCps: 0,
    }
  },
  computed: {
    ...mapState([
      'buildings',
      'clicks',
      'factor',
      'purchaseAmount',
      'purchaseAmounts',
      'upgrades',
    ]),
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
        let building = this.buildings[id]
        setInterval(() => {
          this.$store.commit('click', { amount: building.count * building.cps })
        }, 1000)
      })

      window.addEventListener('keydown', this.keydown)
      window.addEventListener('keyup', this.keyup)
    })
  },
  methods: {
    ...mapMutations(['setPurchaseAmount', 'upgrade']),
    click: function () {
      this.$store.commit('click', { amount: this.factor })
      this.manualCps += this.factor
      setTimeout(() => {
        this.manualCps -= this.factor
      }, 1000)
    },
    keydown: function (e) {
      if (e.ctrlKey) {
        this.setPurchaseAmount({ amount: 10 })
      } else if (e.shiftKey) {
        this.setPurchaseAmount({ amount: 100 })
      } else {
        this.setPurchaseAmount({ amount: 1 })
      }
    },
    keyup: function () {
      this.setPurchaseAmount({ amount: 1 })
    },
  },
}
</script>
