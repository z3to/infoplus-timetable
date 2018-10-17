<template>
  <section class="slider">
    {{ display }}<br />
    <input type="range" v-model="position" :min="min" :max="max" step="1" />
    <input type="checkbox" v-model="isDynamicTime" /> Dynamic time
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import getTime from 'date-fns/get_time'
  import parse from 'date-fns/parse'
  import format from 'date-fns/format'

  export default {
    computed: {
      ...mapState([
        'currentDatetime'
      ]),
      min: function () {
        return getTime(new Date(2018, 9, 20, 7, 0, 0))
      },
      max: function () {
        return getTime(new Date(2018, 9, 21, 18, 0, 0))
      },
      display: function () {
        return format(this.currentDatetime, 'DD.MM.YYYY HH:mm')
      },
      position: {
        get () {
          return getTime(this.$store.state.currentDatetime)
        },
        set (value) {
          this.$store.commit('SET_CURRENT_TIME', parse(parseInt(value)))
        }
      },
      isDynamicTime: {
        get () {
          return getTime(this.$store.state.isDynamicTime)
        },
        set (value) {
          this.$store.commit('SET_DYNAMIC_TIME', value)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/variables";

  .slider {
    opacity: 0;
    position: fixed;
    bottom: 0;
    background-color: #222;
    color: #fff;

    &:hover {
      opacity: 1;
    }

    input {
      width: 100vw;
    }
  }

</style>
