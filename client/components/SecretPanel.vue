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
  </g>
</template>

<script>
import * as D from "../dimensions";
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
    strokeWidth: () => D.HALF_BORDER
  },
  components: {
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
