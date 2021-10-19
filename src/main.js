import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
/**
 * import leaflet
 */
import { LMap, LTileLayer, LMarker, LControl, LControlAttribution, LControlScale, LControlLayers, LControlZoom, LFeatureGroup, LGeoJson } from 'vue2-leaflet';
import { LIcon, LImageOverlay, LLayerGroup, LPolygon, LPolyline, LPopup, LRectangle, LTooltip, LWMSTileLayer } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
/**
 * hiển thị icon
 */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
/**
 * list component
 */
Vue.component('l-map', LMap); // bản đồ
Vue.component('l-tile-layer', LTileLayer); // thông tin về map. vd url, attribution
Vue.component('l-marker', LMarker); // điểm maker
Vue.component('l-control', LControl), // button tùy chọn
Vue.component('l-control-attribution', LControlAttribution), // thông tin về map
Vue.component('l-control-layers', LControlLayers), // thay đổi map
Vue.component('l-control-zoom', LControlZoom), // zoom
Vue.component('l-feature-group', LFeatureGroup), // nhóm các yếu tố dùng chung. vd dùng chung một định dạng tooltip
Vue.component('l-geo-json', LGeoJson), // LGeoJson?
Vue.component('l-icon', LIcon), // 
Vue.component('l-image-overlay', LImageOverlay), // sử dụng hình ảnh thay map
Vue.component('l-layer-group', LLayerGroup), // ‎Nhóm các yếu tố của bản đồ bao gồm: đánh dấu, geoJSON, đa giác và đa giác, tooltip và popup.‎
Vue.component('l-polygon', LPolygon), // hình khép kín
Vue.component('', LPolyline), // các đường
Vue.component('l-popup', LPopup), // 
Vue.component('l-rectangle', LRectangle), // 
Vue.component('l-tooltip', LTooltip), // 
Vue.component('l-wms-tile-layer', LWMSTileLayer), // lớp lát, biểu diễn nhiệt, đọ cao..
Vue.component('', LControlScale), // khoảng cách bao nhiêu km ... khi zoom
Vue.config.productionTip = false
Vue.use(VueRouter)
/** import router */
import Breweries from "./components/brewery/Breweries.vue"
import Catch404 from "./components/Catch/Catch404.vue"
const router = new VueRouter({
  routes: [
    // dynamic segments start with a colon
    { path: '*', component: Catch404 }, // bắt 404
    {path: "/Breweries", component:Breweries},
  ]
})
new Vue({
  vuetify,router,
  render: h => h(App)
}).$mount('#app')
