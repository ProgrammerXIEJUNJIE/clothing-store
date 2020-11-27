<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        data(){
          return{
            scroll:null
          }
        },

        props:{
          probeType:{
            type: Number,
            default: 0
          },
          pullUpLoad:{
            type: Boolean,
            default: false
          }
        },
        mounted() {
          //a.创建BScroll对象
          this.scroll = new BScroll(this.$refs.wrapper, {
            probeType: this.probeType,//实时监听滚动的位置
            click: true,//滚动点击事件设置为true,
            pullUpLoad: this.pullUpLoad//下拉加载更多
          });

          //b.监听滚动位置
          if (this.probeType === 2 || this.probeType === 3) {
            this.scroll.on('scroll', (position) => {
              this.$emit('scroll', position)
            });
          }
          //c监听scroll滚到底部
          if (this.pullUpLoad) {
            this.scroll.on('pullingUp', () => {
              this.$emit('pullingUp')
            });
          }
        },
        methods:{
          scrollTo(x,y,time=1000){
            //使用逻辑与进行判断,如果两边的值为truede情况下执行该函数
            this.scroll && this.scroll.scrollTo(x,y,time)
          },
          //继续执行上拉加载更多 因为pullingUp默认只加载一次
          finishLoad(){
            this.scroll.finishPullUp();
          },
          refresh(){
            this.scroll && this.scroll.refresh();
            // console.log('---');
          },
          getScrollY(){
            return this.scroll ? this.scroll.y : 0
          }
        },
      watch: {
        data() {
          setTimeout(this.refresh, 20)
        }
      }
    }
</script>

<style scoped>

</style>
