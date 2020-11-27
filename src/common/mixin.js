import {debounce} from "./utils";
import BackTop from 'components/content/backTop/BackTop'

export const itemImgListener = {
  data(){
    return{
      itemImgListener: null,
      newRefresh:null
    }
  },
  mounted(){
    this.newRefresh=debounce(this.$refs.scroll.refresh,100);
    this.itemImgListener = () =>{
      this.newRefresh()
    };
    this.$bus.$on('imageLoaded',this.itemImgListener)
  }
};

