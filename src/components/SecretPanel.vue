<template>
  <g>
    <path
      class="secret-panel"
      :d="pathData"
      :stroke-width="strokeWidth"
      />
    <template v-for="(_, col) in 4">
      <LargePegHole :row="-1" :col="col" :key="`secret-large-peg-hole-${col}`" />
    </template>
    <SecretPanelCover v-if="gameInProgress" />
    <template v-if="gameOver" v-for="(colour, col) in colours">
      <LargePeg :row="-1" :col="col" :colour="colour" :key="`secret-large-peg-${col}`" />
    </template>
  </g>
</template>

<script>
import { mapGetters } from "vuex";
import * as D from "../dimensions";
import { PEG_TO_COLOUR } from "../constants";
import SecretPanelCover from "./SecretPanelCover.vue";
import LargePegHole from "./LargePegHole.vue";
import LargePeg from "./LargePeg.vue";

const SECRET_PANEL_LIP = 10;

export default {
  name: "SecretPanel",
  computed: {
    pathData: () => `
      M${D.secretPanelX + SECRET_PANEL_LIP},${D.secretPanelY}
      h${-SECRET_PANEL_LIP}
      v${D.secretPanelHeight}
      h${D.secretPanelWidth}
      v${-D.secretPanelHeight}
      h${-SECRET_PANEL_LIP}`,
    strokeWidth: () => D.HALF_BORDER,
    colours() {
      return this.secret.map(peg => PEG_TO_COLOUR[peg]);
    },
    ...mapGetters("logic", ["gameOver", "gameInProgress", "secret"])
  },
  components: {
    SecretPanelCover,
    LargePegHole,
    LargePeg
  }
};
</script>

<style>
.secret-panel {
  stroke: rgb(141, 97, 40);
  stroke-linecap: square;
  fill-opacity: 0;
  filter: url(#shadow);
}
</style>
