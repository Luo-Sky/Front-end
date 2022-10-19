<template>
  <div id="building">

   <div class="words">
  <el-card :body-style="{ padding: '0px' }" shadow="hover">
  <h1 style="left:2em;position: relative;">帮助中心</h1><br>
  <h4 style="left:4em;position: relative;">不知道帮助点什么</h4>
  </el-card>
  
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      info: [
        { url: require("../assets/img/pic1.jpg"), name: "成员1", title: "队长", description: "这里是珞Sky平台" },
        { url: require("../assets/img/pic2.jpg"), name: "", title: "队员", description: "珞sky很好用" },
        { url: require("../assets/img/pic3.jpg"), name: "", title: "队员", description: "这种情况一般不会出现" },
        { url: require("../assets/img/pic4.jpg"), name: "", title: "队员", description: "这种情况一般不会出现" },
      ],
      teacher: {
        url: require("../assets/img/pic1.jpg"), name: "成员1", title: "指导老师", description: "这里是珞Sky平台"
      },
      currentDate: new Date()
    };
  }
}
</script>

<style scoped>
#building {
  background: url("../assets/img/logo.jpg");
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: 100% 100%;
}

.words {
  background-color: rgb(238, 242, 222);
  width: 1000px;
  height: 1000px;
  left: 20%;
  position: relative;
}

.time {
  font-size: 13px;
  color: #999;
}

.el-card {
  margin-top:20px;
  height: 80em;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.team {
  margin-top: 5em;
}

.team-item {
  margin-left: 6em;
  position: relative;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>





















