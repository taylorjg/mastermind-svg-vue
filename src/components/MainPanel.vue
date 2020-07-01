<template>
  <path
    class="main-panel"
    :d="pathData"
    :stroke-width="strokeWidth"
    />
</template>

<script>
import * as D from "../dimensions";

const buildPathDataForSmallCutout = row => {
  const rowCentreY = D.firstRowCentreY - row * D.rowGapY;
  return `
    M${D.smallCutoutX},${rowCentreY - D.smallCutoutHeight / 2}
    h${D.smallCutoutWidth}
    v${D.smallCutoutHeight}
    h${-D.smallCutoutWidth}
    z`;
};

const buildPathDataForLargeCutout = row => {
  const r = D.largePegHoleOuterRadius;
  const theta = 0.6805212246672144; // about 39 degrees
  const dx = r * Math.cos(theta);
  const dy = r * Math.sin(theta);
  const cy = D.firstRowCentreY - row * D.rowGapY;
  const arcWidth = 2 * dx;
  const arcHeight = 2 * dy;
  const interArcGap = D.largePegGapX - 2 * dx;
  return `
    M${D.firstLargePegX + dx},${cy + dy}
    a ${r} ${r} 0 1 1 0,${-arcHeight}
    h${interArcGap}
    a ${r} ${r} 1 0 1 ${arcWidth},0
    h${interArcGap}
    a ${r} ${r} 1 0 1 ${arcWidth},0
    h${interArcGap}
    a ${r} ${r} 1 1 1 0,${arcHeight}
    h${-interArcGap}
    a ${r} ${r} 1 0 1 ${-arcWidth},0
    h${-interArcGap}
    a ${r} ${r} 1 0 1 ${-arcWidth},0
    z`;
};

export default {
  name: "MainPanel",
  computed: {
    pathData: () => {
      const outerRectPath = `
        M${D.mainPanelX},${D.mainPanelY}
        h${D.mainPanelWidth}
        v${D.mainPanelHeight}
        h${-D.mainPanelWidth}
        z`;
      const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const SmallCutoutPaths = rows.map(buildPathDataForSmallCutout);
      const LargeCutoutPaths = rows.map(buildPathDataForLargeCutout);
      return [
        outerRectPath,
        ...SmallCutoutPaths,
        ...LargeCutoutPaths
      ].join(" ");
    },
    strokeWidth: () => D.BORDER
  }
};
</script>

<style>
.main-panel {
  fill: rgb(141, 97, 40);
  fill-rule: evenodd;
  filter: url(#shadow);
  stroke: rgb(141, 97, 40);
  stroke-linejoin: round;
}
</style>
