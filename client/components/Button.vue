<template>
  <g class="button" @click="handler">
    <rect
      class="button-outer-rect"
      :x="outerRectX"
      :y="outerRectY"
      :width="outerRectWidth"
      :height="outerRectHeight"
      :stroke-width="outerRectStrokeWidth"
    />
    <rect
      class="button-inner-rect"
      :x="innerRectX"
      :y="innerRectY"
      :width="innerRectWidth"
      :height="innerRectHeight"
    />
    <text class="button-text" :x="textX" :y="textY">{{ label }}</text>
  </g>
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "Button",
  props: ["x", "y", "width", "height", "label", "handler"],
  computed: {
    outerRectX() {
      return this.x;
    },
    outerRectY() {
      return this.y;
    },
    outerRectWidth() {
      return this.width;
    },
    outerRectHeight() {
      return this.height;
    },
    outerRectStrokeWidth() {
      return D.HALF_BORDER;
    },
    innerRectX() {
      return this.x + D.HALF_BORDER;
    },
    innerRectY() {
      return this.y + D.HALF_BORDER;
    },
    innerRectWidth() {
      return this.width - D.BORDER;
    },
    innerRectHeight() {
      return this.height - D.BORDER;
    },
    textX() {
      return this.x + this.width / 2;
    },
    textY() {
      return this.y + this.height / 2;
    }
  }
};
</script>

<style scoped>
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
