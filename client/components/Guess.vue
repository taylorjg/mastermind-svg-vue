<template>
  <g>
    <template v-for="(_, col) in 4">
      <LargePegHole
        :row="row"
        :col="col"
        :handler="onLargePegHoleClick"
        :key="`guess-large-peg-hole-${row}-${col}`"
      />
    </template>
  </g>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as D from "../dimensions";
import LargePegHole from "./LargePegHole.vue";
import LargePeg from "./LargePeg.vue";

export default {
  name: "Guess",
  props: ["row"],
  computed: {
    ...mapGetters("logic", ["activeRowIndex"])
  },
  methods: {
    onLargePegHoleClick(row, col) {
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

<style>

</style>
