<template>
  <g>
    <template v-for="(_, col) in 4">
      <SmallPegHole
        :row="row"
        :col="col"
        :key="`feedback-small-peg-hole-${row}-${col}`"
      />
    </template>
    <RowNumber :row="row" :key="`feedback-row-number-${row}`" />
  </g>
</template>

<script>
import * as D from "../dimensions";
import SmallPegHole from "./SmallPegHole.vue";
import SmallPeg from "./SmallPeg.vue";
import RowNumber from "./RowNumber.vue";
import Button from "./Button.vue";

export default {
  name: "Feedback",
  props: ["row"],
  computed: {
  },
  methods: {
  },
  components: {
    SmallPegHole,
    SmallPeg,
    RowNumber,
    Button
  }
};
</script>

<style>
</style>
