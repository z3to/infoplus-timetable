<template>
  <li :class="{ 'event': true, isNow, isPast }">
    <span class="time">{{ startTime }}</span>
    <hgroup class="title">
      <header class="header">
        <h1 :class="{ isAdministrative }">{{ author }}</h1>
        <span v-if="isKeynote" :class="{ isKeynote }">Keynote</span>
      </header>
      <h2 v-if="!isAdministrative">{{ title }}</h2>
    </hgroup>
  </li>
</template>

<script>
  import { mapState } from 'vuex'
  import isWithinRange from 'date-fns/is_within_range'
  import isBefore from 'date-fns/is_before'
  import format from 'date-fns/format'

  export default {
    props: ['category', 'title', 'author', 'start', 'duration', 'startDatetime', 'endDatetime', 'subtitle'],
    computed: {
      ...mapState([
        'currentDatetime'
      ]),
      isAdministrative: function () {
        return this.category === 'administrative'
      },
      isKeynote: function () {
        return this.category === 'keynote'
      },
      isPast: function () {
        const { currentDatetime, endDatetime } = this
        return isBefore(endDatetime, currentDatetime)
      },
      isNow: function () {
        const { currentDatetime, startDatetime, endDatetime } = this
        return isWithinRange(currentDatetime, startDatetime, endDatetime)
      },
      startTime: function () {
        return format(this.startDatetime, 'hh:mm a')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/variables";

  .event {
    display: flex;
    margin: 2rem 0;

    &:first-child {
      margin-top: 15vh;
    }

    &:last-child {
      margin-bottom: 15vh;
    }

    & > * {
      margin: 0 0.2rem;

      &.time {
        flex: 1;
        text-align: right;
        margin-right: 1rem;
        margin-top: .2em;
      }

      &.title {
        flex: 5;

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
      }
    }
  }

</style>
