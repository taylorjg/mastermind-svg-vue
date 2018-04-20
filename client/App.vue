<template>
  <g>
    <Background />
    <Button :x="10" :y="10" :width="80" :height="40" :label="'New Game'" :handler="onNewGame" />
  </g>
</template>

<script>
import { recalculateDimensions } from "./dimensions";
import Background from "./components/Background.vue";
import Button from "./components/Button.vue";

export default {
  name: "App",
  methods: {
    onNewGame() {
      console.log("Starting a new game");
    }
  },
  components: {
    Background,
    Button
  },
  created() {
    recalculateDimensions();
    window.addEventListener("resize", recalculateDimensions);
  }
};
</script>
