<template>
  <g>
    <template v-for="(_, col) in 4">
      <LargePegHole
        :row="row"
        :col="col"
        :handler="onPegClick"
        :key="`guess-large-peg-hole-${row}-${col}`"
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

export default {
  name: "Guess",
  props: ["row"],
  computed: {
    colours() {
      const guess = this.guessAtRow(this.row);
      return guess ? guess.map(peg => PEG_TO_COLOUR[peg]) : [];
    },
    ...mapGetters("logic", ["activeRowIndex", "guessAtRow"])
  },
  methods: {
    onPegClick(row, col) {
      if (row === this.activeRowIndex) {
        this.showColourMenuFor({ row, col });
      }
    },
    ...mapMutations("logic", ["showColourMenuFor"])
  },
  components: {
    LargePegHole,
    LargePeg
  }
};
</script>
