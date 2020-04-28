<template>
  <div class="text-center">
    <div class="bg-red-400 m-4 rounded-lg shadow">
      <div class="h-28">
        <fa-icon
          icon="bolt"
          class="h-20 cursor-pointer text-4xl hover:text-5xl"
          @click="click"
        />
      </div>
    </div>

    <div class="text-lg font-bold">
      <fa-icon icon="bolt" />
      {{ renderAmount(Math.round(clicks)) }}
    </div>

    <div class="text-xs font-light">
      <fa-icon icon="bolt" />
      {{ renderAmount(cps) }}/s
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import costs from '~/mixins/costs'

export default {
  mixins: [costs],
  data: () => {
    return {
      manualCps: 0,
    }
  },
  computed: {
    ...mapState(['buildings', 'clicks', 'factor']),
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
  methods: {
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
