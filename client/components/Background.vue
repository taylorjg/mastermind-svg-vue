<template>
  <g>
    <SecretPanel />
    <template v-for="(_, row) in 10">
      <Feedback :row="row" :key="`feedback-${row}`" />
      <Guess :row="row" :key="`guess-${row}`" />
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
import Feedback from "./Feedback.vue";
import Guess from "./Guess.vue";
import MainPanel from "./MainPanel.vue";
import ColourMenu from "./ColourMenu.vue";

export default {
  name: "Background",
  components: {
    SecretPanel,
    Feedback,
    Guess,
    MainPanel,
    ColourMenu
  },
  computed: {
    ...mapGetters("logic", [
      "showNewGameButton",
      "showingColourMenuFor"
    ])
  },
  methods: {
  }
};
</script>

<style>

</style>
