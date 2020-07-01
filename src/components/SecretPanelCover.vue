<template>
  <g>
    <path class="secret-panel-cover" :d="pathData" />
    <text class="secret-panel-cover-text-1" :x="text1X" :y="text1Y">MASTER</text>
    <text class="secret-panel-cover-text-2" :x="text2X" :y="text2Y">MIND</text>
  </g>
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "SecretPanelCover",
  computed: {
    pathData() {
      const x = D.secretPanelX + D.HALF_BORDER;
      const y = D.secretPanelY + D.HALF_BORDER;
      const w = D.secretPanelWidth - D.BORDER;
      const h = D.secretPanelHeight - D.BORDER;
      return `M${x},${y} v${h} h${w} v${-h} z`;
    },
    text1X() {
      const x = D.secretPanelX + D.HALF_BORDER;
      const MARGIN = D.BORDER * 3;
      return x + MARGIN;
    },
    text1Y() {
      const y = D.secretPanelY + D.HALF_BORDER;
      const h = D.secretPanelHeight - D.BORDER;
      return y + h / 2;
    },
    text2X() {
      const x = D.secretPanelX + D.HALF_BORDER;
      const w = D.secretPanelWidth - D.BORDER;
      const MARGIN = D.BORDER * 3;
      return x + w - MARGIN;
    },
    text2Y() {
      const y = D.secretPanelY + D.HALF_BORDER;
      const h = D.secretPanelHeight - D.BORDER;
      return y + h - D.HALF_BORDER;
    }
  }
};
</script>

<style>
.secret-panel-cover {
  fill: rgb(146, 106, 54);
  fill-opacity: 1;
}

.secret-panel-cover-text-1 {
  fill: rgb(141, 97, 40);
  text-anchor: start;
  font-family: Arial;
  font-size: 24px;
  filter: url(#shadow);
}

.secret-panel-cover-text-2 {
  fill: rgb(141, 97, 40);
  text-anchor: end;
  font-family: Arial;
  font-size: 24px;
  filter: url(#shadow);
}
</style>
