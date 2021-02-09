import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import VueAMap from 'vue-amap'
import Vant from 'vant';
import 'vant/lib/index.css';
import proConfig from '../public/global/proConfig'


Vue.use(ElementUI);
Vue.use(VueAxios, axios);
// Vue.use(VueAMap);
Vue.use(Vant);


// VueAMap.initAMapApiLoader({
//   key: '50c32d2e0c3e0d8250a934062d76bcda',
//   plugin: [
//     'AMap.CitySearch','AMap.DistrictSearch','AMap.DistrictLayer',
//     'AMap.Autocomplete',
//     'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
//     'AMap.ToolBar', 'AMap.MapType',
//     'AMap.PolyEditor', 'AMap.CircleEditor'
//   ],
//   v: '1.4.15'
// })


let isRelease = proConfig.ISRELEASE
if (isRelease) {
  axios.defaults.baseURL = 'https://api.idoctor.cc/BayerApi';
} else {
  axios.defaults.baseURL = proConfig.APIADD;
}

Vue.config.productionTip = false

console.log('main.js ~~~~~~');

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
