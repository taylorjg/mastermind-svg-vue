<template>
  <g>
    <template v-for="(_, col) in 4">
      <SmallPegHole
        :row="row"
        :col="col"
        :key="`feedback-small-peg-hole-${row}-${col}`"
      />
    </template>
    <RowNumber :row="row" :key="`feedback-row-number-${row}`" />
    <Button
      v-if="canSubmitRow(row)"
      :x="enterButtonBox.x"
      :y="enterButtonBox.y"
      :width="enterButtonBox.width"
      :height="enterButtonBox.height"
      :label="'Go'"
      :handler="onSubmit"
    />
    <template v-for="(colour, col) in colours">
      <SmallPeg
        v-if="colour"
        :row="row"
        :col="col"
        :colour="colour"
        :key="`feedback-small-peg-${row}-${col}`"
      />
    </template>
  </g>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as D from "../dimensions";
import { C } from "../constants";
import SmallPegHole from "./SmallPegHole.vue";
import SmallPeg from "./SmallPeg.vue";
import RowNumber from "./RowNumber.vue";
import Button from "./Button.vue";

export default {
  name: "Feedback",
  props: ["row"],
  computed: {
    enterButtonBox() {
      const rowCentreY = D.firstRowCentreY - this.row * D.rowGapY;
      const x = D.smallCutoutX + D.BORDER;
      const y = rowCentreY - D.smallCutoutHeight / 2 + D.BORDER;
      const width = D.smallCutoutWidth - 2 * D.BORDER;
      const height = D.smallCutoutHeight - 2 * D.BORDER;
      return { x, y, width, height };
    },
    colours() {
      const feedback = this.feedbackAtRowIndex(this.row);
      if (!feedback) return [];
      const blacks = Array(feedback.blacks).fill(C.BL);
      const whites = Array(feedback.whites).fill(C.WH);
      const colours = [...blacks, ...whites];
      return colours;
    },
    ...mapGetters("logic", ["canSubmitRow", "feedbackAtRowIndex"])
  },
  methods: {
    onSubmit() {
      this.submit();
    },
    ...mapMutations("logic", ["submit"])
  },
  components: {
    SmallPegHole,
    SmallPeg,
    RowNumber,
    Button
  }
};
</script>
