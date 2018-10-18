<template>
  <li :class="{ 'event': true, isNow, isPast, isLightningTalk }">
    <span :class="{ time: true, isLightningTalkTitle }">{{ startTime }}</span>
    <div class="title">
      <span v-if="isLightningTalkTitle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.2 12.9">
          <path d="M6.8 0L0 7.4h3.5l-1.3 5.5 7-7.7H5.4z"/>
        </svg>
        Lightning Talks
      </span>
      <header class="header">
        <h1 :class="{ isAdministrative, isLightningTalk }">{{ author }}</h1>
        <span v-if="isKeynote" :class="{ isKeynote }">Keynote</span>
      </header>
      <h2 v-if="!isAdministrative && !isLightningTalk">{{ title }}</h2>
    </div>
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
      isLightningTalk: function () {
        return this.category === 'lightning' || this.category === 'lightningtitle'
      },
      isLightningTalkTitle: function () {
        return this.category === 'lightningtitle'
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

    &.isLightningTalk {
      margin: 1rem 0;
    }

    &:first-child {
      margin-top: 4vh;
    }

    &:last-child {
      margin-bottom: 4vh;
    }

    & > * {
      margin: 0 0.2rem;

      &.time {
        flex: 1;
        text-align: right;
        margin-right: 1rem;
        margin-top: .2em;

        &.isLightningTalkTitle {
          margin-top: 2rem;
        }
      }

      &.title {
        flex: 5;

        svg {
          height: 1rem;
          transform: translateY(2px);
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
      }
    }
  }

</style>
