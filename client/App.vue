<template>
  <g>
    <Background />
    <Button
      v-if="showNewGameButton"
      :x="x"
      :y="y"
      :width="80"
      :height="30"
      :label="'New Game'"
      :handler="onNewGame"
    />
  </g>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as D from "./dimensions";
import Background from "./components/Background.vue";
import Button from "./components/Button.vue";

export default {
  name: "App",
  methods: {
    ...mapMutations("logic", { onNewGame: "newGame" })
  },
  components: {
    Background,
    Button
  },
  computed: {
    x: () => D.gutterX - D.HALF_BORDER / 2,
    y: () => D.GUTTER_Y,
    ...mapGetters("logic", ["showNewGameButton"])
  },
  created() {
    D.recalculateDimensions();
    window.addEventListener("resize", D.recalculateDimensions);
  }
};
</script>
