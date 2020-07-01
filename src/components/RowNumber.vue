<template>
  <text class="row-number" :x="x" :y="y">{{ row + 1 }}</text>
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "RowNumber",
  props: ["row"],
  computed: {
    x() {
      return (D.smallPegLeftX + D.smallPegRightX) / 2;
    },
    y() {
      return D.firstRowCentreY - this.row * D.rowGapY;
    }
  }
};
</script>

<style>
.row-number {
  fill: rgb(146, 106, 54);
  text-anchor: middle;
  dominant-baseline: central;
  font-family: Arial;
  font-size: 12px;
  filter: url(#shadow);
}
</style>
