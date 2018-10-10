<template>
  <ul>
    <Event v-for="(event, start) in events" v-bind="event" :start="start" />
  </ul>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Event from '~/components/Event.vue'

  export default {
    data: function () {
      return {
        date: false
      }
    },
    computed: {
      ...mapGetters([
        'events'
      ])
    },
    components: {
      Event
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/variables";

</style>
