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
    cx() {
      return D.firstLargePegX + this.col * D.largePegGapX;
    },
    cy() {
      return this.row < 0
        ? D.secretRowCentreY
        : D.firstRowCentreY - this.row * D.rowGapY;
    },
    r() {
      return D.largePegHoleRadius;
    },
    strokeWidth() {
      return D.largePegHoleStroke;
    }
  },
  methods: {
    onClick() {
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
