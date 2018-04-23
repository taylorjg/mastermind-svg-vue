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
      v-if="canSubmitThisRow"
      :x="enterButtonLocation.x"
      :y="enterButtonLocation.y"
      :width="enterButtonLocation.width"
      :height="enterButtonLocation.height"
      :label="'Enter'"
      :handler="onEnter"
    />
  </g>
</template>

<script>
import { mapGetters } from "vuex";
import * as D from "../dimensions";
import SmallPegHole from "./SmallPegHole.vue";
import SmallPeg from "./SmallPeg.vue";
import RowNumber from "./RowNumber.vue";
import Button from "./Button.vue";

export default {
  name: "Feedback",
  props: ["row"],
  computed: {
    enterButtonLocation() {
      const rowCentreY = D.firstRowCentreY - this.row * D.rowGapY;
      const x = D.smallCutoutX + D.BORDER;
      const y = rowCentreY - D.smallCutoutHeight / 2 + D.BORDER;
      const width = D.smallCutoutWidth - 2 * D.BORDER;
      const height = D.smallCutoutHeight - 2 * D.BORDER;
      return { x, y, width, height };
    },
    canSubmitThisRow() {
      return this.canSubmitRow(this.row);
    },
    ...mapGetters("logic", ["canSubmitRow"])
  },
  methods: {
    onEnter() {
      console.log("[Feedback#onEnter]");
      // this.submitRow(this.row);
    }
  },
  components: {
    SmallPegHole,
    SmallPeg,
    RowNumber,
    Button
  }
};
</script>
