<template>
  <div>
    <div class="prize-ja" v-for="(item,index) in processList" :key="index" @click="clcikUrl(item.goods.goodsId)">
        <div class="img">
          <img :src="item.goods.imgPath" />
        </div>
        <div class="info">
          <div class="info-dis1">
            <div class="li">
              <i></i>价格：<span>{{item.goods.amt/100}}</span> 元
            </div>
          </div>
          <div class="da-dbtn">
            <img v-if="(item.recever == 1)" src="../../assets/page7_29.png">
            <img v-if="(item.recever == 2)" src="../../assets/daif.png">
            <img v-if="(item.recever == 3)" src="../../assets/yif.png">
          </div>
        </div>
        <div class="title">
          <h2>{{item.goods.name}}</h2>
        </div>
      </div>
      <div class="isnull" v-if="(processList.length==0)">
        <img src="../../assets/isnull.png">
      </div>
  </div>
</template>
<script>
import {minutesAndSeconds,getUrlParameter} from '../../assets/js/util'
import { Indicator } from 'mint-ui';
export default {
  data(){
    return{
      endPagelis:[],
      processList:[]
    }
  },
  mounted(){
    //let ttt = localStorage.getItem("ttt") process
    Indicator.open();
    this.$post('/member/getPage',{page:1,limit:100,ttt:localStorage.getItem("ttt"),tab:"lottery"})
    .then(res=>{
      Indicator.close();
      if(res.code == "0000"){
        console.log(res)
        // console.log(res.result.endPage.list)
        // console.log(res.result.processList)
        this.processList = res.result.lotteryPage.list
        // this.endPagelis = res.result.endPage.list
      }
      //console.log(res)
    })
  },
  methods:{
    clcikUrl(ids){
      this.$router.push({name:'details',params:{id:ids}});
    },
  }
}
</script>
<style>
.isnull{ text-align: center; padding-top: 0.6rem}
.isnull img{ 
  width: 4.76rem;
  height: 0.34rem;
}
</style>

