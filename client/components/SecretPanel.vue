<template>
  <path
    class="secret-panel"
    :d="pathData"
    :stroke-width="strokeWidth"
    />
</template>

<script>
import * as D from "../dimensions";

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
