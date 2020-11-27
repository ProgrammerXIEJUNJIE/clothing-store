import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false;
Vue.prototype.$bus=new Vue();
//解决移动端300ms
FastClick.attach(document.body);
//使用懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/images/common/Loading.png')
});
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
