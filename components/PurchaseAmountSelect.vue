<template>
  <ul>
    <li
      v-for="amount in purchaseAmounts"
      :key="amount"
      class="w-1/3 inline-block text-center cursor-pointer"
      @click="setDefaultPurchaseAmount({ amount })"
      @keyup="resetPurchaseAmount()"
    >
      <template v-if="amount === purchaseAmount">
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
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['purchaseAmount', 'purchaseAmounts']),
  },
  mounted: function () {
    this.$nextTick(() => {
      window.addEventListener('keydown', this.keydown)
      window.addEventListener('keyup', this.keyup)
    })
  },
  methods: {
    ...mapMutations([
      'resetPurchaseAmount',
      'setDefaultPurchaseAmount',
      'setPurchaseAmount',
    ]),
    keydown: function (e) {
      if (e.ctrlKey) {
        this.setPurchaseAmount({ amount: 10 })
      } else if (e.shiftKey) {
        this.setPurchaseAmount({ amount: 100 })
      } else {
        this.resetPurchaseAmount()
      }
    },
    keyup: function () {
      this.resetPurchaseAmount()
    },
  },
}
</script>
