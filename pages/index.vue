<template>
  <div class="container flex" @selectstart.prevent>
    <div class="flex-none w-40">
      <ClickPanel />
    </div>

    <div class="flex-none mt-4 w-64">
      <CommercePanel />
      <BuildingList />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import BuildingList from '~/components/BuildingList'
import ClickPanel from '~/components/ClickPanel'
import CommercePanel from '~/components/CommercePanel'
import costs from '~/mixins/costs'

export default {
  components: {
    BuildingList,
    ClickPanel,
    CommercePanel,
  },
  mixins: [costs],
  data: () => {
    return {
      manualCps: 0,
    }
  },
  computed: {
    ...mapState(['buildings', 'clicks', 'factor']),
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
    ...mapMutations(['resetCommerceAmount']),
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
