<template>
  <section class="timetable">
    <ul>
      <Event v-for="(event, start) in currentDay" v-bind="event" :start="start" :key="event.id" ref="event" />
    </ul>
    <div
      v-if="isDark"
      class="overlay" />
  </section>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import Event from '~/components/Event.vue'
  import _ from 'lodash'
  import VueScrollTo from 'vue-scrollto'

  export default {
    computed: {
      ...mapState([
        'isDark'
      ]),
      ...mapGetters([
        'currentDay',
        'currentEvent',
        'isMorning'
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
      },
      currentDay: function () {
        const { scrollToCurrentEvent } = this
        scrollToCurrentEvent()
      }
    },
    methods: {
      scrollToCurrentEvent: _.throttle(function () {
        let el = _.find(this.$refs.event, event => {
          return parseInt(event.$el.id) === this.currentEvent
        })
        if (_.isUndefined(el)) {
          el = this.isMorning ? _.head(this.$refs.event) : _.last(this.$refs.event)
        }
        VueScrollTo.scrollTo(_.get(el, '$el', null), 500, { offset: -150 })
      }, 500)
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/variables";

  .overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 10vh;
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,000000+100&0+0,1+100 */
    background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#000000',GradientType=0 ); /* IE6-9 */
  }

</style>
