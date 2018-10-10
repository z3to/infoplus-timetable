<template>
  <div class="wrapper">
    <Timetable />
    <Slider />
  </div>
</template>

<script>
  import Timetable from '~/components/Timetable.vue'
  import Slider from '~/components/Slider.vue'

  export default {
    components: {
      Timetable,
      Slider
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/variables";

  .wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;

    & > * {
      flex: 1;
    }
  }

</style>
