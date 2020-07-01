<template>
  <LargePegRaw
    :cx="cx"
    :cy="cy"
    :colour="colour"
    :handler="handler && handler.bind(this, row, col)"
  />
</template>

<script>
import * as D from "../dimensions";
import LargePegRaw from "./LargePegRaw.vue";

export default {
  name: "LargePeg",
  props: ["row", "col", "colour", "handler"],
  computed: {
    cx() {
      return D.firstLargePegX + this.col * D.largePegGapX;
    },
    cy() {
      return this.row < 0
        ? D.secretRowCentreY
        : D.firstRowCentreY - this.row * D.rowGapY;
    }
  },
  components: {
    LargePegRaw
  }
};
</script>
