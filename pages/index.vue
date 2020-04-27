<template>
  <div class="container" @selectstart.prevent>
    <h1 class="title" @click.prevent="click">
      click here
    </h1>

    <h2>
      {{ clicks.toFixed(3) }}
    </h2>

    <h3>Upgrades</h3>

    <ul>
      <li v-for="(defn, id) in upgrades">
        <div v-if="defn.bought"><strike>{{ defn.title }}</strike></div>
        <a v-else @click.prevent="upgrade(id)">{{ defn.title }}</a>
      </li>
    </ul>

    <h3>Buildings</h3>

    <ul>
      <li v-for="(defn, id) in buildings">
        {{ id }} {{ defn.count }} x {{ defn.cps }}cps:
        <a @click.prevent="building(id, 1)">+1</a>
        <a @click.prevent="building(id, 10)">+10</a>
        <a @click.prevent="building(id, 100)">+100</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'buildings',
      'clicks',
      'cps',
      'factor',
      'upgrades',
    ])
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
}
</script>
