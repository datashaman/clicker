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
import BuildingList from '~/components/BuildingList'
import ClickPanel from '~/components/ClickPanel'
import CommercePanel from '~/components/CommercePanel'

export default {
  components: {
    BuildingList,
    ClickPanel,
    CommercePanel,
  },
}
</script>
