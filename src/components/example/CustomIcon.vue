<template>
  <div>
    <div>
      <span v-if="loading">Loading...</span>
      <label for="checkbox">GeoJSON Visibility</label>
      <input id="checkbox" v-model="show" type="checkbox">
      <label for="checkboxTooltip">Enable tooltip</label>
      <input id="checkboxTooltip" v-model="enableTooltip" type="checkbox">
      <input v-model="fillColor" type="color">
      <br>
    </div>
    <l-map :zoom="zoom" :center="center" style="height: 500px; width: 100%">
      <l-tile-layer :url="url" :attribution="attribution"/>
      <l-geo-json v-if="show" :geojson="geojson" :options="options" :options-style="styleFunction"/>
      <l-marker :lat-lng="marker"/>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LGeoJson } from "vue2-leaflet";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker
  },
  data() {
    return {
      loading: false,
      show: true,
      enableTooltip: true,
      zoom: 6,
      center: [10.7802, 106.6872],
      geojson: null,
      fillColor: "#e4ce7f",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(47.41322, -1.219482)
    };
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },

    getcolorFunction(d) {
      return d > 1000
        ? "#800026"
        : d > 500
        ? "#BD0026"
        : d > 200
        ? "#E31A1C"
        : d > 100
        ? "#FC4E2A"
        : d > 50
        ? "#FD8D3C"
        : d > 20
        ? "#FEB24C"
        : d > 10
        ? "#FED976"
        : "#FFEDA0";
    },

    styleFunction() {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: "#ECEFF1",
          opacity: 1,
          fillColor: getcolorFunction(feature.properties.sales),
          fillOpacity: 1
        };
      };
    },

    onEachFeatureFunction() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>Name Province:" +
            feature.properties.varname_1 +
            "</div><div>Sales: " +
            feature.properties.sales +
            "</div>",
          { permanent: false, sticky: true }
        );
      };
    }
  },
  async created() {
    this.loading = true;
    const response = await fetch(
      "https://raw.githubusercontent.com/renauld94/data/master/adm_files_YTD.geojson"
    );
    const data = await response.json();
    this.geojson = data;
    this.loading = false;
  }
};
</script>

<style>
</style>