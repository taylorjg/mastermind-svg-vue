<template>
  <circle
    class="small-peg-hole"
    :cx="cx"
    :cy="cy"
    :r="r"
    :stroke-width="strokeWidth"
  />
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "SmallPegHole",
  props: ["row", "col"],
  computed: {
    cx: function() {
      return this.col % 2 === 1 ? D.smallPegLeftX : D.smallPegRightX;
    },
    cy: function() {
      return D.firstRowCentreY - this.row * D.rowGapY + D.smallPegGapY * (this.col >= 2 ? +1 : -1);
    },
    r: function() {
      return D.smallPegHoleRadius;
    },
    strokeWidth: function() {
      return D.smallPegHoleStroke;
    }
  }
};
</script>

<style>
.small-peg-hole {
  stroke: rgb(146, 106, 54);
  fill-opacity: 1;
  fill: rgb(90, 58, 16);
}
</style>
