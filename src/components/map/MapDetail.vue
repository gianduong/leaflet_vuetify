<template>

  <div >
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 500px; width: 100%"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-control class="example-custom-control" :position="'topleft'">
        <div class="mi border mi-24px icon-draw-polyline"></div>
        <div class="mi border mi-24px icon-draw-polygon"></div>
        <div class="mi border mi-24px icon-draw-rectangle"></div>
        <div class="mi border mi-24px icon-draw-circle"></div>
      </l-control>
      <l-control
        :position="'bottomleft'"
        class="custom-control-watermark"
      >
        Vue2Leaflet Watermark Control
      </l-control>
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
</template>

<script>
import { latLng } from "leaflet";
import { LMap, LTileLayer, LControl } from "vue2-leaflet";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LControl
  },
  data() {
    return {
      zoom: 13,
      center: latLng(47.41322, -1.219482),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
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
  methods: {
    showAlert() {
      alert("Click!");
    }
  }
};
</script>

<style>
.example-custom-control {
  background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.1em;
}
.custom-control-watermark {
  font-size: 200%;
  font-weight: bolder;
  color: #aaa;
  text-shadow: #555;
}
</style>
