<template>
  <div class="text-center">
    <div class="flex">
      <div
        class="flex-1 cursor-pointer"
        accesskey="b"
        @click="setCommerceOperation({ operation: 'buy' })"
      >
        <span :class="{ 'font-bold': commerceOperation === 'buy' }">
          buy
        </span>
      </div>
      <div
        class="flex-1 cursor-pointer"
        accesskey="s"
        @click="setCommerceOperation({ operation: 'sell' })"
      >
        <span :class="{ 'font-bold': commerceOperation === 'sell' }">
          sell
        </span>
      </div>
    </div>

    <ul class="w-full">
      <li
        v-for="amount in commerceAmounts"
        :key="amount"
        class="w-1/3 inline-block cursor-pointer"
        @click="setDefaultCommerceAmount({ amount })"
        @keyup="resetCommerceAmount()"
      >
        <template v-if="amount === commerceAmount">
          <div class="font-bold">
            {{ amount }}
          </div>
        </template>
        <template v-else>
          <div class="font-light">
            {{ amount }}
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['commerceAmount', 'commerceAmounts', 'commerceOperation']),
  },
  mounted: function () {
    this.$nextTick(() => {
      window.addEventListener('keydown', this.keydown)
      window.addEventListener('keyup', this.keyup)
      this.resetCommerceAmount()
    })
  },
  methods: {
    ...mapMutations([
      'resetCommerceAmount',
      'setDefaultCommerceAmount',
      'setCommerceOperation',
      'setCommerceAmount',
    ]),
    keydown: function (e) {
      if (e.ctrlKey) {
        this.setCommerceAmount({ amount: 10 })
      } else if (e.shiftKey) {
        this.setCommerceAmount({ amount: 100 })
      } else {
        this.resetCommerceAmount()
      }
    },
    keyup: function () {
      this.resetCommerceAmount()
    },
  },
}
</script>
