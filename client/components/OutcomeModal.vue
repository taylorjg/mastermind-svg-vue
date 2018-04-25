<template>
  <g>
    <rect
      class="outcome-modal-outer-rect"
      :x="outerRectBox.x"
      :y="outerRectBox.y"
      :width="outerRectBox.width"
      :height="outerRectBox.height"
      :stroke-width="outerRectStroke"
      rx="5"
      ry="5"
    />
    <rect
      class="outcome-modal-inner-rect"
      :x="innerRectBox.x"
      :y="innerRectBox.y"
      :width="innerRectBox.width"
      :height="innerRectBox.height"
      rx="5"
      ry="5"
    />
    <g class="outcome-modal-close-button" @click="onClose">
      <circle :cx="circleData.cx" :cy="circleData.cy" :r="circleData.r" />
      <path :d="crossPathData" />
    </g>
    <text class="outcome-modal-text-1" :x="text1.x" :y="text1.y">{{ text1.text }}</text>
    <use :href="graphic.href" :transform="graphic.transform" />
    <text class="outcome-modal-text-2" :x="text2.x" :y="text2.y">{{ text2.text }}</text>
  </g>
</template>

<script>
import { mapMutations } from "vuex";
import * as D from "../dimensions";

let modalOuterWidth;
let modalOuterHeight;
let modalOuterX;
let modalOuterY;

let modalInnerX;
let modalInnerY;
let modalInnerWidth;
let modalInnerHeight;

export default {
  name: "OutcomeModal",
  props: ["gameWon"],
  created() {
    modalOuterWidth = D.boardWidth / 2;
    modalOuterHeight = modalOuterWidth / 2 * 3;
    modalOuterX = D.boardWidth / 4;
    modalOuterY = (D.boardHeight - modalOuterHeight) / 2;

    modalInnerX = modalOuterX + D.BORDER;
    modalInnerY = modalOuterY + D.BORDER;
    modalInnerWidth = modalOuterWidth - 2 * D.BORDER;
    modalInnerHeight = modalOuterHeight - 2 * D.BORDER;
  },
  computed: {
    outerRectBox() {
      return {
        x: modalOuterX,
        y: modalOuterY,
        width: modalOuterWidth,
        height: modalOuterHeight
      };
    },
    outerRectStroke() {
      return D.BORDER;
    },
    innerRectBox() {
      return {
        x: modalInnerX,
        y: modalInnerY,
        width: modalInnerWidth,
        height: modalInnerHeight
      };
    },
    circleData() {
      return {
        cx: modalOuterX + modalOuterWidth - D.BORDER / 2,
        cy: modalOuterY + D.HALF_BORDER / 2,
        r: 12
      };
    },
    crossPathData() {
      const cx = modalOuterX + modalOuterWidth - D.BORDER / 2;
      const cy = modalOuterY + D.HALF_BORDER / 2;
      const d = 5;
      const dd = d * 2;
      const diagonal1 = `M${cx - d},${cy - d} l${+dd},${dd}`;
      const diagonal2 = `M${cx + d},${cy - d} l${-dd},${dd}`;
      return `${diagonal1} ${diagonal2}`;
    },
    text1() {
      return {
        x: D.boardWidth / 2,
        y: modalInnerY + 30,
        text: this.gameWon ? "You Won!" : "You Lost!"
      };
    },
    text2() {
      return {
        x: D.boardWidth / 2,
        y: modalInnerY + modalInnerHeight - 30,
        text: this.gameWon ? "Congratulations!" : "Commiserations!"
      };
    },
    graphic() {
      const size = this.gameWon ? 448.35 : 579.8642;
      const scale = modalInnerWidth / 2 / size;
      const tx = modalInnerX + modalInnerWidth / 4;
      const ty = modalInnerY + modalInnerHeight / 3;
      return {
        href: this.gameWon ? "#trophy" : "#spoon",
        transform: `translate(${tx}, ${ty}) scale(${scale}, ${scale})`
      };
    }
  },
  methods: {
    onClose() {
      this.hideOutcomeModal();
    },
    ...mapMutations("logic", ["hideOutcomeModal"])
  }
};
</script>

<style>
.outcome-modal-outer-rect {
  fill: rgb(141, 97, 40);
  filter: url(#shadow2);
  stroke: rgb(141, 97, 40);
}

.outcome-modal-inner-rect {
  fill: rgb(90, 58, 16);
}

.outcome-modal-text-1 {
  fill: rgb(141, 97, 40);
  text-anchor: middle;
  font-family: Arial;
  font-size: 24px;
}

.outcome-modal-text-2 {
  fill: rgb(141, 97, 40);
  text-anchor: middle;
  font-family: Arial;
  font-size: 16px;
}

.outcome-modal-close-button {
  cursor: pointer;
}

.outcome-modal-close-button circle {
  fill-opacity: 1;
  fill: black;
  stroke-width: 2;
  stroke: white;
}

.outcome-modal-close-button path {
  stroke-width: 2;
  stroke: white;
}
</style>
