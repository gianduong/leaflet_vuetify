<template>
  <div class="row map">
    <l-map
      @update:zoom="zoomUpdate"
      @update:center="centerUpdate"
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        :key="index"
        v-for="(brew, index) in brewList"
        :lat-lng="latLng(brew.latitude, brew.longitude)"
      >
        <l-icon :icon-size="brew.iconSize" :icon-url="icon" />
      </l-marker>
      <l-control-layers />
      <l-wms-tile-layer
        v-for="layer in layers"
        :key="layer.name"
        :base-url="baseUrl"
        :layers="layer.layers"
        :visible="layer.visible"
        :name="layer.name"
        layer-type="base"
      />
    </l-map>
  </div>
  <!-- /.row map -->
</template>

<script>
/* eslint-disable no-undef */

import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import beer from "../../assets/img/beer_selected.png";

export default {
  name: "BreweriesMap",
  props: ["brewList"],
  data: function () {
    return {
      center: L.latLng(33.683295, -111.930685),
      url: "http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.41322, -1.219482),
      zoom: 7,
      currentCenter: L.latLng(47.41322, -1.219482),
      currentZoom: 7,
      icon: beer,
      iconSize: [15, 15],
      baseUrl: 'http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      layers: [
        {
          name: 'Weather Data',
          visible: true,
          format: 'image/png',
          layers: 'nexrad-n0r-900913',
          transparent: true,
          attribution: "Weather data © 2012 IEM Nexrad"
        },
        {
          name: 'Google map',
          visible: true,
          format: 'image/png',
          layers: 'nexrad-n0r-900913',
          transparent: true,
          attribution: "Weather data © 2012 IEM Nexrad"
        },
        {
          name: 'Sasori',
          visible: true,
          format: 'image/png',
          layers: 'nexrad-n0r-900913',
          transparent: true,
          attribution: "Weather data © 2012 IEM Nexrad"
        }
      ]
    };
    
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },
  methods: {
    latLng: function (lat, lng) {
      return L.latLng(lat, lng);
    },

    centerUpdate: function (center) {
      this.currentCenter = center;
    },
    zoomUpdate: function (zoom) {
      this.currentZoom = zoom;
    },
  },
};
</script>

<style type="scss" scoped>
.map {
  height: 80vh;
}
</style>
