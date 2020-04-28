<template>
  <div @click.prevent="building(id)">
    <div class="text-2xl">{{ id }} {{ definition.count }}</div>
    <div class="text-lg">
      <template v-if="scale > 1">x{{ scale }}</template>
      {{ renderAmount(cost) }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import costs from '~/mixins/costs'

export default {
  mixins: [costs],
  props: {
    id: {
      type: String,
      default: '',
    },
    scale: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    ...mapState(['buildings']),
    amount: function () {
      return 1
    },
    cost: function () {
      return this.buildingCost(this.definition, this.scale)
    },
    definition: function () {
      return this.buildings[this.id]
    },
  },
  methods: {
    building: function (id) {
      this.$store.commit('building', { id, amount: this.scale })
    },
  },
}
</script>
