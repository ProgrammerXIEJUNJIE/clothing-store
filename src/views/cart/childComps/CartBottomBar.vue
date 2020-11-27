<template>
    <div class="bottom-bar">
      <div class="check-content">
        <check-button class="check-all" :is-checked="isCheckedAll" @click.native="checkAll"/>
        <span>全选</span>
      </div>

      <div class="total-price">
        <span class="total">合计:</span>
        <span class="price">{{totalPrice}}</span>
      </div>

      <div class="calculate" @click="caclClick">
        去结算:{{checkLength}}
      </div>
      <toast :message="message" :show="show"/>
    </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton'
    import Toast from 'components/common/toast/Toast'

    export default {
        name: "CartBottomBar",
        components:{
          CheckButton,
          Toast
        },
        data(){
          return {
            message:'',
            show: false
          }
        },
        computed:{
          //计算购物车选中商品总价
          totalPrice(){
            return '￥'+this.$store.getters.cartList.filter(item => {
              return item.checked
            }).reduce((preValue,item)=>{
              return preValue + item.price * item.count
            },0).toFixed(2)
          },
          //计算购物车选中商品数量
          checkLength(){
            return this.$store.state.cartList.filter(item => item.checked).length
          },
          isCheckedAll(){
            //方法1
            //if(this.$store.state.cartList.length === 0) return false;
            //return !(this.$store.state.cartList.filter(item => !item.checked).length)

            //方法2
            if(this.$store.state.cartList.length === 0) return false;
            return !this.$store.state.cartList.find(item => !item.checked)

            //方法3
            // for (let item of this.$store.state.cartList){
            //     if(!item.checked){
            //       return false
            //     }
            // }
            // return true
          }
        },
      methods:{
        //全选
        checkAll() {
          if(this.isCheckedAll){
            this.$store.state.cartList.forEach(item => item.checked = false);
          }else {
            this.$store.state.cartList.forEach(item => item.checked = true)
          }
        },
        caclClick(){
          if(!this.isCheckedAll){
            this.show = true;
            this.message = '请选择要购买的商品哦';

            setTimeout(()=>{
              this.show = false;
              this.message = ''
            },1500)
          }

        }
      }
    }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    font-family: "微软雅黑",serif;
    font-size: 14px;
    background-color: #eee;
  }
  .check-content{
    width: 60px;
    margin-left: 10px;
    display: flex;
    align-items: center;
  }
  .check-all{
    width: 21px;
    height: 21px;
    margin-right: 5px;
    line-height: 21px;
  }
  .total-price{
    flex: 1;
    margin-left: 30px;
  }
  .price{
    color: orange;
    font-size: 16px;
  }
  .calculate{
    width: 90px;
    color: #fff;
    text-align: center;
    background-color: red;
  }
</style>
