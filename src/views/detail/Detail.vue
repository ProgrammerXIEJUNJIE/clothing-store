<template>
    <div id="detail">
        <detail-nav-bar class="nav-bar" @titleClick="titleClick" ref="nav"/>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
          <detail-swiper :top-images="topImages"/>
          <detail-base-info :goods="goods"/>
          <DetailShopInfo :shop="shopInfo"/>
          <detail-image-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
          <detail-params-info :item-params="itemParams" ref="params"/>
          <detail-comment-info :comment-info="commentInfo" ref="comment"/>
          <good-list :goods="recommends" ref="recommend"/>
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"/>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
        <toast :message="message" :show="show"/>
    </div>
</template>

<script>
    import Scroll from  'components/common/scroll/Scroll'
    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from  './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailImageInfo from './childComps/DetailImageInfo'
    import DetailParamsInfo from './childComps/DetailParamsInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import GoodList from 'components/content/goods/GoodsList'
    import DetailBottomBar from './childComps/DetailBottomBar'
    import BackTop from 'components/content/backTop/BackTop'
    import Toast from 'components/common/toast/Toast'

    import {getDetail, GoodsInfo ,getRecommend} from "network/detail"
    import {itemImgListener} from "../../common/mixin";
    import {debounce} from "../../common/utils";

    export default {
        name: "Detail",
        components:{
          DetailNavBar,
          DetailSwiper,
          DetailBaseInfo,
          Scroll,
          DetailShopInfo,
          DetailImageInfo,
          DetailParamsInfo,
          DetailCommentInfo,
          GoodList,
          DetailBottomBar,
          BackTop,
          Toast
        },
        mixins:[itemImgListener],
        data(){
          return{
            iid:null,
            topImages:[],
            goods:{},
            shopInfo:{},
            detailInfo:{},
            itemParams:{},
            commentInfo:{},
            recommends:[],
            titleTopYs:[],
            getTitleTopY:null,
            currentIndex:0,
            isShowBackTop:false,
            message:'',
            show: false
          }
        },
        created() {
          this.iid = this.$route.params.iid;
          getDetail(this.iid).then( res =>{
            const data = res.result;
            //获取顶部轮播图片数据
            this.topImages = data.itemInfo.topImages;

            //获取商品信息
            this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);

            //获取商品店铺信息
            this.shopInfo = data.shopInfo;

            //获取商品图片
            this.detailInfo = data.detailInfo;

            //获取参数信息
              this.itemParams = data.itemParams;

            //获取评论信息
            if(data.rate.cRate !==0 ){
              this.commentInfo = data.rate.list[0];
            }
          });
          //获取推荐数据
          getRecommend().then(res => {
            this.recommends = res.data.list;
          });
          this.getTitleTopY = debounce(()=>{
            this.titleTopYs = [];
            this.titleTopYs.push(0);
            this.titleTopYs.push(this.$refs.params.$el.offsetTop);//参数的offsetTop
            this.titleTopYs.push(this.$refs.comment.$el.offsetTop);//评论的offsetTop
            this.titleTopYs.push(this.$refs.recommend.$el.offsetTop);//推荐的offsetTop
            this.titleTopYs.push(Number.MAX_VALUE)
          },100)
        },
      mounted() {

      },
      updated(){

      },
      methods:{
        detailImageLoad(){
          //解决详情页图片卡顿bug
          this.newRefresh();
          // this.$refs.scroll.refresh()
          this.getTitleTopY();
        },
        titleClick(index){
          this.$refs.scroll.scrollTo(0,-this.titleTopYs[index],200);
        },
        //回到顶部
        backClick(){
          this.$refs.scroll.scrollTo(0,0,1000)
        },
        contentScroll(position){
          //实现详情页导航栏的联动效果
          const positionY = -position.y;
          let length = this.titleTopYs.length;
          for (let i = 0; i < length - 1; i++){
            if(this.currentIndex !== i && (positionY >= this.titleTopYs[i] && positionY < this.titleTopYs[i+1])){
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex;
            }
          }
          //实现backTop的隐藏和出现
          this.isShowBackTop=position.y < -1000;
        },
        //实现添加到购物车
        addToCart(){
          const product = {};
          product.image = this.topImages[0];
          product.title = this.goods.title;
          product.desc = this.goods.desc;
          product.price = this.goods.realPrice;
          product.iid = this.iid;

          //把商品信息添加到vuex中
          this.$store.dispatch('addCart',product).then(res =>{
            this.show = true;
            this.message = res;

            setTimeout(()=>{
              this.show = false;
              this.message = ''
            },1500)

          })
        }
      },
      destroyed() {
        this.$bus.$off('imageLoaded',this.itemImgListener)
      }
    }
</script>

<style scoped>
  .nav-bar{
    position: relative;
    z-index: 9;
    background: #fff;
  }
  #detail{
    height: 100vh;
    background: #fff;
    position: relative;
    z-index: 1;
  }
  .content{
  background: #ffffff;
  height: calc(100% - 44px - 58px);
  }
</style>
