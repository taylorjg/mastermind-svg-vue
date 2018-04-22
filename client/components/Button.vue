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
    <text class="button-text" :x="textX" :y="textY">{{label}}</text>
  </g>
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "Button",
  props: ["x", "y", "width", "height", "label", "handler"],
  computed: {
    outerRectX: function() {
      return this.x;
    },
    outerRectY: function() {
      return this.y;
    },
    outerRectWidth: function() {
      return this.width;
    },
    outerRectHeight: function() {
      return this.height;
    },
    outerRectStrokeWidth: () => D.HALF_BORDER,
    innerRectX: function() {
      return this.x + D.HALF_BORDER;
    },
    innerRectY: function() {
      return this.y + D.HALF_BORDER;
    },
    innerRectWidth: function() {
      return this.width - D.BORDER;
    },
    innerRectHeight: function() {
      return this.height - D.BORDER;
    },
    textX: function() {
      return this.x + this.width / 2;
    },
    textY: function() {
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
  font-weight: bolder;
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
