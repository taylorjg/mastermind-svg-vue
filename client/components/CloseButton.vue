<template>
  <g class="close-button" @click="onClose">
    <circle :cx="cx" :cy="cy" :r="r" />
    <path :d="crossPathData" />
  </g>
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "CloseButton",
  props: ["cx", "cy", "onClose"],
  computed: {
    r() {
      return 12;
    },
    crossPathData() {
      const d = 5;
      const dd = d * 2;
      const diagonal1 = `M${this.cx - d},${this.cy - d} l${+dd},${dd}`;
      const diagonal2 = `M${this.cx + d},${this.cy - d} l${-dd},${dd}`;
      return `${diagonal1} ${diagonal2}`;
    }
  }
};
</script>

<style scoped>
.close-button {
  cursor: pointer;
}

.close-button circle {
  fill-opacity: 1;
  fill: black;
  stroke-width: 2;
  stroke: white;
}

.close-button path {
  stroke-width: 2;
  stroke: white;
}
</style>
