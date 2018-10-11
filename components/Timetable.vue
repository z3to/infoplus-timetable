<template>
  <ul class="timetable">
    <Event v-for="(event, start) in currentDay" v-bind="event" :start="start" :key="event.id" ref="event" />
  </ul>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Event from '~/components/Event.vue'
  import _ from 'lodash'
  import VueScrollTo from 'vue-scrollto'

  export default {
    computed: {
      ...mapGetters([
        'currentDay',
        'currentEvent'
      ])
    },
    components: {
      Event
    },
    watch: {
      currentEvent: function (newEvent, oldEvent) {
        if (newEvent !== oldEvent) {
          const { scrollToCurrentEvent } = this
          scrollToCurrentEvent()
        }
      }
    },
    methods: {
      scrollToCurrentEvent: _.throttle(function () {
        const el = _.find(this.$refs.event, event => {
          return parseInt(event.$el.id) === this.currentEvent
        })
        VueScrollTo.scrollTo(_.get(el, '$el', null), 500, { offset: -100 })
      }, 500)
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/variables";

</style>
