<template>
  <g>
    <Button
      v-if="showNewGameButton"
      :x="newGameButtonBox.x"
      :y="newGameButtonBox.y"
      :width="newGameButtonBox.width"
      :height="newGameButtonBox.height"
      :label="'New Game'"
      :handler="onNewGame"
    />
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
import * as D from "./dimensions";
import Button from "./components/Button.vue";
import SecretPanel from "./components/SecretPanel.vue";
import Feedback from "./components/Feedback.vue";
import Guess from "./components/Guess.vue";
import MainPanel from "./components/MainPanel.vue";
import ColourMenu from "./components/ColourMenu.vue";
import OutcomeModal from "./components/OutcomeModal.vue";

export default {
  name: "App",
  created() {
    D.recalculateDimensions();
    window.addEventListener("resize", D.recalculateDimensions);
  },
  computed: {
    newGameButtonBox() {
      return {
        x: D.gutterX - D.HALF_BORDER / 2,
        y: D.GUTTER_Y,
        width: 80,
        height: 30
      };
    },
    ...mapGetters("logic", ["showNewGameButton", "showingColourMenuFor"])
  },
  methods: {
    ...mapMutations("logic", { onNewGame: "newGame" })
  },
  components: {
    Button,
    SecretPanel,
    Feedback,
    Guess,
    MainPanel,
    ColourMenu,
    OutcomeModal
  }
};
</script>
