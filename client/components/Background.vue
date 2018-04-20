<template>
  <g>
    <SecretPanel />
    <template v-for="col in 4">
      <LargePegHole :row="-1" :col="col" :key="'secret' + col" />
    </template>
    <template v-for="row in 10">
      <template v-for="col in 4">
        <SmallPegHole :row="row" :col="col" :key="'sph' + (row * 4 + col)" />
        <LargePegHole :row="row" :col="col" :key="'lph' + (row * 4 + col)" />
      </template>
      <RowNumber :row="row" :key="row" />
    </template>
    <MainPanel />
  </g>
</template>

<script>
import * as D from "../dimensions";
import SecretPanel from "./SecretPanel.vue";
import MainPanel from "./MainPanel.vue";
import SmallPegHole from "./SmallPegHole.vue";
import LargePegHole from "./LargePegHole.vue";
import RowNumber from "./RowNumber.vue";

export default {
  name: "Background",
  components: {
    SecretPanel,
    MainPanel,
    SmallPegHole,
    LargePegHole,
    RowNumber
  }
};
</script>

<style>
</style>
