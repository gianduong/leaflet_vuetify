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

/** VueApexCharts */
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
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
  Vue.component('l-polyline', LPolyline), // các đường
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

import vd1 from "./components/example/CustomIcon.vue"
import vd2 from "./components/example/CustomLeafletControl.vue"
import vd3 from "./components/example/CustomPath.vue"
import vd4 from "./components/example/EditSize.vue"
import vd5 from "./components/example/FeatureShowCase.vue"
import vd6 from "./components/example/FixedBounch.vue"
import vd7 from "./components/example/Geo.vue"
import vd8 from "./components/example/MultiMap.vue"
import vd9 from "./components/example/Overlay.vue"
import vd10 from "./components/example/Popup.vue"
import vd11 from "./components/example/Swiching.vue"
import vd12 from "./components/example/TooltipShow.vue"
import vd13 from "./components/example/WMSTileLayer.vue"

import ChartRouter from './components/chart/ChartRouter.vue';



const router = new VueRouter({
  routes: [
    // dynamic segments start with a colon
    { path: '*', component: Catch404 }, // bắt 404
    { path: "/Breweries", component: Breweries },
    { path: "/vd1", component: vd1 },
    { path: "/vd2", component: vd2 },
    { path: "/vd3", component: vd3 },
    { path: "/vd4", component: vd4 },
    { path: "/vd5", component: vd5 },
    { path: "/vd6", component: vd6 },
    { path: "/vd7", component: vd7 },
    { path: "/vd8", component: vd8 },
    { path: "/vd9", component: vd9 },
    { path: "/vd10", component: vd10 },
    { path: "/vd11", component: vd11 },
    { path: "/vd12", component: vd12 },
    { path: "/vd0", component: vd13 },
    // chart
    { path: "/charts", component: ChartRouter },
    { path: "/statistic", component: LocalMap },
    {
      path: '/statistic', component: LocalMap,
      children: [
        {
          path: 'DataHeader', component: DataHeader
        },
        {
          path: 'InfoDetail', component: InfoDetail
        },
        {
          path: 'SearchList', component: SearchList
        },
        
      ]
    },
  //   {
  //     path: '/Login', component: Login 
  //  }
  ]
})

/** Map */
import LocalMap from "../src/components/map/LocalMap.vue"
import DataHeader from "./components/map/navbar-map/DataHeader.vue";
import InfoDetail from "./components/map/navbar-map/InfoDetail.vue";
import SearchList from "./components/map/navbar-map/SearchList.vue";
// import Login from "./components/layout/CardLogin.vue"

new Vue({
  vuetify, router,
  render: h => h(App)
}).$mount('#app')
