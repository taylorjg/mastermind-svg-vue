<template>
  <circle
    class="large-peg"
    :cx="cx"
    :cy="cy"
    :r="r"
    :fill="fill"
  />
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "LargePeg",
  props: ["cx", "cy", "fill"],
  computed: {
    r: () => D.largePegRadius
  }
};
</script>

<style>
.large-peg {
  fill-opacity: 1;
}
</style>
