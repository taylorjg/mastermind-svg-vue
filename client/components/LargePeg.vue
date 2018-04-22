<template>
  <circle
    class="large-peg"
    :cx="cx"
    :cy="cy"
    :r="r"
    :fill="fill"
    @click="onClick"
  />
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "LargePeg",
  props: ["cx", "cy", "fill", "handler"],
  computed: {
    r: () => D.largePegRadius
  },
  methods: {
    onClick: function() {
      this.handler && this.handler();
    }
  }
};
</script>

<style>
.large-peg {
  fill-opacity: 1;
}
</style>
