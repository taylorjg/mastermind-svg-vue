<template>
  <g>
    <template v-for="(_, col) in 4">
      <LargePegHole
        :row="row"
        :col="col"
        :key="`guess-large-peg-hole-${row}-${col}`"
      />
      <FocusRing
        v-if="activeRow"
        :row="row"
        :col="col"
        :handler="onPegClick"
        :key="`focus-ring-${row}-${col}`"
      />
    </template>
    <template v-for="(colour, col) in colours">
      <LargePeg
        v-if="colour"
        :row="row"
        :col="col"
        :colour="colour"
        :handler="onPegClick"
        :key="`guess-large-peg-${row}-${col}`"
      />
    </template>
  </g>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as D from "../dimensions";
import { PEG_TO_COLOUR } from "../constants";
import LargePegHole from "./LargePegHole.vue";
import LargePeg from "./LargePeg.vue";
import FocusRing from "./FocusRing.vue";

export default {
  name: "Guess",
  props: ["row"],
  computed: {
    colours() {
      const guess = this.guessAtRowIndex(this.row);
      return guess ? guess.map(peg => PEG_TO_COLOUR[peg]) : [];
    },
    activeRow() {
      return this.row === this.activeRowIndex;
    },
    ...mapGetters("logic", [
      "activeRowIndex",
      "guessAtRowIndex",
      "showingColourMenuFor"
    ])
  },
  methods: {
    onPegClick(row, col) {
      if (this.activeRow) {
        if (
          this.showingColourMenuFor &&
          this.showingColourMenuFor.col === col
        ) {
          this.hideColourMenu();
        } else {
          this.showColourMenuFor({ row, col });
        }
      }
    },
    ...mapMutations("logic", ["showColourMenuFor", "hideColourMenu"])
  },
  components: {
    LargePegHole,
    LargePeg,
    FocusRing
  }
};
</script>
