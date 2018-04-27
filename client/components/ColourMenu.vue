<template>
  <g>

    <defs>
      <clipPath v-for="(_, col) in 4" :id="`clipPath${col}`" :key="`clip-path-${col}`">
        <rect
          :x="outerRectBox.x"
          :y="outerRectBox.y"
          :width="outerRectBox.width"
          :height="outerRectBox.height"
          :rx="outerRectBox.rx"
          :ry="outerRectBox.ry"
        />
        <path :d="pointerPathData(col)" />
      </clipPath>
    </defs>

    <g :transform="colourMenuTransform">
      <g filter="url(#shadow2)">
        <rect
          class="colour-menu-border"
          :x="borderBox.x"
          :y="borderBox.y"
          :width="borderBox.width"
          :height="borderBox.height"
          :clip-path="`url(#clipPath${col})`"
        />
      </g>
      <rect
        class="colour-menu-inner-rect"
        :x="innerRectBox.x"
        :y="innerRectBox.y"
        :width="innerRectBox.width"
        :height="innerRectBox.height"
        :rx="innerRectBox.rx"
        :ry="innerRectBox.ry"
      />
      <template v-for="(colour, index) in colours">
        <LargePegRaw
          :cx="colourCx(index)"
          :cy="colourCy"
          :fill="colour"
          :key="`colour-${index}`"
          :handler="makeOnClickHandler(colour)"
        />
      </template>
    </g>
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
    COLOUR_MENU_OUTER_Y = POINTER_TIP_Y - POINTER_HEIGHT - COLOUR_MENU_OUTER_HEIGHT;
    COLOUR_MENU_OUTER_WIDTH = D.mainPanelWidth;

    COLOUR_MENU_INNER_X = COLOUR_MENU_OUTER_X + D.BORDER;
    COLOUR_MENU_INNER_Y = COLOUR_MENU_OUTER_Y + D.BORDER;
    COLOUR_MENU_INNER_WIDTH = COLOUR_MENU_OUTER_WIDTH - 2 * D.BORDER;
    COLOUR_MENU_INNER_HEIGHT = COLOUR_MENU_OUTER_HEIGHT - 2 * D.BORDER;

    gap = COLOUR_MENU_INNER_WIDTH / COLOURS.length;
    halfGap = gap / 2;
  },
  computed: {
    colours: () => COLOURS,
    borderBox() {
      return {
        x: COLOUR_MENU_OUTER_X,
        y: COLOUR_MENU_OUTER_Y,
        width: COLOUR_MENU_OUTER_WIDTH,
        height: COLOUR_MENU_OUTER_HEIGHT + POINTER_HEIGHT
      };
    },
    outerRectBox() {
      return {
        x: COLOUR_MENU_OUTER_X,
        y: COLOUR_MENU_OUTER_Y,
        width: COLOUR_MENU_OUTER_WIDTH,
        height: COLOUR_MENU_OUTER_HEIGHT,
        rx: 5,
        ry: 5
      };
    },
    innerRectBox() {
      return {
        x: COLOUR_MENU_INNER_X,
        y: COLOUR_MENU_INNER_Y,
        width: COLOUR_MENU_INNER_WIDTH,
        height: COLOUR_MENU_INNER_HEIGHT,
        rx: 5,
        ry: 5
      };
    },
    colourCy: () => COLOUR_MENU_INNER_Y + COLOUR_MENU_INNER_HEIGHT / 2,
    colourMenuTransform() {
      return `translate(0, ${-this.row * D.rowGapY})`;
    }
  },
  methods: {
    pointerPathData: col => `
      M${POINTER_TIP_X + col * D.largePegGapX},${POINTER_TIP_Y}
      l${-POINTER_HALF_WIDTH},${-POINTER_HEIGHT}
      h${POINTER_WIDTH}
      z`,
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
.colour-menu-border {
  fill: rgb(141, 97, 40);
}

.colour-menu-inner-rect {
  fill: rgb(90, 58, 16);
}
</style>
