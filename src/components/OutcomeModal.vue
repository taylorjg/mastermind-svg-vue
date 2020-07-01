<template>
  <g>
    <Modal
      :x="contentBox.x"
      :y="contentBox.y"
      :width="contentBox.width"
      :height="contentBox.height"
      :onClose="onClose">
      <text class="outcome-modal-text-1" :x="text1.x" :y="text1.y">{{ text1.text }}</text>
      <use :href="graphic.href" :transform="graphic.transform" />
      <text class="outcome-modal-text-2" :x="text2.x" :y="text2.y">{{ text2.text }}</text>
    </Modal>
  </g>
</template>

<script>
import { mapMutations } from "vuex";
import * as D from "../dimensions";
import Modal from "./Modal.vue";

let contentX;
let contentY;
let contentWidth;
let contentHeight;

export default {
  name: "OutcomeModal",
  props: ["gameWon"],
  created() {
    contentWidth = D.boardWidth / 2;
    contentHeight = contentWidth * 1.5;
    contentX = (D.boardWidth - contentWidth) / 2;
    contentY = (D.boardHeight - contentHeight) / 2;
  },
  computed: {
    contentBox() {
      return {
        x: contentX,
        y: contentY,
        width: contentWidth,
        height: contentHeight
      };
    },
    text1() {
      return {
        x: D.boardWidth / 2,
        y: contentY + 40,
        text: this.gameWon ? "You Won!" : "You Lost!"
      };
    },
    text2() {
      return {
        x: D.boardWidth / 2,
        y: contentY + contentHeight - 30,
        text: this.gameWon ? "Congratulations!" : "Commiserations!"
      };
    },
    graphic() {
      const size = this.gameWon ? 448.35 : 579.8642;
      const scale = contentWidth / 2 / size;
      const tx = contentX + contentWidth / 4;
      const ty = contentY + contentHeight / 3;
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
  },
  components: {
    Modal
  }
};
</script>

<style>
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
</style>
