<template>
  <g>
    <SecretPanel />
    <template v-for="(_, col) in 4">
      <LargePegHole :row="-1" :col="col" :key="`secret-large-peg-hole-${col}`" />
    </template>
    <template v-for="(_, row) in 10">
      <template v-for="(_, col) in 4">
        <SmallPegHole :row="row" :col="col" :key="`small-peg-hole-${row}-${col}`" />
        <LargePegHole
          :row="row"
          :col="col"
          :handler="onLargePegHoleClick"
          :key="`guess-large-peg-hole-${row}-${col}`"
        />
      </template>
      <RowNumber :row="row" :key="`row-number-${row}`" />
    </template>
    <MainPanel />
    <ColourMenu
      v-if="showingColourMenuFor"
      :row="showingColourMenuFor.row"
      :col="showingColourMenuFor.col"
    />
  </g>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as D from "../dimensions";
import SecretPanel from "./SecretPanel.vue";
import MainPanel from "./MainPanel.vue";
import SmallPegHole from "./SmallPegHole.vue";
import LargePegHole from "./LargePegHole.vue";
import RowNumber from "./RowNumber.vue";
import ColourMenu from "./ColourMenu.vue";

export default {
  name: "Background",
  components: {
    SecretPanel,
    MainPanel,
    SmallPegHole,
    LargePegHole,
    RowNumber,
    ColourMenu
  },
  computed: {
    ...mapGetters("logic", [
      "showNewGameButton",
      "showingColourMenuFor",
      "activeRowIndex"
    ])
  },
  methods: {
    onLargePegHoleClick(row, col) {
      if (row === this.activeRowIndex) {
        this.showColourMenuFor({ row, col });
      }
    },
    ...mapMutations("logic", ["showColourMenuFor"])
  }
};
</script>

<style>

</style>
