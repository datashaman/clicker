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
      >
        1
      </div>
      <div
        :class="commerceAmountClass(10)"
        @click="setDefaultCommerceAmount({ amount: 10 })"
      >
        10
      </div>
      <div
        :class="commerceAmountClass(100)"
        @click="setDefaultCommerceAmount({ amount: 100 })"
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
      bean.on(window, 'keyup', this.resetCommerceAmount)
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
      console.log(e.ctrlKey, e.shiftKey, e.key)
      if (e.ctrlKey && e.key === 'Control') {
        this.setCommerceAmount({ amount: 10 })
      } else if (e.shiftKey && e.key === 'Shift') {
        this.setCommerceAmount({ amount: 100 })
      }
    },
  },
}
</script>
