<template>
  <div id="app">
    <l-map :center="initialCoordinates" :zoom="12">
      <l-control position="topleft">
        <button @click="flipActive">
          {{ isActive ? 'Deactivate' : 'Activate' }}
        </button>
      </l-control>
      <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <l-freedraw v-model="polygons" :mode="mode" @markers="markerHandler" />
    </l-map>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { latLng } from 'leaflet';
import { LMap, LTileLayer, LControl } from 'vue2-leaflet';
import LFreedraw from 'vue2-leaflet-freedraw';
import { ALL, NONE } from 'leaflet-freedraw';
export default Vue.extend({
  name: 'ServeDev',
  components: {
    LFreedraw,
    LMap,
    LTileLayer,
    LControl,
  },
  data() {
    return {
      initialCoordinates: latLng(48.8566, 2.3522),
      isActive: false,
      polygons: [],
    };
  },
  computed: {
    mode() {
      return this.isActive ? ALL : NONE;
    },
  },
  watch: {
    polygons(newPolygons) {
      // Using v-model to watch polygons
      console.log(newPolygons);
    },
  },
  methods: {
    flipActive() {
      this.isActive = !this.isActive;
    },
  },
});
</script>

<style>
#app {
  position: absolute;
  height: 100%;
  width: 100%;
}
.map {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>