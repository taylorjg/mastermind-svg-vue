<template>
  <circle
    class="large-peg"
    :cx="cx"
    :cy="cy"
    :r="r"
    :fill="colour"
    @click="onClick"
  />
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "LargePegRaw",
  props: ["cx", "cy", "colour", "handler"],
  computed: {
    r: () => D.largePegRadius
  },
  methods: {
    onClick() {
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
