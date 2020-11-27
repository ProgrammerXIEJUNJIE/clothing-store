<template>
   <div class="cart">
     <!--导航-->
     <nav-bar class="nav-bar">
       <div slot="center">购物车({{cartLength}})</div>
     </nav-bar>
     <!--购物车商品列表-->
     <cart-list/>
     <!--底部结算栏-->
     <cart-bottom-bar/>
   </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import CartList from "./childComps/CartList"
    import CartBottomBar from './childComps/CartBottomBar'

    import {mapGetters} from 'vuex'

    export default {
      name: "Cart",
      components: {
        NavBar,
        CartList,
        CartBottomBar
        },
      computed:{
        ...mapGetters(['cartLength'])
      }
    }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    color: #fff;
    background-color: var(--color-tint);
  }
</style>
