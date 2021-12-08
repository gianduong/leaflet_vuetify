<template>
  <div>
    <v-snackbar
      v-model="toast.isShowToast"
      :timeout="timeout"
      height="70"
      top
      right
      light
      transition="slide-x-reverse-transition"
      class="base-toast"
    >
      <div class="toast-content">
        <div
          :class="[
            toast.type == 'success' ? 'logo-success' : null,
            toast.type == 'danger' ? 'logo-danger' : null,
          ]"
        ></div>
        <span>{{ toast.text }}</span>
      </div>

      <template v-slot:action="{ attrs }">
        <v-btn
          :style="{ color: toast.color }"
          text
          v-bind="attrs"
          @click="toast.isShowToast = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-card class="geo-detail" :class="{ hidden: !isShowLayerInfo }">
      <v-system-bar color="#F5F5F5" dark>
        <v-spacer></v-spacer>

        <v-icon color="#111">mdi-window-minimize</v-icon>

        <v-icon color="#111">mdi-window-maximize</v-icon>

        <v-icon color="#111" @click="isShowLayerInfo = false">mdi-close</v-icon>
      </v-system-bar>
      <v-app-bar dark color="#f5f5f5">
        <v-app-bar-nav-icon style="color: #111"></v-app-bar-nav-icon>

        <v-toolbar-title class="title"
          >Chi tiết khu nông nghiệp</v-toolbar-title
        >

        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mt-2"
              icon
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              @click="handleGetLayerCenter"
            >
              <v-icon color="#111">mdi-magnify</v-icon>
            </v-btn>
          </template>
          <span>Trỏ tới vị trí trực tiếp</span>
        </v-tooltip>
      </v-app-bar>
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card color="#385F73" dark>
              <v-card-title class="text-h5"> Thông tin chi tiết </v-card-title>

              <div class="info-layer">
                <span>Tên khu vực:</span>
                <span> {{ nameDetail }}</span>
              </div>
              <div class="info-layer">
                <span>Vị trí:</span>
                <span>{{ latLngDetail }}</span>
              </div>
              <div class="info-layer">
                <span>Code:</span>
                <span>{{ codeDetail }}</span>
              </div>
            </v-card>
          </v-col>
          <span class="span-conclude"
            >Chỉ số chất lượng không khí: 122.4715</span
          >
          <v-col cols="12">
            <v-card dark>
              <v-img src="../../assets/img/nongnghiep.jpg"></v-img>
            </v-card>
          </v-col>
          <span class="span-img">
            <span class="span-img-info">Ảnh minh họa</span>
            <span class="span-img-name">garden city</span>
          </span>
        </v-row>
      </v-container>
    </v-card>
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 500px; width: 100%"
      ref="map"
      @click="onMapClick"
      :options="{ zoomControl: false }"
    >
      <l-control-polyline-measure
        :options="{ showUnitControl: false }"
        position="topleft"
      />
      <l-draw-toolbar position="topleft" />
      <l-freedraw v-model="polygons" :mode="mode" />
      <l-control-zoom :position="'bottomright'"></l-control-zoom>
      <l-control-scale :imperial="imperial" :position="'topright'" />
      <l-popup ref="popup">hihi</l-popup>

      <l-control-layers />
      <l-wms-tile-layer
        v-for="layer in layers"
        :key="layer.name"
        :base-url="layer.baseUrl"
        :layers="layer.layers"
        :visible="layer.visible"
        :name="layer.name"
        layer-type="base"
        :url="layer.url"
      />

      <l-layer-group layer-type="overlay" name="Layer polyline">
        <l-polyline
          v-for="item in polylines"
          :key="item.id"
          :lat-lngs="item.points"
          :visible="item.visible"
        />
      </l-layer-group>
      <l-layer-group
        v-for="item in stuff"
        :key="item.id"
        :visible.sync="item.visible"
        layer-type="overlay"
        name="Layer 1"
      >
        <l-layer-group :visible="item.markersVisible">
          <l-marker
            v-for="marker in item.markers"
            :key="marker.id"
            :visible="marker.visible"
            :draggable="marker.draggable"
            :lat-lng="marker.position"
          />
        </l-layer-group>
        <l-polyline
          :lat-lngs="item.polyline.points"
          :visible="item.polyline.visible"
        />
      </l-layer-group>
      <l-control class="custom-control" :position="'topright'">
        <v-tooltip bottom z-index="1000" open-delay="400">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="mi border mi-30px icon-draw-polygon"
              @click="flipActive"
            ></div>
          </template>
          <span>Vẽ Polygon</span>
        </v-tooltip>
        <v-tooltip bottom z-index="1000" open-delay="400">
          <template v-slot:activator="{ on, attrs }">
            <div
              :class="{ 'use-control': !show }"
              v-bind="attrs"
              v-on="on"
              class="border mi-30px"
            >
              <v-icon style="margin: 3.5px" @click="show = !show" dense
                >mdi-layers-off</v-icon
              >
            </div>
          </template>
          <span>Hiển thị/Ẩn layers</span>
        </v-tooltip>
        <v-tooltip bottom z-index="1000" open-delay="400">
          <template v-slot:activator="{ on, attrs }">
            <div
              :class="{ 'use-control': !enableTooltip }"
              v-bind="attrs"
              v-on="on"
              class="border mi-30px"
              @click="enableTooltip = !enableTooltip"
            >
              <v-icon style="margin: 3.5px" dense>mdi-tooltip-remove</v-icon>
            </div>
          </template>
          <span>Hiển thị/Ẩn tooltip</span>
        </v-tooltip>
        <v-tooltip bottom z-index="1000" open-delay="400">
          <template v-slot:activator="{ on, attrs }">
            <input
              v-model="fillColor"
              type="color"
              v-bind="attrs"
              v-on="on"
              class="border mi-30px"
            />
          </template>
          <span>Đổi màu</span>
        </v-tooltip>
      </l-control>
      <l-geo-json
        v-if="show"
        :geojson="geoform"
        :options="mapOptions"
        :options-style="styleFunction"
        ref="geo"
      ></l-geo-json>
    </l-map>
  </div>
</template>

<script>
import { latLng } from "leaflet";
// import axios from "axios";
// import L from "leaflet";
// import { getGeoDatas, getGeoDatas2 } from "../../api/baseApi";
// import notify from "../../utils/userMessage";
// import { LPopup } from 'vue2-leaflet';
import LControlPolylineMeasure from "vue2-leaflet-polyline-measure";
import LFreedraw from "vue2-leaflet-freedraw";
import { ALL, NONE } from "leaflet-freedraw";
import LDrawToolbar from "vue2-leaflet-draw-toolbar";
import axios from "axios";
const markers1 = [
  {
    position: { lng: -1.219482, lat: 47.41322 },
    visible: true,
    draggable: true,
  },
  { position: { lng: -1.571045, lat: 47.457809 } },
  { position: { lng: -1.560059, lat: 47.739323 } },
  { position: { lng: -0.922852, lat: 47.886881 } },
  { position: { lng: -0.769043, lat: 48.231991 } },
  { position: { lng: 0.395508, lat: 48.268569 } },
  { position: { lng: 0.604248, lat: 48.026672 } },
  { position: { lng: 1.2854, lat: 47.982568 } },
  { position: { lng: 1.318359, lat: 47.894248 } },
  { position: { lng: 1.373291, lat: 47.879513 } },
  { position: { lng: 1.384277, lat: 47.798397 } },
  { position: { lng: 1.329346, lat: 47.754098 } },
  { position: { lng: 1.329346, lat: 47.680183 } },
  { position: { lng: 0.999756, lat: 47.635784 } },
  { position: { lng: 0.86792, lat: 47.820532 } },
  { position: { lng: 0.571289, lat: 47.820532 } },
  { position: { lng: 0.439453, lat: 47.717154 } },
  { position: { lng: 0.439453, lat: 47.61357 } },
  { position: { lng: -0.571289, lat: 47.487513 } },
  { position: { lng: -0.615234, lat: 47.680183 } },
  { position: { lng: -0.812988, lat: 47.724545 } },
  { position: { lng: -1.054688, lat: 47.680183 } },
  { position: { lng: -1.219482, lat: 47.41322 } },
];

const poly1 = [
  { lng: -1.219482, lat: 47.41322 },
  { lng: -1.571045, lat: 47.457809 },
  { lng: -1.560059, lat: 47.739323 },
  { lng: -0.922852, lat: 47.886881 },
  { lng: -0.769043, lat: 48.231991 },
  { lng: 0.395508, lat: 48.268569 },
  { lng: 0.604248, lat: 48.026672 },
  { lng: 1.2854, lat: 47.982568 },
  { lng: 1.318359, lat: 47.894248 },
  { lng: 1.373291, lat: 47.879513 },
  { lng: 1.384277, lat: 47.798397 },
  { lng: 1.329346, lat: 47.754098 },
  { lng: 1.329346, lat: 47.680183 },
  { lng: 0.999756, lat: 47.635784 },
  { lng: 0.86792, lat: 47.820532 },
  { lng: 0.571289, lat: 47.820532 },
  { lng: 0.439453, lat: 47.717154 },
  { lng: 0.439453, lat: 47.61357 },
  { lng: -0.571289, lat: 47.487513 },
  { lng: -0.615234, lat: 47.680183 },
  { lng: -0.812988, lat: 47.724545 },
  { lng: -1.054688, lat: 47.680183 },
  { lng: -1.219482, lat: 47.41322 },
];

export default {
  components: {
    LControlPolylineMeasure,
    LFreedraw,
    LDrawToolbar,
  },
  watch: {
    popupName() {
      this.$router.push(`/statistic/code=${this.popupName}`);
    },
  },
  data() {
    return {
      imperial: false, // biến zoom
      popupName: null, // tên của ô geo khi click, dùng để thay đổi router
      // toast hiển thị thông báo
      timeout: "2000", // thời gian hiển thị thông báo mặc định
      toast: {
        isShowToast: false,
        text: "",
        color: "",
        style: "",
      },
      //#region draw
      isActive: false,
      polygons: [],
      //#endregion
      //#region MapOption
      mapOptions: {
        // chức năng của geo
        style: function style() {
          return {
            weight: 4,
            opacity: 0.7,
            color: "#E4CE7F",
            fillOpacity: 0.3,
          };
        },
        onEachFeature: (feature, layer) => {
          var self = this;

          layer.on("mouseover", function (e) {
            e.target.setStyle({
              fillColor: "teal",
            });
          });
          layer.on("mouseout", function (e) {
            e.target.setStyle({
              fillColor: self.fillColor,
            });
          });
          // TODO: chỉ hiển thị ra một cái layer
          layer.on("click", function () {
            self.popupName = feature.attributes.VARNAME_2;
            self.isShowLayerInfo = true;
            self.nameDetail = feature.attributes.NAME_2 + "/" + feature.attributes.NAME_1;
            self.codeDetail = feature.attributes.TYPE_2 + " " + feature.attributes.VARNAME_2;
            self.latLngDetail = self.currentCenterLayer;
          });
        },
      },
      //#endregion

      zoom: 8,
      geojson: null,
      fillColor: "#e4ce7f",
      loading: false,
      show: false,
      enableTooltip: false,
      isShowLayerInfo: false,
      nameDetail: null,
      latLngDetail: null,
      codeDetail: null,
      center: latLng(48, -1.219482),
      marker: latLng(47.41322, -1.219482),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      baseUrl: "http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      layers: [
        {
          name: "HCMGIS Maps",
          visible: true,
          format: "image/png",
          layers: "nexrad-n0r-900913",
          transparent: true,
          attribution: "Weather data © 2012 IEM Nexrad",
          baseUrl: "http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        },
        {
          name: "Google Maps",
          visible: false,
          format: "image/png",
          layers: "nexrad-n0r-900913",
          transparent: true,
          attribution: "Weather data © 2012 IEM Nexrad",
          baseUrl: "http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
        },
        {
          name: "Google Satellite Hybrid",
          visible: false,
          format: "image/png",
          layers: "nexrad-n0r-900913",
          transparent: true,
          attribution: "Weather data © 2012 IEM Nexrad",
          baseUrl: "http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
        },
        {
          name: "Google Satellite",
          visible: false,
          format: "image/png",
          layers: "nexrad-n0r-900913",
          transparent: true,
          attribution: "Weather data © 2012 IEM Nexrad",
          baseUrl: "http://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        },
      ],
      markers: [
        {
          id: "m1",
          position: { lat: 51.505, lng: -0.09 },
          tooltip: "tooltip for marker1",
          draggable: true,
          visible: true,
        },
        {
          id: "m2",
          position: { lat: 51.8905, lng: -0.09 },
          tooltip: "tooltip for marker2",
          draggable: true,
          visible: false,
        },
        {
          id: "m3",
          position: { lat: 51.005, lng: -0.09 },
          tooltip: "tooltip for marker3",
          draggable: true,
          visible: true,
        },
        {
          id: "m4",
          position: { lat: 50.7605, lng: -0.09 },
          tooltip: "tooltip for marker4",
          draggable: true,
          visible: false,
        },
      ],
      polylines: [
        {
          id: "p1",
          points: [
            { lat: 37.772, lng: -122.214 },
            { lat: 21.291, lng: -157.821 },
            { lat: -18.142, lng: -181.569 },
            { lat: -27.467, lng: -206.973 },
          ],
          visible: true,
        },
        {
          id: "p2",
          points: [
            [-73.91, 40.78],
            [-87.62, 41.83],
            [-96.72, 32.76],
          ],
          visible: true,
        },
      ],
      poly2: null,
      stuff: [
        {
          id: "s1",
          markers: markers1,
          polyline: { points: poly1, visible: true },
          visible: true,
          markersVisible: true,
        },
      ],
      poly: null,
      currentCenterLayer: null,
      // map: null,
      geoform: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [0.42183, 48.01156],
                ],
              ],
            },
            properties: {
              code: "72341",
              nom: "Soulitré",
            },
          },
        ],
      },
      featureform: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[[0.42183, 48.01156]]],
        },
        properties: {
          code: "72341",
          nom: "Soulitré",
        },
      },
    };
  },
  created() {
    this.handleGetGeo();
    // this.handleGetGeo2();
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.map = this.$refs.map.mapObject; // work as expected
    // });
  },
  computed: {
    mode() {
      return this.isActive ? ALL : NONE;
    },
    styleFunction() {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: "#ECEFF1",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1,
        };
      };
    },
  },
  methods: {
    //#region draw
    flipActive() {
      this.isActive = !this.isActive;
    },
    //#endregion
    //#region show layer position
    /**
     * Lưu vị trí click chuột
     */
    onMapClick(event) {
      this.currentCenterLayer = event.latlng;
    },
    /**
     * get center và zoom
     */
    handleGetLayerCenter() {
      this.zoom = 12;
      this.center = this.currentCenterLayer;
    },
    //#endregion
    //#region Toast
    notifySuccess(text) {
      this.toast.color = "green";
      this.toast.text = text;
      this.toast.isShowToast = true;
      this.toast.type = "success";
    },
    notifyError(text) {
      this.toast.color = "red";
      this.toast.text = text;
      this.toast.isShowToast = true;
      this.toast.type = "danger";
    },
    //#endregion

    //#region API
    /**
     * Hàm lấy thông tin Geo layer
     * return: list geo layer
     * CreatedBy: NGDuong (11/05/2021)
     */
    async handleGetGeo() {
      const data = await axios.get(
        "http://203.162.10.117:6080/arcgis/rest/services/MapHYServices/MapServer/1/query?returnGeometry=true&where=1%3D1&outSR=4326&outFields=*&inSR=4326&geometry=%7B%22xmin%22%3A105.46875%2C%22ymin%22%3A20.632784250388028%2C%22xmax%22%3A106.171875%2C%22ymax%22%3A21.289374355860424%2C%22spatialReference%22%3A%7B%22wkid%22%3A4326%7D%7D&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&geometryPrecision=6&resultType=tile&f=json"
      );
      console.table(data.data);
      data.data.features.map((item, index) => {
        this.geoform.features[index] = {...this.featureform, attributes: item.attributes};
        this.geoform.features[index].geometry.coordinates = item.geometry.rings;
        // return this.geoform;
      });
      console.log("form:");
      console.table(this.geoform);
    }
    //#endregion
  },
};
</script>

<style lang="scss" scoped>
.please {
  position: relative;
  top: 0;
  left: 0;
}
.leaflet-draw-toolbar.leaflet-control-toolbar {
  padding: initial !important;
}
.custom-control {
  background: #fff;
  border: 1px solid #aaa;
  width: 30px;
}
.icon-middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30px;
  height: 30px;
  &:hover {
    background-color: #cccccc;
  }
}

.use-control {
  background-color: #cccccc;
}

.custom-control-watermark {
  font-size: 100%;
  font-weight: bolder;
  color: #aaa;
  text-shadow: #555;
}

.geo-detail {
  position: absolute;
  top: 50px;
  right: 11px;
  width: 300px;
  height: 310px;
  z-index: 1000;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }
  .span-conclude {
    margin: 10px auto;
    font-size: 13px;
  }
  .title {
    color: rgb(17, 17, 17) !important;
    font-size: 17px !important;
    padding: 0 !important;
  }
  .span-img {
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    .span-img-info {
      margin: 10px auto;
      font-size: 18px;
      font-weight: 700;
    }
    .span-img-name {
      margin: 0 auto;
      font-size: 12px;
      font-weight: 300;
    }
  }

  .info-layer {
    display: flex;
    justify-content: space-between;
    width: 90%;
    height: 30px;
    margin: 5px auto;
    background-color: inherit;
    span {
      font-size: 14px;
    }
  }
}
</style>
