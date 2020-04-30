<template>
  <div>
    <div class="bg-red-400 m-4 rounded-lg shadow text-center">
      <div class="h-32">
        <fa-icon
          id="clicker"
          icon="bolt"
          class="h-32 cursor-pointer text-4xl hover:text-6xl"
          @click="click"
        />
      </div>
    </div>

    <div class="text-lg font-bold text-center">
      <fa-icon icon="bolt" />
      {{ renderAmount(Math.round(clicks)) }}
    </div>

    <div class="text-xs font-light text-center">
      <fa-icon icon="bolt" />
      {{ renderAmount(cps) }}/s
    </div>

    <div class="mx-2 my-4 text-right">
      <div class="text-sm">
        <div class="font-bold">Resets</div>
        {{ legacy.resetCounter || resetCounter || 0 }}
      </div>
      <div v-if="legacy.clicks" class="text-sm">
        <div class="font-bold">All Time</div>
        <fa-icon icon="bolt" /> {{ renderAmount(legacy.clicks) }}
      </div>
      <div v-if="legacy.started" class="text-sm">
        <div class="font-bold">Started</div>
        {{ new Date(legacy.started).toLocaleString() }}
      </div>
      <div v-if="started" class="text-sm">
        <div class="font-bold">Started Run</div>
        {{ new Date(started).toLocaleString() }}
      </div>
    </div>

    <div class="mb-4 mt-6 text-center">
      <button class="p-2 rounded-lg text-white bg-red-800" @click="reset">
        RESET
      </button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import costs from '~/mixins/costs'
import { upgrades } from '~/themes/default'

export default {
  mixins: [costs],
  data: () => {
    return {
      manualCps: 0,
    }
  },
  computed: {
    ...mapState([
      'clicks',
      'factor',
      'buildings',
      'legacy',
      'resetCounter',
      'started',
    ]),
    cps: function () {
      return this.manualCps + this.$store.getters.effectiveCps
    },
  },
  methods: {
    click: function (e) {
      let state = JSON.parse(JSON.stringify(this.$store.state))

      state.upgrades.forEach((id) => {
        let upgrade = upgrades[id]
        upgrade.reward(state)
      })

      let factor = Math.round(state.factor)

      this.$store.commit('click', { amount: factor })
      this.manualCps += factor

      let el = document.createElement('DIV')
      el.innerText = this.renderAmount(state.factor)
      el.style.color = '#ffffff'
      el.style.backgroundColor = 'transparent'
      el.style.fontWeight = 'bold'
      el.style.position = 'absolute'
      el.style.left = -(Math.random() * 30) + e.pageX + 15 + 'px'
      el.style.top = -(Math.random() * 25) + e.pageY - 25 + 'px'
      el = document.body.appendChild(el)

      setTimeout(() => {
        this.manualCps -= state.factor
        document.body.removeChild(el)
      }, 1000)
    },
    reset: function () {
      if (confirm('Are you sure?')) {
        this.$store.commit('reset')
      }
    },
  },
}
</script>
