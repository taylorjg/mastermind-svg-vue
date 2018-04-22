<template>
  <g>
    <Background />
    <Button
      v-show="showNewGameButton"
      :x="10"
      :y="10"
      :width="80"
      :height="40"
      :label="'New Game'"
      :handler="onNewGame"
    />
  </g>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { recalculateDimensions } from "./dimensions";
import Background from "./components/Background.vue";
import Button from "./components/Button.vue";

export default {
  name: "App",
  methods: {
    ...mapMutations("logic", { onNewGame: "start" })
  },
  components: {
    Background,
    Button
  },
  computed: {
    ...mapGetters("logic", ["showNewGameButton"])
  },
  created() {
    recalculateDimensions();
    window.addEventListener("resize", recalculateDimensions);
  }
};
</script>
