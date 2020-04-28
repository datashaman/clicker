<template>
  <div class="container" @selectstart.prevent>
    <h1 class="title" @click.prevent="click">
      click here
    </h1>

    <h2>
      {{ Math.round(clicks) }}
    </h2>

    <h3>Upgrades</h3>

    <ul>
      <template v-for="(defn, id) in upgrades">
        <li v-if="clicks >= defn.required || defn.bought" :key="id">
          <div v-if="defn.bought">
            <strike>{{ defn.title }}</strike>
          </div>
          <a v-else @click.prevent="upgrade(id)">
            {{ defn.title }} ({{ defn.cost }})
          </a>
        </li>
      </template>
    </ul>

    <h3>Buildings</h3>

    <ul>
      <li v-for="(defn, id) in buildings" :key="id">
        {{ id }} {{ defn.count }} x {{ defn.cps }}cps:
        <a @click.prevent="building(id, 1)">
          +1 ({{ buildingCost(defn, 1) }})
        </a>
        <a @click.prevent="building(id, 10)">
          +10 ({{ buildingCost(defn, 10) }})
        </a>
        <a @click.prevent="building(id, 100)">
          +100 ({{ buildingCost(defn, 100) }})
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import costs from '~/mixins/costs'

export default {
  mixins: [costs],
  computed: {
    ...mapState(['buildings', 'clicks', 'cps', 'factor', 'upgrades']),
  },
  mounted: function () {
    this.$nextTick(() => {
      Object.keys(this.buildings).forEach((id) => {
        let building = this.buildings[id]
        setInterval(() => {
          this.$store.commit('click', { amount: building.count * building.cps })
        }, 1000)
      })
    })
  },
  methods: {
    building: function (id, amount) {
      this.$store.commit('building', { id, amount })
    },
    click: function () {
      this.$store.commit('click', { amount: this.factor })
    },
    upgrade: function (id) {
      this.$store.commit('upgrade', { id })
    },
  },
}
</script>
