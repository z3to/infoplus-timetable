<template>
  <div :class="{ wrapper: true, isDark }">
    <Timetable />
    <Slider />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
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
      isDark: function () {
        return has(this.$route.query, 'dark')
      }
    },
    methods: {
      ...mapActions([
        'updateTime'
      ])
    },
    created () {
      this.interval = setInterval(this.updateTime, 1000)
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

    & > * {
      flex: 1;
    }
  }

</style>
