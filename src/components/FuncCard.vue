<template>
  <div>
    <!-- <el-carousel trigger="click" height="50rem"> -->
    <el-carousel  trigger="click"  height="45rem" :interval="8000">
      <el-carousel-item v-for="item in images" :key="item.id" name="item.id">
        <div class="pic_item">
          <img class="small" :src="item.url" />
          <!-- v-text="heiehie" -->
          <div class="text1">
            <div class="textcard">
              <p>{{ item.title }}</p>
            </div>

          </div>

          <!-- <span class="texts">{{ item.title }}</span> -->
        </div>
      </el-carousel-item>
    </el-carousel>
  
<div class="button" @click="towork()"><span class="homeword">快速体验珞Sky <i class="el-icon-right"></i></span></div>
<!-- <span class="word">登录体验更多功能<i class="el-icon-right"></i></span> -->
<el-link class="word" @click="toLogin()" v-if="!getislogin">登录体验更多功能&lt;--- </el-link>
  </div>
</template>
<script>
export default {
  name: "carousel",
  data() {
    return {
      images: [
        { url: require("../assets/img/6秒.gif"), title: "地物分类" },
        { url: require("../assets/img/6秒2.gif"), title: "目标提取" },
        { url: require("../assets/img/4秒.gif"), title: "变化检测" },
           { url: require("../assets/img/5秒.gif"), title: "目标检测" },
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
        console.log('是变了吗', val)
        return val
      },


    }
  },
  methods: {
    toLogin(){
       this.$router.push({ path: "/login" })
    },
    towork(){
      this.$router.push({ path: "/work" })
    }
  },
  created() {
    this.islogin = localStorage.getItem('isLogin')
    console.log('header 让我看看this', this.islogin)
  }
};
</script>

<style scoped>
.textcard {
  position: absolute;
  /* background-color: #ebebce; */
  width: 40%;
  left: 30%;
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
.homeword{
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
  height: 50em;
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
  font-weight:bold;
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

</style>
