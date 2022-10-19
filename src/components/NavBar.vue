<template>
  <div>
    <!-- <el-row :gutter="40"> -->
      <el-col :span="4"><div class="grid-content bg-purple1">
        <img  :src="url" class="small" />
        </div></el-col>
    <el-col :span="10"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="10"
      ><div class="grid-content bg-purple">
        <MenuOpt /></div
    ></el-col>
    <!-- </el-row> -->
  </div>
</template>

<script>
import MenuOpt from "./MenuOpt";
export default {
  name: "NavBar",
  components: {
    MenuOpt,
  },
  data() {
    return {
        url: require("../assets/img/pic1.jpg")  
    };},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #ffffff;
}
.bg-purple1 {
  /* background: #d3dce6; */
  width: 150px;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.small {
  /* width: 100%; */
  height: 60Px;
  position: relative;
}
</style>
