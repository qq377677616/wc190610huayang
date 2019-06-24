    <template>
  <div>
    <div class="line">
        <img src="../../assets/page5_11.png"/>
      </div>
    <div class="prize-ja" v-for="(item,index) in processList" :key="index" @click="clcikUrl(item.goods.goodsId)">
        <div class="img">
          <img :src="item.goods.imgPath"/>
        </div>
        <div class="info">
          <div class="info-dis1">
            <div class="li">
              <i></i>价格：<span>{{item.goods.amt/100}}</span> 元
            </div>
            <div class="li" v-if="((item.goods.person - item.goods.currPerson) != 0)">
              <i></i>已有<span>{{item.goods.currPerson}}</span>人参与,差<span>{{item.goods.person - item.goods.currPerson}}</span>人未参与
            </div>
            <div class="li" v-if="((item.goods.person - item.goods.currPerson) == 0)">
               <i></i>此团人数已满
            </div>
            <!-- <div class="li">
              <i></i><span>2019</span>年<span>05</span>月<span>25</span>日<span>00:00</span>自动开奖
              <i></i>参团截止日期<span>{{item.goods.lotteryTime}}</span>
            </div> -->
          </div>
          <div class="da-date" v-if="(item.status!=2)">
            <img src="../../assets/page5_27.png"/>
            <div class="da-date-info">
              <span>{{item.soday.hou}}</span>小时<span>{{item.soday.min}}</span>分
            </div>
          </div>
          <div class="isimgs11" v-if="(item.status==2)">
            <img src="../../assets/page1_17.png"/>
          </div>
        </div>
        <div class="title">
          <h2>{{item.goods.name}}</h2>
        </div>
      </div>

      <!--prize-ja-->
      <div class="line">
        <img src="../../assets/page5_12.png" />
      </div>
      <div class="prize-ja on" v-for="item in endPagelis" :key="item.name"  @click="clcikUrl(item.goods.goodsId)">
        <div class="img soso_imghui">
          <img :src="item.goods.imgPath" />
        </div>
        <div class="info">
          <div class="info-dis1 on">
            <div class="li">
              <i></i>价格：<span>{{item.goods.amt/100}}</span> 元
            </div>
          </div>
          <div class="fil" >
            <img v-if="(item.goods.status==4 && item.lottery==false)" class="class1" src="../../assets/page5_32.png">
            <img v-if="(item.goods.status==3)" class="class2" src="../../assets/page5_39.png">
            <img v-if="(item.goods.status==4 && item.lottery==true)" class="class3" src="../../assets/page5_40.png">
          </div>

        </div>
        <div class="title">
          <h2>{{item.goods.name}}</h2>
        </div>
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
    //let ttt = localStorage.getItem("ttt")
    Indicator.open()
    this.$post('/member/getPage',{page:1,limit:100,ttt:localStorage.getItem("ttt")})
    .then(res=>{
      Indicator.close()
      if(res.code == "0000"){

        this.processList = res.result.processList
        this.endPagelis = res.result.endPage.list
        for(let i=0; i<res.result.processList.length; i++){
          this.processList[i].soday = {}
          this.processList[i].soday = this.countdown(res.result.processList[i].goods.expireTime)
        }
        
        for(let i=0; i<res.result.endPage.list.length; i++){
          this.endPagelis[i].soday = {}
          this.endPagelis[i].soday = this.countdown(res.result.endPage.list[i].goods.expireTime)
        }
      }
    })
  },
  methods:{
    clcikUrl(ids){
      this.$router.push({name:'details',params:{id:ids}});
    },
    //倒计时
    countdown (time) {
      //sec =sec- 60
      var dateobj = {}
      if(time>0){
      let day = parseInt(time / (60 * 60 * 24));
      let hou = parseInt(time / 3600);
      let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
      dateobj={day:day,hou:hou,min:min}
      }else{
        dateobj={day:0,hou:0,min:0}
      }
      return dateobj;
    },
  }
}
</script>
<style>
.isimgs11{
    flex: 1;
  text-align: right;
  position: absolute;
  bottom: 0.34rem;
  right: 0.3rem;
}
.isimgs11 img{
  display: inline-block;
  width: 1.6rem;

}
</style>

