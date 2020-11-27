<template>
     <div class="tab-control">
       <div v-for="(item,index) in titles" class="tab-control-item"
            :class="{active:index === currentIndex}" @click="tabClick(index)">
         <span>{{item}}</span>
       </div>
     </div>
</template>

<script>
    import Scroll from  'components/common/scroll/Scroll'
    export default {
        name: "TabControl",
        components:{
          Scroll
        },
        props:{
          titles:{
            type:Array,
            default(){
              return []
            }
          }
        },
      data(){
          return{
            currentIndex:0
          }
      },
      methods:{
        tabClick(index){
          this.currentIndex=index;
          this.$emit('tabItemClick',index);
        },
        //获取tabControl的offsetTop
        getOffsetTop(){
          return this.$el.offsetTop
        }
      }
    }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    z-index: 9;
    background: #ffffff;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
