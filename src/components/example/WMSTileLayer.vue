<template>

  <div>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 500px; width: 100%"
    >
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
import { LMap, LWMSTileLayer, LControlLayers } from "vue2-leaflet";

export default {
  name: "WmsLayers",
  components: {
    LMap,
    "l-wms-tile-layer": LWMSTileLayer,
    LControlLayers
  },
  data() {
    return {
      zoom: 2,
      center: [49, 12],
      baseUrl: 'http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi',
      layers: [
        {
          name: 'Weather Data',
          visible: true,
          format: 'image/png',
          layers: 'nexrad-n0r-900913',
          transparent: true,
          attribution: "Weather data © 2012 IEM Nexrad"
        }
      ]
    };
  }
};
</script>
