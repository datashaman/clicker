<template>
  <div class="flex" @selectstart.prevent>
    <div class="flex-none w-40" @click.prevent="click">
      <div class="text-center">
        <div class="bg-red-400">
          <div class="h-20">
            click here
          </div>
        </div>

        <h2>
          <fa-icon icon="bolt" />
          {{ renderAmount(Math.round(clicks)) }}
        </h2>
      </div>
    </div>

    <div class="flex-grow">
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
          <Building :id="id" :scale="scale" />
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
      scale: 1,
    }
  },
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
    },
    keydown: function (e) {
      if (e.ctrlKey) {
        this.scale = 10
      } else if (e.shiftKey) {
        this.scale = 100
      } else {
        this.scale = 1
      }
    },
    keyup: function () {
      this.scale = 1
    },
    upgrade: function (id) {
      this.$store.commit('upgrade', { id })
    },
  },
}
</script>
