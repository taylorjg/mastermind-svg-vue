<template>
  <circle
    class="small-peg"
    :cx="cx"
    :cy="cy"
    :r="r"
    :fill="fill"
  />
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "SmallPeg",
  props: ["cx", "cy", "fill"],
  computed: {
    r: () => D.smallPegRadius
  }
};
</script>

<style>
.small-peg {
  fill-opacity: 1;
}
</style>
