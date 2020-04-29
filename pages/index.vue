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
import { mapState } from 'vuex'
import BuildingList from '~/components/BuildingList'
import ClickPanel from '~/components/ClickPanel'
import CommercePanel from '~/components/CommercePanel'

export default {
  components: {
    BuildingList,
    ClickPanel,
    CommercePanel,
  },
  data: () => {
    return {
      manualCps: 0,
    }
  },
  computed: {
    ...mapState(['buildings']),
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
}
</script>
