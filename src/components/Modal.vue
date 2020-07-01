<template>
  <g>
    <rect
      class="modal-outer-rect"
      :x="outerRectBox.x"
      :y="outerRectBox.y"
      :width="outerRectBox.width"
      :height="outerRectBox.height"
      :rx="outerRectBox.rx"
      :ry="outerRectBox.ry"
    />
    <rect
      class="modal-inner-rect"
      :x="innerRectBox.x"
      :y="innerRectBox.y"
      :width="innerRectBox.width"
      :height="innerRectBox.height"
      :rx="innerRectBox.rx"
      :ry="innerRectBox.ry"
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

export default {
  name: "Modal",
  props: ["x", "y", "width", "height", "onClose"],
  computed: {
    outerRectBox() {
      return {
        x: this.x - D.BORDER,
        y: this.y - D.BORDER,
        width: this.width + 2 * D.BORDER,
        height: this.height + 2 * D.BORDER,
        rx: 5,
        ry: 5
      };
    },
    innerRectBox() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        rx: 5,
        ry: 5
      };
    },
    closeButtonData() {
      return {
        cx: this.x + this.width + D.HALF_BORDER,
        cy: this.y - D.HALF_BORDER
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
}

.modal-inner-rect {
  fill: rgb(90, 58, 16);
}
</style>
