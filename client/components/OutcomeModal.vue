<template>
  <g>
  </g>
</template>

<script>
import * as D from "../dimensions";

export default {
  name: "OutcomeModal",
  computed: {}
};
</script>

<style>
.outcome-modal-outer-rect {
  fill: rgb(141, 97, 40);
  filter: url(#shadow2);
  stroke: rgb(141, 97, 40);
}

.outcome-modal-inner-rect {
  fill: rgb(90, 58, 16);
}

.outcome-modal-text-1 {
  fill: rgb(141, 97, 40);
  text-anchor: middle;
  font-family: Arial;
  font-size: 24px;
}

.outcome-modal-text-2 {
  fill: rgb(141, 97, 40);
  text-anchor: middle;
  font-family: Arial;
  font-size: 16px;
}

.outcome-modal-close-button {
  cursor: pointer;
}

.outcome-modal-close-button-circle {
  fill-opacity: 1;
  fill: black;
  stroke-width: 2;
  stroke: white;
}

.outcome-modal-close-button-cross {
  stroke-width: 2;
  stroke: white;
}
</style>
