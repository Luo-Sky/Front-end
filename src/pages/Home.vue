<template>
  <div>



    <!-- <el-carousel trigger="click" height="50rem"> -->
    <!-- height="45em"  -->
    <div id="bg" style="height: calc(100vh - 64px);margin-top:-1px">
      <el-carousel direction="vertical" :autoplay="true" trigger="click" class="carbg" style="width: 100%;"
        height="100%" :interval="4000">
        <el-carousel-item v-for="item in images" :key="item.id" name="item.id">
          <div class="pic_item">
            <img class="small" :src="item.url" />
            <!-- v-text="heiehie" -->
            <div class="text1">
              <div class="textcard">
                <p style="font-size: 48px;" >{{ item.title }}</p>
              </div>
              <div @click="setTop()"  v-show="item.show" 
              style="z-index:100;  position: absolute;top: 60%;
              border-radius: 20px;text-align: center;
               background: linear-gradient(79deg, #30cfd0 0%, rgba(51, 8, 103, 0.64) 99%);
              color: white; width: 12%;left: 44%;">
                <p style="opacity: 1;"  >下滑查看更多<img style="height: 8%;width: 8%;opacity: 1;" src="../assets/img/down.gif"
                    alt=""></p>
              </div>
            </div>

            <!-- <span class="texts">{{ item.title }}</span> -->
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div style="background-color:white;height: 100rem;">


      <transition name="el-fade-in">

        <div v-show="show0"  >
          <el-card style="width: 100%;height: 20em; background-color: white;border: 0;" shadow="never">
            <p class="platformIntro">🦊🌸🌐<br>珞Sky——AI智能遥感解译平台<br>简洁 高效 创新 友好<br></p>
            <el-button class="getstart" @click="towork()"> <img class="btnpic" src="../assets/getstart.png"
                @click="towork()">快速开始</el-button>
            <a href="https://github.com/Luo-Sky" style="color:white">
              <el-button class="githublink"> <img class="btnpic" src="../assets/github.png" /> Github Link</el-button>
            </a>
          </el-card>
        </div>
     
      </transition>





      <transition name="el-fade-in">
        <!-- 导航条 -->
        <div v-show="show1">
          <el-card style="height: 55em;background-color:#f2f2f2;border: 0; " shadow="never">

            <transition name="el-fade-in">
              <el-row style="margin-top: 3%;" v-show="show2">
                <!-- 卡片1目标提取 -->
                <el-col :span="11" style="margin-left: 3%;">
                  <el-card class="introgif" slot="" shadow="hover">
                    <el-row>
                      <el-col :span="12"> <img class="showgif" src="../assets/img/6秒2.gif" /></el-col>
                      <el-col :span="12">
                        <div style="margin-left: 60px;">
                          <p style="font-size: larger;font-weight: bold;margin-top: 0;margin-bottom: 0;">🎯目标提取</p>
                          <p>提取遥感影像中特定的目标地物将<br />其在结果图中高亮显示，包括对道<br />路、水体和建筑物的提取。</p>
                          <p style="font-size: larger;font-weight: bold;">⭐亮点：</p>
                          <p>✨批处理<br />✨框选处理<br />✨道路、水体、建筑物三种算法</p>
                       
                       </div>
                       <el-button  style="float:right;color:#005BEA;margin-top: 36px;" size="mini" @click="towork()">去试试</el-button>
                      </el-col>
                    </el-row>


                  </el-card>
                </el-col>

                <!-- 卡片2变化检测 -->
                <el-col :span="11" style="margin-left: 1%;">
                  <el-card class="introgif" shadow="hover">
                    <el-row>
                      <el-col :span="12"> <img class="showgif" src="../assets/img/4秒.gif" /></el-col>
                      <el-col :span="12">
                        <div style="margin-left: 60px;">
                          <p style="font-size: larger;font-weight: bold;margin-top: 0;margin-bottom: 0;">🌠变化检测</p>
                          <p>识别两张不同时相同一地区的遥感<br />影像中建筑物变化的区域并将其在<br />结果图中高亮显示。</p>
                          <p style="font-size: larger;font-weight: bold;">⭐亮点：</p>
                          <p>✨批处理<br />✨框选处理<br />✨移动拖动条观察比较两张影像</p>
                        </div>
                        <el-button  style="float:right;color:#005BEA;margin-top: 36px;" size="mini" @click="towork()">去试试</el-button>
                      </el-col>
                    </el-row>


                  </el-card>
                </el-col>
              </el-row>

            </transition>
            <transition name="el-fade-in">
              <el-row style="margin-top: 3%;" v-show="show3">
                <!-- 卡片3目标检测 -->
                <el-col :span="11" style="margin-left: 3%;">
                  <el-card class="introgif" slot="" shadow="hover">
                    <el-row>
                      <el-col :span="12"> <img class="showgif" src="../assets/img/5秒.gif" /></el-col>
                      <el-col :span="12">
                        <div style="margin-left: 60px;">
                            <p style="font-size: larger;font-weight: bold;margin-top: 0;margin-bottom: 0;">📍目标检测</p>
                          <p>检测和识别一张遥感影像中的特定<br />地物并在结果图中结合置信度大小<br />将其框出，包括对飞机、立交桥以及操场的检测。</p>
                          <p style="font-size: larger;font-weight: bold;">⭐亮点：</p>
                          <p>✨批处理<br />✨框选处理<br />✨操场、立交桥、飞机三种算法</p>
                        </div>
                        <el-button  style="float:right;color:#005BEA;margin-top: 15px;" size="mini" @click="towork()">去试试</el-button>
                      </el-col>
                    </el-row>


                  </el-card>
                </el-col>
                <!-- 卡片4地物分类 -->
                <el-col :span="11" style="margin-left: 1%;">
                  <el-card class="introgif" shadow="hover">
                    <el-row>
                      <el-col :span="12"> <img class="showgif" src="../assets/img/6秒.gif" /></el-col>
                      <el-col :span="12">
                        <div style="margin-left: 60px;">
                          <p style="font-size: larger;font-weight: bold;margin-top: 0;margin-bottom: 0;">🌏地物分类</p>
                        <p>将一张遥感影像中的地物进行分类并用不同颜色标记，其在结果图中不同地物将以不同颜色呈现，每种颜色代表一类地物。</p>
                          <p style="font-size: larger;font-weight: bold;">⭐亮点：</p>
                          <p>✨批处理<br />✨框选处理<br /> ✨粗分类 细分类</p>
                        </div>
                        <el-button  style="float:right;color:#005BEA;margin-top: 15px;" size="mini" @click="towork()">去试试</el-button>
                      </el-col>
                    </el-row>

                  </el-card>
                </el-col>
              </el-row>
            </transition>




          </el-card>











        </div>
      </transition>

      <transition name="el-fade-in">
        <!-- 导航条 -->
        <div v-show="show4">
          <el-card style="height: 30em;background-color:black;border: 0; " shadow="never">

            <video style="margin-left: 32%;margin-top: -90px;width: 37%;height: 12%;" src="../assets/earth.mp4" autoplay
              loop></video>
          </el-card>
        </div>
      </transition>

    </div>
  </div>
</template>


<script>
import NavBar from "../components/NavBar.vue";
import FuncCard from "../components/FuncCard";
export default {
  name: "Home",
  components: {
    NavBar,

    FuncCard,
  },
  data() {
    return {
      heightFlag:false,
      show0: false,
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      activeIndex: "1",
      images: [
        // { url: require("../assets/img/pic1.jpg"), title: "",
        // intro:""
        // ,show: true },
        { url: require("../assets/img/pic2.jpg"), title: "简洁高效 开拓创新" ,show:true},
        // { url: require("../assets/img/pic3.jpg"), title: "变化检测", show:true},
        // { url: require("../assets/img/pic4.jpg"), title: "目标检测", show: true },
      ],
      islogin: false,
    };
  },



  computed: {
    getislogin: {

      get() {
        //解决this指向问题，在window.addEventListener中this是指向window的。
        //需要将vue实例赋值给_this,这样在window.addEventListener中通过_this可以为vue实例上data中的变量赋值
        let _this = this;
        //根据自己需要来监听对应的key
        window.addEventListener("setItemEvent", function (e) {
          //e.key : 是值发生变化的key
          //e.newValue : 是可以对应的新值
          if (e.key === "isLogin") {
            console.log("看看e是什么", e);
            console.log(e.newValue);
            _this.islogin = e.newValue;
            console.log("赋值", _this.islogin)
          }
        })
        return _this.islogin
      },
      set(val) {
        let _this = this;
        // _this.islogin = val;
        return val
      },
    }
  },
  methods: {
    setTop(){
       if (this.heightFlag) return
      this.heightFlag = true
      this.interval = setInterval(() => {
        window.scrollTo(0, 300)// 第二个数表示滚动距离
        clearInterval(this.interval)
        this.heightFlag = false
      }, 150)
    },
    toLogin() {
      this.$router.push({ path: "/login" })
    },
    towork() {
      this.$router.push({ path: "/work" })
    }
  },
  created() {
    this.islogin = localStorage.getItem('isLogin')
    console.log('header 让我看看this', this.islogin)
  },
  mounted() {
    //开始------------------------------------
    let oldTop = 0; //旧数据，初始为0
    // 将自定义方法绑定到窗口滚动条事件
    window.onscroll = () => {
      let top = document.scrollingElement.scrollTop; //触发滚动条，记录数值
      // console.log("当前数值", top)
      // console.log("旧数值", oldTop)
      if (top < 200) {
        this.show0 = false;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
      }
      else if (top > 200 && top < 500) {
        this.show0 = true;
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
      }
      else if (top > 500 && top < 550) {
        this.show1 = true;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
      }
      else if (top > 550 && top < 900) {
        this.show2 = true;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
      }
      else if (top >900 && top < 1400) {
        this.show3 = true;
        this.show4 = false;
        this.show5 = false;
      }   else if (top > 1400) {
        this.show4 = true;
        this.show5 = false;
     
      }


    };

  },
};
</script>

<style scoped>
#building {

  width: 96%;
  height: 100%;

}

.carbg {
  height: calc(100vh - 64px);
}

.platformIntro {
  text-align: center !important;
  font-size: 1.25rem;
  margin-top: 40px;
}

.getstart {
  margin-left: 34%;
  background: linear-gradient(79deg, #30cfd0 0%, rgba(51, 8, 103, 0.64) 99%);
  width: 15%;
  font-size: large;
}

.githublink {
  background-color: #333;
  width: 15%;
  font-size: large;
  margin-left: 1%;
}

.btnpic {
  height: 19px;
  width: 19px;
  margin-right: 5%;
  margin-bottom: -2%;
  position: relative;
}


.introgif {
  height: 22em;
  width: 100%;
  background-color: white;
  border: 0;
  margin-left: 1%;
}


.showgif {
  margin-top: 0px;
  width: 108%;
  height: 312px;
  margin-left: 0px;
}










.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
  height: 0;
}





.textcard {
  position: absolute;
  /* background-color: #ebebce; */
  top:3%;
  width: 40%;
  left: 12%;
}

.word {
  /* color: #fff; */
  font-size: 15px;
  left: 47em;
  z-index: 10;
  position: absolute;
  top: 38em;
  color: #fff;

}

/* .word :hover {
  font-size: 35px;
  left: 20%;
  z-index: 10;
  position: absolute;
  top: 12em;
 color: #5bcaff;
  
}  */
.el-button {
  color: #fff;
}

.el-button :hover {
  color: rgb(86, 162, 200);
}

.homeword {
  top: 6px;
  position: relative;
}

.textcard>p {
  font-weight: bold;
  font-size: 24px;
  color: #fff;
}

.pic_item .text1 {

  position: absolute;
  z-index: 1;
  /* left:42%; */
  top: 25%;
  width: 100%;
  height: 100%;
}

.pic_item .text1>p {
  font-weight: bold;
  font-size: 24px;
  color: #fff;
}

.el-carousel__container {
  height: 60rem;
}

.el-carousel__item h3 {
  color: white;
  font-size: 0.8rem;
  opacity: 0.75;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.block {
  width: 100%;
}

.small {
  width: 100%;
  height: 100%;
  /* position: relative; */
}

.texts {
  position: absolute;
  left: 40rem;
  bottom: 2rem;
  width: 500px;
  margin: 200px auto;
}

.pic_item {
  position: relative;
  height: 100%;
  width: 100%;
}

.pic_item:hover {
  cursor: pointer;
}

.pic_item img {
  width: 100%;
  height: 100%;
}

.pic_item h1 {
  position: absolute;
  left: 1rem;
  bottom: 2rem;
}

.pic_item flow {
  position: absolute;
  left: 5rem;
  bottom: 5rem;
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

.el-card__body {
  position: absolute;
  left: 5rem;
  bottom: 5rem;
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}





.button {
  height: 2em;
  font-size: 25px;
  font-weight: bold;
  left: 41%;
  z-index: 10;
  position: absolute;
  top: 65%;
  width: 11em;
  border-radius: 30px;
  border: 2px solid #f7f7f7;
  color: #fff;
  text-align: center;
  /* text-transform: uppercase; */
  overflow: hidden;
  transition: 0.3s;
}

.button:after {
  position: absolute;
  transition: 0.3s;
  content: "";
  width: 0;
  left: 50%;
  bottom: 0;
  height: 3px;
  background: #f7f7f7;
}

.button:after {
  height: 120%;
  left: -10%;
  transform: skewX(15deg);
  z-index: -1;
}

.button:hover {
  cursor: pointer;
}


.button:hover {
  color: #5bcaff;

}

.button:hover:after {
  left: -10%;
  width: 120%;
}










.el-header {
  padding: 0 0px;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.enter {
  top: 100px;
  position: absolute;

}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
  /* height: 1200px; */
}

.el-card_body,
.el-main {
  padding: 0px;
}


body>.el-container {
  margin-bottom: 40px;
}

.el-carousel__container {
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>