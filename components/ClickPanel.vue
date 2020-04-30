<template>
  <div class="text-center">
    <div class="bg-red-400 m-4 rounded-lg shadow">
      <div class="h-28">
        <fa-icon
          id="clicker"
          icon="bolt"
          class="h-20 cursor-pointer text-4xl hover:text-5xl"
          @click="click"
        />
      </div>
    </div>

    <div class="text-lg font-bold">
      <fa-icon icon="bolt" />
      {{ renderAmount(Math.round(clicks)) }}
    </div>

    <div class="text-xs font-light">
      <fa-icon icon="bolt" />
      {{ renderAmount(cps) }}/s
    </div>

    <div class="mt-12">
      <button class="p-2 rounded-lg text-white bg-red-800" @click="reset">
        RESET
      </button>
      <div class="text-sm">{{ resetCounter || 0 }}</div>
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
    ...mapState(['clicks', 'factor', 'buildings', 'resetCounter']),
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

      this.$store.commit('click', { amount: state.factor })
      this.manualCps += state.factor

      let el = document.createElement('DIV')
      el.innerText = state.factor
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
