<template>
  <section>
    {{ display }}<br />
    <input type="range" v-model="position" :min="min" :max="max" step="1" />
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/variables";

  input {
    width: 250px;
  }

</style>
