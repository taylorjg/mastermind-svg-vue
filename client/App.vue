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
      <Score :row="row" :key="`score-${row}`" />
      <Guess :row="row" :key="`guess-${row}`" />
    </template>
    <MainPanel />
    <ColourMenu
      v-if="showingColourMenuFor"
      :row="showingColourMenuFor.row"
      :col="showingColourMenuFor.col"
    />
    <OutcomeModal
      v-if="showingOutcomeModal"
      :gameWon="gameWon"
    />
  </g>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as D from "./dimensions";
import Button from "./components/Button.vue";
import SecretPanel from "./components/SecretPanel.vue";
import Score from "./components/Score.vue";
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
  mounted() {
    if (window.location.search.includes("autosolve")) {
      this.enableAutosolveMode();
    }
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
    ...mapGetters("logic", [
      "showNewGameButton",
      "showingColourMenuFor",
      "showingOutcomeModal",
      "gameWon"
    ])
  },
  methods: {
    ...mapMutations("logic", { onNewGame: "newGame" }),
    ...mapMutations("logic", ["enableAutosolveMode"])
  },
  components: {
    Button,
    SecretPanel,
    Score,
    Guess,
    MainPanel,
    ColourMenu,
    OutcomeModal
  }
};
</script>
