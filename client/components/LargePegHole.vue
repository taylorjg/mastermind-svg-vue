<template>
  <circle
    class="large-peg-hole"
    :cx="cx"
    :cy="cy"
    :r="r"
    :stroke-width="strokeWidth"
    @click="onClick"
  />
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "LargePegHole",
  props: ["row", "col", "handler"],
  computed: {
    cx: function() {
      return D.firstLargePegX + (this.col - 1) * D.largePegGapX;
    },
    cy: function() {
      return this.row < 0
        ? D.secretRowCentreY
        : D.firstRowCentreY - (this.row - 1) * D.rowGapY;
    },
    r: function() {
      return D.largePegHoleRadius;
    },
    strokeWidth: function() {
      return D.largePegHoleStroke;
    }
  },
  methods: {
    onClick: function() {
      this.handler && this.handler(this.row, this.col);
    }
  }
};
</script>

<style>
.large-peg-hole {
  stroke: rgb(146, 106, 54);
  fill-opacity: 1;
  fill: rgb(90, 58, 16);
}
</style>
