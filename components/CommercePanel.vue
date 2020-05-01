<template>
  <div class="bg-gray-300 text-center p-2 rounded-sm h-16">
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

    <div class="flex">
      <div
        :class="commerceAmountClass(1)"
        @click="setDefaultCommerceAmount({ amount: 1 })"
        @keyup="resetCommerceAmount()"
      >
        1
      </div>
      <div
        :class="commerceAmountClass(10)"
        @click="setDefaultCommerceAmount({ amount: 10 })"
        @keyup.ctrl.exact="resetCommerceAmount()"
      >
        10
      </div>
      <div
        :class="commerceAmountClass(100)"
        @click="setDefaultCommerceAmount({ amount: 100 })"
        @keyup.shift.exact="resetCommerceAmount()"
      >
        100
      </div>
    </div>
  </div>
</template>
<script>
import bean from 'bean'
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['commerceAmount', 'commerceOperation']),
  },
  mounted: function () {
    this.$nextTick(() => {
      bean.on(window, 'keydown', this.keydown)
      bean.on(window, 'keyup', this.keyup)
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
    commerceAmountClass(amount) {
      return (
        'flex-1 ' +
        (amount === this.commerceAmount
          ? 'font-bold'
          : 'font-light cursor-pointer')
      )
    },
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
