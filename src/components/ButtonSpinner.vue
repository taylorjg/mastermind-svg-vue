<template>
  <g class="button" @click="onClick">

    <defs>
      <!-- https://mobiforge.com/design-development/how-to-build-an-animated-loading-spinner -->
      <g id="spinner" transform="translate(-24, -24)">
        <circle cx="24" cy="4" r="4" fill="#fff"/>
        <circle cx="12.19" cy="7.86" r="3.7" fill="#fffbf2"/>
        <circle cx="5.02" cy="17.68" r="3.4" fill="#fef7e4"/>
        <circle cx="5.02" cy="30.32" r="3.1" fill="#fef3d7"/>
        <circle cx="12.19" cy="40.14" r="2.8" fill="#feefc9"/>
        <circle cx="24" cy="44" r="2.5" fill="#feebbc"/>
        <circle cx="35.81" cy="40.14" r="2.2" fill="#fde7af"/>
        <circle cx="42.98" cy="30.32" r="1.9" fill="#fde3a1"/>
        <circle cx="42.98" cy="17.68" r="1.6" fill="#fddf94"/>
        <circle cx="35.81" cy="7.86" r="1.3" fill="#fcdb86"/>
      </g>
    </defs>
    
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
    <g v-if="showSpinner" :transform="`translate(${centre.x}, ${centre.y}) scale(${spinnerScale}, ${spinnerScale})`">
      <use class="spinner" href="#spinner" />
    </g>
    <text v-else class="button-text" :x="centre.x" :y="centre.y">{{ label }}</text>
  </g>
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "ButtonSpinner",
  props: ["x", "y", "width", "height", "label", "showSpinner", "handler"],
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
    },
    enabled() {
      return !this.showSpinner;
    },
    spinnerScale() {
      return this.innerRectBox.height * 0.75 / 48;
    }
  },
  methods: {
    onClick() {
      this.enabled && this.handler && this.handler();
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

.spinner {
  transition-property: transform;
  animation-name: rotate;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
