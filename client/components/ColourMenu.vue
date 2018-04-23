<template>
  <g>
    <g :transform="colourMenuTransform">
      <rect
        class="colour-menu-outer-rect"
        :x="outerRectX"
        :y="outerRectY"
        :width="outerRectWidth"
        :height="outerRectHeight"
        :stroke-width="outerRectStrokeWidth"
        rx="5"
        ry="5"
      />
      <rect
        class="colour-menu-inner-rect"
        :x="innerRectX"
        :y="innerRectY"
        :width="innerRectWidth"
        :height="innerRectHeight"
        rx="5"
        ry="5"
      />
      <template v-for="(colour, index) in COLOURS">
        <LargePegRaw
          :cx="colourCx(index)"
          :cy="colourCy"
          :fill="colour"
          :key="`colour-swatch-${index}`"
          :handler="makeOnClickHandler(colour)"
        />
      </template>
    </g>
    <path
      class="colour-menu-pointer"
      :d="pointerPathData"
      :transform="pointerTransform"
    />
  </g>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import * as D from "../dimensions";
import { COLOURS, COLOUR_TO_PEG } from "../constants";
import LargePegRaw from "./LargePegRaw.vue";

let POINTER_TIP_X;
let POINTER_TIP_Y;
let POINTER_WIDTH;
let POINTER_HALF_WIDTH;
let POINTER_HEIGHT;

let COLOUR_MENU_OUTER_X;
let COLOUR_MENU_OUTER_Y;
let COLOUR_MENU_OUTER_WIDTH;
let COLOUR_MENU_OUTER_HEIGHT;

let COLOUR_MENU_INNER_X;
let COLOUR_MENU_INNER_Y;
let COLOUR_MENU_INNER_WIDTH;
let COLOUR_MENU_INNER_HEIGHT;

let gap;
let halfGap;

export default {
  name: "ColourMenu",
  props: ["row", "col", "handler"],
  created() {
    POINTER_TIP_X = D.firstLargePegX;
    POINTER_TIP_Y = D.firstRowCentreY - D.largePegRadius;
    POINTER_HEIGHT = D.largePegHoleRadius;
    POINTER_WIDTH = 1.5 * POINTER_HEIGHT;
    POINTER_HALF_WIDTH = POINTER_WIDTH / 2;

    COLOUR_MENU_OUTER_X = D.mainPanelX;
    COLOUR_MENU_OUTER_HEIGHT = D.largePegRadius * 4;
    COLOUR_MENU_OUTER_Y =
      POINTER_TIP_Y -
      POINTER_HEIGHT -
      COLOUR_MENU_OUTER_HEIGHT -
      D.HALF_BORDER / 2;
    COLOUR_MENU_OUTER_WIDTH = D.mainPanelWidth;

    COLOUR_MENU_INNER_X = COLOUR_MENU_OUTER_X + D.HALF_BORDER;
    COLOUR_MENU_INNER_Y = COLOUR_MENU_OUTER_Y + D.HALF_BORDER;
    COLOUR_MENU_INNER_WIDTH = COLOUR_MENU_OUTER_WIDTH - D.BORDER;
    COLOUR_MENU_INNER_HEIGHT = COLOUR_MENU_OUTER_HEIGHT - D.BORDER;

    gap = COLOUR_MENU_INNER_WIDTH / COLOURS.length;
    halfGap = gap / 2;
  },
  computed: {
    COLOURS: () => COLOURS,
    outerRectX: () => COLOUR_MENU_OUTER_X,
    outerRectY: () => COLOUR_MENU_OUTER_Y,
    outerRectWidth: () => COLOUR_MENU_OUTER_WIDTH,
    outerRectHeight: () => COLOUR_MENU_OUTER_HEIGHT,
    outerRectStrokeWidth: () => D.HALF_BORDER,
    innerRectX: () => COLOUR_MENU_INNER_X,
    innerRectY: () => COLOUR_MENU_INNER_Y,
    innerRectWidth: () => COLOUR_MENU_INNER_WIDTH,
    innerRectHeight: () => COLOUR_MENU_INNER_HEIGHT,
    colourCy: () => COLOUR_MENU_INNER_Y + COLOUR_MENU_INNER_HEIGHT / 2,
    pointerPathData: () => `
      M${POINTER_TIP_X},${POINTER_TIP_Y}
      l${-POINTER_HALF_WIDTH},${-POINTER_HEIGHT}
      h${POINTER_WIDTH}
      z`,
    colourMenuTransform() {
      const tx = 0;
      const ty = -this.row * D.rowGapY;
      return `translate(${tx}, ${ty})`;
    },
    pointerTransform() {
      const tx = this.col * D.largePegGapX;
      const ty = -this.row * D.rowGapY;
      return `translate(${tx}, ${ty})`;
    }
  },
  methods: {
    colourCx: index => COLOUR_MENU_INNER_X + halfGap + gap * index,
    makeOnClickHandler(colour) {
      return () => {
        this.setPeg({
          peg: COLOUR_TO_PEG[colour]
        });
        this.hideColourMenu();
      };
    },
    ...mapMutations("logic", ["setPeg", "hideColourMenu"])
  },
  components: {
    LargePegRaw
  }
};
</script>

<style>
.colour-menu-outer-rect {
  stroke: rgb(141, 97, 40);
  fill: rgb(141, 97, 40);
  filter: url(#shadow);
}

.colour-menu-inner-rect {
  fill: rgb(90, 58, 16);
}

.colour-menu-pointer {
  fill: rgb(90, 58, 16);
}
</style>
