<template>
  <g>
    <rect
      class="modal-outer-rect"
      :x="outerRectBox.x"
      :y="outerRectBox.y"
      :width="outerRectBox.width"
      :height="outerRectBox.height"
      :stroke-width="outerRectStroke"
      rx="5"
      ry="5"
    />
    <rect
      class="modal-inner-rect"
      :x="innerRectBox.x"
      :y="innerRectBox.y"
      :width="innerRectBox.width"
      :height="innerRectBox.height"
      rx="5"
      ry="5"
    />
    <CloseButton
      :cx="closeButtonData.cx"
      :cy="closeButtonData.cy"
      :onClose="onClose"
    />
    <slot />
  </g>
</template>

<script>
import * as D from "../dimensions";
import CloseButton from "./CloseButton.vue";
import { HALF_BORDER } from "../dimensions";

export default {
  name: "Modal",
  props: ["x", "y", "width", "height", "onClose"],
  computed: {
    outerRectBox() {
      return {
        x: this.x - D.BORDER,
        y: this.y - D.BORDER,
        width: this.width + 2 * D.BORDER,
        height: this.height + 2 * D.BORDER
      };
    },
    outerRectStroke() {
      return D.BORDER;
    },
    innerRectBox() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
    },
    closeButtonData() {
      return {
        cx: this.x + this.width + 1.5 * D.HALF_BORDER,
        cy: this.y - 1.5 * HALF_BORDER
      };
    }
  },
  components: {
    CloseButton
  }
};
</script>

<style>
.modal-outer-rect {
  fill: rgb(141, 97, 40);
  filter: url(#shadow2);
  stroke: rgb(141, 97, 40);
}

.modal-inner-rect {
  fill: rgb(90, 58, 16);
}
</style>
