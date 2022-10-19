<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1"><router-link class="list-group-item" active-class="active" to="/Home">首页</router-link></el-menu-item>
      <el-submenu index="2">
        <template slot="title">图像处理/工作台</template>
        <el-menu-item index="2-1">目标提取</el-menu-item>
        <el-menu-item index="2-2">变化检测</el-menu-item>
        <el-menu-item index="2-3">目标检测</el-menu-item>
        <el-menu-item index="2-4">地物分类</el-menu-item>
       <!--  <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item> -->
        </el-submenu>
     
      <el-menu-item index="3" >登陆/注册</el-menu-item>
      <el-menu-item index="4">
        <router-link active-class="active" to="/Login">登陆/注册</router-link>
        <!-- <a href="https://www.ele.me" target="_blank">跳转</a> -->
       </el-menu-item >
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "MenuOpt",
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-menu-demo {
  background-color: coral;
}
</style>