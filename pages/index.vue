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

        <div class="text-lg">
          <fa-icon icon="bolt" />
          {{ renderAmount(Math.round(clicks)) }}
        </div>

        <div>
          <fa-icon icon="bolt" />
          {{ renderAmount(cps) }} CpS
        </div>
      </div>
    </div>

    <div class="flex-none m-4 w-48">
      <ul>
        <li v-for="(defn, id) in buildings" :key="id">
          <Building :id="id" :purchaseAmount="purchaseAmount" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Building from '~/components/Building'
import costs from '~/mixins/costs'

export default {
  components: {
    Building,
  },
  mixins: [costs],
  data: () => {
    return {
      manualCps: 0,
      purchaseAmount: 1,
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
    building: function (id, amount) {
      this.$store.commit('building', { id, amount })
    },
    click: function () {
      this.$store.commit('click', { amount: this.factor })
      this.manualCps += this.factor
      setTimeout(() => {
        this.manualCps -= this.factor
      }, 1000)
    },
    keydown: function (e) {
      if (e.ctrlKey) {
        this.purchaseAmount = 10
      } else if (e.shiftKey) {
        this.purchaseAmount = 100
      } else {
        this.purchaseAmount = 1
      }
    },
    keyup: function () {
      this.purchaseAmount = 1
    },
    upgrade: function (id) {
      this.$store.commit('upgrade', { id })
    },
  },
}
</script>
