<template>
    <div class="goods"  >
        <goods-list-item v-for="item in goods" :goods-item="item"/>
    </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
    export default {
        name: "GoodsList",
        props:{
          goods:{
            type:Array,
            defaults(){
              return []
            }
          }
        },
      components:{
        GoodsListItem
      }
    }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
  /*flex-wrap: wrap; 让弹性盒元素在必要的时候拆行
   justify-content: space-around; 弹性盒对象的 元素中的各项周围留有空白
  */
</style>
