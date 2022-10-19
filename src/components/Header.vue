<template>
	<div>


		
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="black"
		 text-color="#fff" active-text-color="#5bd5ff" >
			<div>
				<router-link class="list-group-item" active-class="active" to="/Home">
					<img class="logo" src="../assets/logo.jpg" alt="珞sky" />
					<h2 class="project-name">珞Sky——AI智能遥感影像解译平台</h2>
				</router-link>
			</div>
			<!-- personal -->
			<el-submenu index="5" v-if="getislogin">
				<template slot="title">我的</template>
				<el-menu-item index="5-1" @click.native="toPerson()" style="background-color:black;">
					个人中心
				</el-menu-item>
				<el-menu-item index="5-2" @click.native="toSearch()" style="background-color:black;">
					我的项目
				</el-menu-item>
				<el-menu-item index="5-3" @click.native="exitLogin()" v-if="getislogin" style="background-color:black;">
				退出登录
				</el-menu-item>
			

			</el-submenu>

			<el-menu-item class="first-menu" index="3" v-if="!getislogin" @click.native="toLogin()" >
				<template slot="title">登录</template>
			</el-menu-item>
			<el-menu-item class="first-menu" index="2" @click.native="toWork()">
				<template slot="title">图像处理/工作台</template>
			</el-menu-item>
			  <el-menu-item class="first-menu" index="4"><a href="https://luo-sky.github.io/" target="_blank">帮助中心</a></el-menu-item>

		</el-menu>
	</div>
</template>

<script>
	export default {
		name: "Header",
		data() {
			return {

				activeIndex: "1",
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
					window.addEventListener("setItemEvent", function(e) {
						//e.key : 是值发生变化的key
						//e.newValue : 是可以对应的新值
						if (e.key === "isLogin") {
							_this.islogin = e.newValue;			
						}
					})
					return _this.islogin
				},
				set(val) {		
					return val
				},


			}
		},
		methods: {

			created: function() {

			},
			
			toRegister() {
				this.$router.push("/register");
			},
			toLogin() {
				this.$router.push("/login");
			},
			toWork() {
				this.$router.push("/work");
			},
			toSearch() {
				this.$router.push("/search");
			},
			exitLogin() {
				// 清空token
				// window.localStorage.removeItem('token')
				window.localStorage.clear();
				//   跳转到登录页
				this.islogin = false
				this.getislogin = false
				this.$router.push("/home");
				setTimeout(() => { //此处必须使用vue函数，否则this无法访vue实例
					this.$message(`退出成功！`)
				}, 200);
			},
			toPerson() {
				this.$router.push("/personal");
			},
			changeRouteExtract() {
				this.$router.push({
					name:"extract",
					query:{
						processType:"road"
					}
				})
				this.$message({
					showClose: true,
					message: '您已切换到目标提取功能',
					type: 'success',
					duration: 1700
				});
				this.$store.commit('CHANGE_ROUTER')
			},
			changeRouteChange() {
				this.$router.push({
					name:"change",
					query:{
						processType:"build"
					}
				})
				this.$message({
					showClose: true,
					message: '您已切换到变化检测功能',
					type: 'success',
					duration: 1700
				});
				this.$store.commit('CHANGE_ROUTER')
			},
			changeRouteDetection() {
				this.$router.push({
					name:"detection",
					query:{
						processType:"playground"
					}
				})
				this.$message({
					showClose: true,
					message: '您已切换到目标检测功能',
					type: 'success',
					duration: 1700
				});
				this.$store.commit('CHANGE_ROUTER')
			},
			changeRouteClassifiction() {
				this.$router.push({
					name:"classification",
					query:{
						processType:"5"
					}
				})
				this.$message({
					showClose: true,
					message: '您已切换到地物分类功能',
					type: 'success',
					duration: 1700
				});
				this.$store.commit('CHANGE_ROUTER')
			},
			changeProcessingPlatform() {
				this.$message({
					showClose: true,
					message: '您已进入综合处理平台',
					type: 'success',
					duration: 1700
				});
				this.$store.commit('CHANGE_ROUTER')
			},
		},
		created() {
			this.islogin = localStorage.getItem('isLogin')
		}



	};
</script>

<style scoped>
	.el-menu-demo {
		background-color: black;
/* background: linear-gradient(79deg, #30cfd0 0%,rgba(51, 8, 103, 0.64) 99%); */
		width: 99%;
	}
.el-menu{
	padding-left: 23px;
	background-color: black!important;
}
	.logo {
		width: 60px;
		height: 60px;

		float: left;
		left: 6%;
		top: 8px;
	}

	.first-menu {
		float: right;
		height: 60px;
	}

	/* .el-menu--horizontal > .el-menu-item {
  float: right;
} */
.el-menu-item:hover{
	background-color: rgb(64, 64, 64) !important;;
}
.el-menu-item.is-active {
      background-color: rgb(0, 0, 0) !important;;
}
  



	.el-menu--horizontal>.el-submenu {
		float: right;
	}

	.project-name {
		width: auto;
		height: 5px;
		position: relative;
		float: left;
		color: aliceblue;
		margin-top: 10px;
		margin-left: 5px;
		top: 3px;
		left: 10px;
	}
</style>
<style lang="less">



 .el-submenu .el-submenu__title:hover{
        background-color:rgb(64, 64, 64)  !important;
    }




</style>