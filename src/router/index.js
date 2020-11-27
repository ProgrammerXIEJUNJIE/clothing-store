import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = ()=>import('../views/home/Home');
const Category = ()=>import('../views/category/Category');
const Cart = ()=>import('../views/cart/Cart');
const Profile = ()=>import('../views/profile/Profile');
const Detail = ()=>import('../views/detail/Detail');
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
};
Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home,
    meta:{
      keepAlive:true //此组件需要被缓存
    }
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
];

const router = new VueRouter({
  routes,
  mode:'history'
});

export default router
