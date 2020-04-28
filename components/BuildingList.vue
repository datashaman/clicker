<template>
  <ul>
    <li v-for="(defn, id) in buildings" :key="id">
      <Building :id="id" />
    </li>
  </ul>
</template>
<script>
import { mapState } from 'vuex'
import Building from '~/components/Building'

export default {
  components: {
    Building,
  },
  computed: {
    ...mapState(['buildings']),
  },
}
</script>
