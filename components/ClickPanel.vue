<template>
  <div>
    <div class="bg-red-400 m-4 rounded-full shadow text-center">
      <div class="h-32">
        <fa-icon
          id="clicker"
          icon="bolt"
          class="h-32 cursor-pointer text-4xl hover:text-6xl"
          style="position: relative; left: 0.16rem;"
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

    <div class="m-4 leading-relaxed text-right text-xs">
      <div class="font-bold text-base">All Time</div>

      <div v-if="legacy.started">
        started
        <span :title="new Date(legacy.started).toLocaleString()">
          {{ formatDate(legacy.started) }}
        </span>
      </div>

      <div v-if="legacy.clicks">
        <fa-icon icon="bolt" />
        {{ renderAmount(legacy.clicks) }}
      </div>

      <div>
        <span title="stored">
          {{ renderAmount(legacy.cells - legacy.spentCells) }}
        </span>
        / <span title="earned">{{ renderAmount(cells) }}</span> cells
      </div>

      <div>{{ legacy.resetCounter || resetCounter || 0 }} resets</div>

      <div class="font-bold text-base">Run</div>

      <div v-if="started">
        <div>
          started
          <span :title="new Date(started).toLocaleString()">
            {{ formatDate(started) }}
          </span>
        </div>
      </div>

      <div v-if="legacy.clicks">
        <fa-icon icon="bolt" />
        {{ renderAmount(runClicks) }}
      </div>

      <div>
        <span title="earned">
          {{ renderAmount(cells - legacy.cells) }} cells
        </span>
      </div>

      <div class="font-bold text-base">Version</div>

      <div v-if="source_version">
        {{ source_version }}
      </div>
    </div>

    <div class="text-center text-4xl">
      <fa-icon class="cursor-pointer" icon="power-off" @click="reset" />
    </div>
  </div>
</template>
<script>
import { format } from 'timeago.js'
import costs from '~/mixins/costs'
import { mapGetters, mapState } from 'vuex'
import { upgrades } from '~/themes/default'

export default {
  mixins: [costs],
  data: () => {
    return {
      manualCps: 0,
    }
  },
  computed: {
    ...mapGetters(['cells', 'source_version']),
    ...mapState([
      'clicks',
      'factor',
      'buildings',
      'legacy',
      'resetCounter',
      'runClicks',
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
      el.classList.add('text-gray-200')
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
    formatDate: format,
    reset: function () {
      if (confirm('Are you sure?')) {
        this.$store.commit('reset')
      }
    },
  },
}
</script>
