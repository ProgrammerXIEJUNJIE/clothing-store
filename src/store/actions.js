export default {
  addCart(context,payload){
    return new Promise((resolve,reject) =>{
      let oldProduct = null;
      for (let item of context.state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item;
        }
      }

      if(oldProduct){
        context.commit('addCount',oldProduct);
        resolve('当前的商品数量加1')
      }else {
        payload.count = 1;
        context.commit('addToCart',payload);
        resolve('成功添加到购物车')
      }
    })
  }
}
