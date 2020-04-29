<template>
  <div class="pl-4">
    <div
      v-for="(definition, id) in availableUpgrades"
      :key="id"
      :class="upgradeClass(definition)"
      @click="upgrade({ id })"
    >
      <div>
        <fa-icon :icon="definition.icon" />
        <span class="font-bold">{{ definition.name }}</span>
      </div>
      {{ definition.description }}
      <fa-icon icon="bolt" /> {{ renderAmount(definition.cost) }}
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import costs from '~/mixins/costs'
import { upgrades } from '~/themes/default'

export default {
  mixins: [costs],
  computed: {
    ...mapState(['clicks', 'upgrades']),
    availableUpgrades: function () {
      let result = {}
      let keys = Object.keys(upgrades)

      for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        let definition = upgrades[key]

        if (
          this.upgrades.indexOf(key) === -1 &&
          definition.unlock(this.$store.state)
        ) {
          result[key] = definition
        }
      }

      return result
    },
  },
  methods: {
    ...mapMutations(['upgrade']),
    upgradeClass: function (upgrade) {
      let classes = 'leading-tight mb-2'

      if (this.clicks >= upgrade.cost) {
        classes += ' cursor-pointer'
      } else {
        classes += ' font-light text-gray-600'
      }

      return classes
    },
  },
}
</script>
