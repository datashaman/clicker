<template>
  <div class="pl-4">
    <div class="flex mb-2">
      <div class="flex-1 cursor-pointer" @click="setCurrent('available')">
        <span :class="{ 'font-bold': current === 'available' }">available</span>
      </div>
      <div
        class="flex-1 cursor-pointer text-right"
        @click="setCurrent('bought')"
      >
        <span :class="{ 'font-bold': current === 'bought' }">
          bought ({{ Object.keys(bought).length }}/{{ total }})
        </span>
      </div>
    </div>

    <div class="overflow-auto" style="height: 450px;">
      <div
        v-for="(definition, id) in this[current]"
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
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import costs from '~/mixins/costs'
import { upgrades } from '~/themes/default'

export default {
  mixins: [costs],
  data: () => ({
    current: 'available',
  }),
  computed: {
    ...mapState(['clicks', 'upgrades']),
    available: function () {
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
    bought: function () {
      let result = {}
      let keys = Object.keys(upgrades)

      for (let i = 0; i < keys.length; i++) {
        let key = keys[i]
        let definition = upgrades[key]

        if (this.upgrades.indexOf(key) !== -1) {
          result[key] = definition
        }
      }

      return result
    },
    total: function () {
      return Object.keys(upgrades).length
    },
  },
  methods: {
    ...mapMutations(['upgrade']),
    setCurrent: function (current) {
      this.current = current
    },
    upgradeClass: function (upgrade) {
      let classes = 'leading-tight mb-2'

      if (this.current === 'available' && this.clicks >= upgrade.cost) {
        classes += ' cursor-pointer'
      } else {
        classes += ' font-light text-gray-600'
      }

      return classes
    },
  },
}
</script>
