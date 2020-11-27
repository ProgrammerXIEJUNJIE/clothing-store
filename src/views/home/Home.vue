<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 ref="tabControl1"
                 @tabItemClick="tabClick"
                 class="tab-control"
                 v-show="isFixed"
    />
   <scroll class="content" ref="scroll" :probe-type="3"
           @scroll="contentScroll"
           :pull-up-load="true"
           @pullingUp="loadMore">
     <home-swiper :banners="banners" @SwiperImageLoad="SwiperImageLoad"></home-swiper>
     <recommend-view :recommends="recommends"></recommend-view>
     <feature-view/>
     <tab-control :titles="['流行','新款','精选']"
                  ref="tabControl2"
                  @tabItemClick="tabClick"
                  />
     <good-list :goods="showgoods"></good-list>
   </scroll>
    <!--组件不能直接监听点击事件，如果组件需要监听点击事件需加上.native-->
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  import GoodList from 'components/content/goods/GoodsList'
  import Scroll from  'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {
    getHomeMultidata,
    getHomeGoods
  } from "../../network/home";
  import {debounce} from "common/utils";
  import {itemImgListener} from "../../common/mixin";

  export default {
        name: "Home",
        components:{
          NavBar,
          HomeSwiper,
          RecommendView,
          FeatureView,
          TabControl,
          GoodList,
          Scroll,
          BackTop
        },
        mixins:[itemImgListener],
        data(){
          return{
            banners:[],
            recommends:[],
            goods:{
              'pop':{page:0,list:[]},
              'new':{page:0,list:[]},
              'sell':{page:0,list:[]},

            },
            currentType:'pop',
            isShowBackTop:false,
            topOffsetTop:0,
            isFixed:false,
            saveY:0,
          }
        },
        created() {
          //请求首页数据
          this.getHomedata();
          //请求首页商品数据
          this.getHomeGoods('pop');
          this.getHomeGoods('new');
          this.getHomeGoods('sell');
        },
        activated() {
          this.$refs.scroll.scrollTo(0,this.saveY,0);
          this.$refs.scroll.refresh();

        },
        deactivated() {
          this.saveY = this.$refs.scroll.getScrollY();
          //取消全局事件监听
          this.$bus.$off('imageLoaded',this.itemImgListener)
        },
        computed:{
          showgoods(){
            return this.goods[this.currentType].list
          }
        },
        mounted(){
        },
        beforeRouteEnter(to, from, next){
          if(to.name === 'Detail'){
            from.meta.keepAlive = true;
            next();
          }else {
            from.meta.keepAlive = false;
            next();
          }
        },
        methods: {
          /**
           *事件监听
           */
          //tab之间的切换
          tabClick(index){
            switch (index) {
              case 0:
                this.currentType='pop';
                break;
              case 1:
                this.currentType='new';
                break;
              case 2:
                this.currentType='sell';
                break
            }
            this.$refs.scroll.scrollTo(0,-this.topOffsetTop,0);
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
          },
          //回到顶部
          backClick(){
           this.$refs.scroll.scrollTo(0,0,1000)
          },
          //监听滚轮的滚动位置
          contentScroll(position){
            //1实现backTop的隐藏和出现
            this.isShowBackTop=position.y < -1000;
            //把position.y < -1000为true的值赋值给this.isShowBackTop的false
            //所以this.isShowBackTop的值为true

            //2实现tabControl是否吸顶
            this.isFixed = (-position.y) > this.topOffsetTop
          },
          //上拉加载更多
          loadMore(){
            this.getHomeGoods(this.currentType);
            //下拉加载更多后，让滚轮重新计算可滚动高度
            this.$refs.scroll.refresh();
          },
          //2当导航栏图片加载完获取tabControl的offsetTop
            //不能放在mounted中 因为图片还没有加载完
          SwiperImageLoad(){
            this.topOffsetTop = this.$refs.tabControl2.getOffsetTop();
          },

          /**
           * 网络请求
           */
          getHomedata() {
            getHomeMultidata().then(res =>{
              this.banners=res.data.banner.list;
              this.recommends=res.data.recommend.list
            },err=>{
              console.log(err)
            })
          },
          getHomeGoods(type){
            const page = this.goods[type].page+1;
            getHomeGoods(type,page).then(res=>{
              this.goods[type].list.push(...res.data.list);
              this.goods[type].page +=1;
              //继续执行下拉加载更多
              this.$refs.scroll.finishLoad()
            },err=>{
             // console.log(err)
            })
          }

        },

  }
</script>

<style scoped>
  #home{
    position: relative;
  }
  .home-nav{
    background: var(--color-tint);
    color: #ffffff;
    /*在使用浏览器原生滚动时，为了让导航栏不跟随滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .content{
    height: calc(100vh - 93px);
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
.tab-control{
  position: relative;
  z-index: 9;
}
</style>
