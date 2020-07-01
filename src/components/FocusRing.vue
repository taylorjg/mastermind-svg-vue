<template>
  <circle
    class="focus-ring"
    :cx="cx"
    :cy="cy"
    :r="r"
    @click="onClick"
  />
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "FocusRing",
  props: ["row", "col", "handler"],
  computed: {
    cx() {
      return D.firstLargePegX + this.col * D.largePegGapX;
    },
    cy() {
      return D.firstRowCentreY - this.row * D.rowGapY;
    },
    r() {
      return (D.largePegHoleOuterRadius + D.largePegHoleRadius) / 2
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
.focus-ring {
  stroke: #88abff;
  stroke-width: 1;
  stroke-dasharray: 3 3;
  fill: transparent;
}
</style>
