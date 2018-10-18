<template>
  <div :class="{ wrapper: true, isDark, isBigScreen }">
    <Timetable />
    <Slider />
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import Timetable from '~/components/Timetable.vue'
  import Slider from '~/components/Slider.vue'
  import has from 'lodash/has'

  export default {
    data: function () {
      return {
        interval: false
      }
    },
    components: {
      Timetable,
      Slider
    },
    computed: {
      ...mapState([
        'isDark',
        'isBigScreen'
      ])
    },
    methods: {
      ...mapActions([
        'updateTime',
        'setTheme',
        'setBigScreen'
      ])
    },
    created () {
      this.interval = setInterval(this.updateTime, 1000)
      this.setTheme(has(this.$route.query, 'dark'))
      this.setBigScreen(has(this.$route.query, 'screen'))
    },
    beforeDestroy () {
      clearInterval(this.interval)
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/variables";

  .wrapper {
    width: 100vw;
    display: flex;
    background-color: #fff;

    &.isDark {
      background-color: #000;
      color: rgba(255, 255, 255, 0.8);
    }

    &.isBigScreen {
      max-width: 46vw;
      margin: 0;
      margin-left: 2vw;
    }

    & > * {
      flex: 1;
    }
  }

</style>
