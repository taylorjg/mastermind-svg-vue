<template>
  <circle
    class="small-peg"
    :cx="cx"
    :cy="cy"
    :r="r"
    :fill="colour"
  />
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "SmallPeg",
  props: ["row", "col", "colour"],
  computed: {
    cx() {
      return this.col % 2 === 0 ? D.smallPegLeftX : D.smallPegRightX;
    },
    cy() {
      return D.firstRowCentreY - (this.row * D.rowGapY) + D.smallPegGapY * (this.col >= 2 ? +1 : -1);
    },
    r: () => D.smallPegRadius
  }
};
</script>

<style>
.small-peg {
  fill-opacity: 1;
}
</style>
