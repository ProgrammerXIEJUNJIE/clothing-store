<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <div>
        <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"/>
      </div>
    </Scroll>

  </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Scroll from  'components/common/scroll/Scroll'
    import CartListItem from './CartListItem'

    export default {
        name: "CartList",
      components:{
        Scroll,
        CartListItem
      },
      computed:{
          ...mapGetters(['cartList'])
      },
      activated() {
        this.$refs.scroll.refresh();
      }
    }
</script>

<style scoped>
  .cart-list{
    height: calc(100vh - 44px - 49px - 40px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
