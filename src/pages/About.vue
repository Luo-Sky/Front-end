<template>
  <div id="building">
    <el-row class="team">
      <h3>团队成员</h3>
        <h3>团队介绍</h3>
  <el-col :span="4" v-for="item in info" :key="info.id" class="team-item">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <img :src="item.url"  class="image">
      <div style="padding: 14px;">
        <span>{{item.title}}</span><br>
         <span>{{item.title}}</span><br>
          <span>{{item.title}}</span><br>
         <span>{{item.title}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ item.introduction }}</time>
          <el-button type="text" class="button">联系我</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
 <el-row class="team">
      <h3>指导老师</h3>
  <el-col :span="4" class="team-item">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <img :src="teacher.url"  class="image">
      <div style="padding: 14px;">
        <span>{{teacher.title}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">个人主页</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
<!-- 
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
       info: [
        { url: require("../assets/img/pic1.jpg"),name: "成员1",title:"队长",introduction:"这里是珞Sky平台"},
        { url: require("../assets/img/pic2.jpg"),name: "" ,title:"队员",introduction:"珞sky很好用"},
        { url: require("../assets/img/pic3.jpg"), name: "",title:"队员",introduction:"这种情况一般不会出现" },
        { url: require("../assets/img/pic4.jpg"), name: "",title:"队员",introduction:"这种情况一般不会出现" },
      ],
     teacher:{
       url: require("../assets/img/pic1.jpg"),name: "成员1",title:"指导老师",introduction:"这里是珞Sky平台"
     },
      currentDate: new Date()
    };
  }
}
</script>

<style scoped>
#building{
background:url("../assets/img/logo.jpg");
width:100%;			
height:100%;		
position:absolute;
background-size:100% 100%;}

  .time {
    font-size: 13px;
    color: #999;
  }
  .el-card{
width: 20em;
    height: 30em;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
.team{
   margin-top: 5em;
}
.team-item{
  margin-left:6em ;
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
