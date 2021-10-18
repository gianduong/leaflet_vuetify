import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { LMap, LTileLayer, LMarker,LControl,LControlAttribution,LControlScale,LControlLayers,LControlZoom,LFeatureGroup,LGeoJson } from 'vue2-leaflet';
import {LIcon,LImageOverlay,LLayerGroup,LPolygon,LPolyline,LPopup,LRectangle,LTooltip,LWMSTileLayer} from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import VueRouter from 'vue-router'
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
Vue.component('l-map', LMap); // bản đồ
Vue.component('l-tile-layer', LTileLayer); // thông tin về map. vd url, attribution
Vue.component('l-marker', LMarker); // điểm maker
Vue.component('l-control',LControl), // button tùy chọn
Vue.component('l-control-attribution',LControlAttribution), // thông tin về map
Vue.component('l-control-layers',LControlLayers), // thay đổi map
Vue.component('l-control-zoom',LControlZoom), // zoom
Vue.component('l-feature-group',LFeatureGroup), // nhóm các yếu tố dùng chung. vd dùng chung một định dạng tooltip
Vue.component('l-geo-json',LGeoJson), // LGeoJson?
Vue.component('l-icon',LIcon), // 
Vue.component('l-image-overlay',LImageOverlay), // sử dụng hình ảnh thay map
Vue.component('l-layer-group',LLayerGroup), // ‎Nhóm các yếu tố của bản đồ bao gồm: đánh dấu, geoJSON, đa giác và đa giác, tooltip và popup.‎
Vue.component('l-polygon',LPolygon), // hình khép kín
Vue.component('',LPolyline), // các đường
Vue.component('l-popup',LPopup), // 
Vue.component('l-rectangle',LRectangle), // 
Vue.component('l-tooltip',LTooltip), // 
Vue.component('l-wms-tile-layer',LWMSTileLayer ), // lớp lát, biểu diễn nhiệt, đọ cao..
Vue.component('',LControlScale), // khoảng cách bao nhiêu km ... khi zoom
Vue.config.productionTip = false
Vue.use(VueRouter)
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
