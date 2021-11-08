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
    <l-map
      :zoom="zoom"
      :center="center"
      style="height: 500px; width: 100%"
      ref="myMapRef"
      @click="onMapClick"
    >
      <l-control-zoom :position="'bottomright'"></l-control-zoom>
      <l-control-scale :imperial="imperial" :position="'topright'" />
      <l-geo-json
        v-if="show"
        :geojson="geojson"
        :options="mapOptions"
        :options-style="styleFunction"
        ref="geo"
      >
        <l-popup ref="popup">This is a popup open by default</l-popup>
      </l-geo-json>
      <l-control class="custom-control icon-middle" :position="'topleft'">
        <v-tooltip bottom z-index="1000" open-delay="400">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on" class="mi-16px icon-length"></div>
          </template>
          <span>Đo khoảng cách và diện tích</span>
        </v-tooltip>
      </l-control>
      <l-control class="custom-control" :position="'topleft'">
        <v-tooltip bottom z-index="1000" open-delay="400">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="mi border mi-30px icon-draw-polyline"
            ></div>
          </template>
          <span>Vẽ polyline</span>
        </v-tooltip>
        <v-tooltip bottom z-index="1000" open-delay="400">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="mi border mi-30px icon-draw-polygon"
            ></div>
          </template>
          <span>Vẽ Polygon</span>
        </v-tooltip>
        <v-tooltip bottom z-index="1000" open-delay="400">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="mi border mi-30px icon-draw-rectangle"
            ></div>
          </template>
          <span>Vẽ hình chữ nhật</span>
        </v-tooltip>
        <v-tooltip bottom z-index="1000" open-delay="400">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="mi border mi-30px icon-draw-circle"
            ></div>
          </template>
          <span>Vẽ hình tròn</span>
        </v-tooltip>
      </l-control>
      <l-control class="custom-control" :position="'topleft'">
        <v-tooltip bottom z-index="1000" open-delay="400">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="mi border mi-30px icon-edit"
            ></div>
          </template>
          <span>Chỉnh sửa hình đã vẽ</span>
        </v-tooltip>
        <v-tooltip bottom z-index="1000" open-delay="400">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
              class="mi border mi-30px icon-remove"
            ></div>
          </template>
          <span>Xóa hình đã vẽ</span>
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
      <l-control-layers />
      <l-wms-tile-layer
        v-for="layer in layers"
        :key="layer.name"
        :base-url="layer.baseUrl"
        :layers="layer.layers"
        :visible="layer.visible"
        :name="layer.name"
        layer-type="base"
      />
    </l-map>
    <v-card class="geo-detail" :class="{ hidden: !isShowLayerInfo }">
      <v-system-bar color="#F5F5F5" dark>
        <v-spacer></v-spacer>

        <v-icon color="#111">mdi-window-minimize</v-icon>

        <v-icon color="#111">mdi-window-maximize</v-icon>

        <v-icon color="#111" @click="isShowLayerInfo = false">mdi-close</v-icon>
      </v-system-bar>
      <v-app-bar dark color="#f5f5f5">
        <v-app-bar-nav-icon style="color: #111"></v-app-bar-nav-icon>

        <v-toolbar-title style="color: #111"
          >Chi tiết về khu nông nghiệp</v-toolbar-title
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
            >Chỉ số chất lượng không khí: 122.47156524658203</span
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
  </div>
</template>

<script>
import { latLng } from "leaflet";
// import axios from "axios";
// import L from "leaflet";
import { getGeoDatas } from "../../api/baseApi";
import notify from "../../utils/userMessage";
// import { LPopup } from 'vue2-leaflet';

export default {
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
          if (self.enableTooltip) {
            layer.bindTooltip(
              "<div style='color:red;'>code:" +
                feature.properties.code +
                "</div><div>nom: " +
                feature.properties.nom +
                "</div>",
              { permanent: false, sticky: true }
            );
          }
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
          layer.on("click", function (e) {
            self.popupName = feature.properties.code;
            self.isShowLayerInfo = true;
            self.nameDetail = feature.properties.nom;
            self.codeDetail = feature.properties.code;
            self.latLngDetail = self.currentCenterLayer;
          });
        },
        // onEachFeature: (feature, layer) => {
        //   var self = this;
        //   layer.on("click", function (e) {
        //     self.popupName = feature.properties.code;
        //     self.isShowLayerInfo = true;
        //     self.nameDetail = feature.properties.nom;
        //     self.codeDetail = feature.properties.code;
        //     self.latLngDetail = 1;
        //     //open popup
        //     var popup = L.popup();
        //     popup
        //       .setLatLng(e.latlng)
        //       .setContent(
        //         "<div style='color:red; width:300px'>code:" +
        //           feature.properties.code +
        //           "</div><div>nom: " +
        //           feature.properties.nom +
        //           "</div>"
        //       )
        //       .openOn(self.$refs.myMapRef.mapObject);
        //   });

        // },
      },
      //#endregion

      zoom: 8,
      geojson: null,
      fillColor: "#e4ce7f",
      loading: false,
      show: true,
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
      currentCenterLayer: null,
      map: null,
    };
  },
  created() {
    this.handleGetGeo();
  },
  mounted() {
    this.$nextTick(() => {
      this.map = this.$refs.myMapRef.mapObject; // work as expected
    });
  },
  computed: {
    options() {
      return {};
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
    handleGetGeo() {
      getGeoDatas()
        .then((res) => {
          this.geojson = res.data;
        })
        .catch(() => {
          this.notifyError(notify.Notify_Error());
        });
    },
    //#endregion
  },
};
</script>

<style lang="scss" scope>
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
  width: 400px;
  height: 410px;
  z-index: 1000;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }
  .span-conclude {
    margin: 10px auto;
    font-size: 15px;
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
    width: 80%;
    height: 30px;
    margin: 5px auto;
    background-color: inherit;
    span {
      font-size: 14px;
    }
  }
}
/**Toast */
.toast-content {
  display: flex;
  align-content: center;
  text-align: center;
  span {
    margin: auto 5px;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
