<template>
  <div class="footer">
    
   
    <el-row style="top: 6em; position: relative;text-align: center; background-color: black;">
       <!-- <el-link @click="toAbout()" target="_blank" class="linkabout">·  关于我们</el-link> -->
          
               <el-link href="https://luo-sky.github.io/" target="_blank" class="linkabout">·  帮助中心</el-link>
           
        
           <!-- https://luo-sky.github.io/ -->
           <p>Luo-Sky|© 2022 All Rights Reserved</p>
    </el-row>

    <el-row>

    </el-row>

  </div>

</template>

<script>
export default {
  name: 'Footer',
  methods: {
    toAbout() {
      this.$router.push({ path: "/about" });
    },
    toHelp() {
      this.$router.push({ path: "/help" });
    }
  }
}
</script>

<style scoped>

.linkabout{
  position: relative;

  font-weight:bold;
  color: #fff;
}
.footer {
  width: 100%;
  height: 128px;
  background: rgb(0, 0, 0);
  color: #fff;
}

.footer ul {
  margin: 0 auto 16px;
  padding-top: 38px;
  width: 810px;
}

.footer ul li {
  float: left;
  width: 112px;
  margin: 0 10px;
  text-align: center;
  font-size: 14px;
}

.footer ul::after {
  content: "";
  display: block;
  clear: both;
}

.footer p {
  text-align: center;
  font-size: 12px;
}
</style>
