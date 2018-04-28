<template>
  <g class="button" @click="handler">
    <rect
      class="button-outer-rect"
      :x="outerRectBox.x"
      :y="outerRectBox.y"
      :width="outerRectBox.width"
      :height="outerRectBox.height"
      :stroke-width="outerRectStrokeWidth"
    />
    <rect
      class="button-inner-rect"
      :x="innerRectBox.x"
      :y="innerRectBox.y"
      :width="innerRectBox.width"
      :height="innerRectBox.height"
    />
    <text class="button-text" :x="centre.x" :y="centre.y">{{ label }}</text>
  </g>
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "Button",
  props: ["x", "y", "width", "height", "label", "handler"],
  computed: {
    outerRectBox() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
    },
    outerRectStrokeWidth() {
      return D.HALF_BORDER;
    },
    innerRectBox() {
      return {
        x: this.x + D.HALF_BORDER,
        y: this.y + D.HALF_BORDER,
        width: this.width - D.BORDER,
        height: this.height - D.BORDER
      };
    },
    centre() {
      return {
        x: this.x + this.width / 2,
        y: this.y + this.height / 2
      };
    }
  }
};
</script>

<style>
.button {
  cursor: pointer;
}

.button:hover text {
  font-weight: bold;
}

.button-outer-rect {
  stroke: rgb(90, 58, 16);
  fill: rgb(141, 97, 40);
}

.button-inner-rect {
  fill: rgb(90, 58, 16);
}

.button-text {
  fill: #fff;
  text-anchor: middle;
  dominant-baseline: central;
  font-family: Arial;
  font-size: 12px;
}
</style>
