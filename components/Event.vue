<template>
  <li :class="{ 'event': true, isNow, isPast }">
    <span class="time">{{ startTime }}</span>
    <hgroup>
      <h1 class="speaker">{{ label }}</h1>
      <h2>{{ subtitle }}</h2>
    </hgroup>
  </li>
</template>

<script>
  import { mapState } from 'vuex'
  import isWithinRange from 'date-fns/is_within_range'
  import isBefore from 'date-fns/is_before'
  import format from 'date-fns/format'

  export default {
    props: ['label', 'start', 'duration', 'startDatetime', 'endDatetime', 'subtitle'],
    computed: {
      ...mapState([
        'currentDatetime'
      ]),
      isPast: function () {
        const { currentDatetime, endDatetime } = this
        return isBefore(endDatetime, currentDatetime)
      },
      isNow: function () {
        const { currentDatetime, startDatetime, endDatetime } = this
        return isWithinRange(currentDatetime, startDatetime, endDatetime)
      },
      startTime: function () {
        return format(this.startDatetime, 'HH:mm')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/variables";

  .event {
    display: flex;

    & > * {
      margin: 0.5rem 0.2rem;
    }
  }

</style>
