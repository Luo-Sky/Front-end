<template>
	<div>
		<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
			background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true"
			style="width: 100%;">
			<el-menu-item index="1" style="margin-left: 60%">首页</el-menu-item>
			<el-submenu index="2">
				<template slot="title">体验平台</template>
				<el-menu-item index="/extract" @click="changeRouteExtract">目标提取</el-menu-item>
				<el-menu-item index="/change" @click="changeRouteChange">变化检测</el-menu-item>
				<el-menu-item index="/detection" @click="changeRouteDetection">目标检测</el-menu-item>
				<el-menu-item index="/classification" @click="changeRouteClassifiction">地物分类</el-menu-item>
			</el-submenu>
			<el-menu-item index="/ProcessingPlatform" @click="changeProcessingPlatform">综合处理</el-menu-item>
			<el-menu-item index="4">我的项目</el-menu-item>
			<el-menu-item index="5"><a href="https://www.ele.me" target="_blank">个人信息</a></el-menu-item>
		</el-menu>
		<!-- <ObjExtract/> -->
		<router-view></router-view>
	</div>
</template>

<script>

export default {
	data() {
		return {
			activeIndex: '2',
		};
	},
	methods: {
		handleSelect(key, keyPath) {
		},
		changeRouteExtract() {
			this.$message({
				showClose: true,
				message:'您已切换到目标提取功能',
				type: 'success',
				duration:1700
			});
			this.$store.commit('CHANGE_ROUTER')
		},
		changeRouteChange() {
			this.$message({
				showClose: true,
				message:'您已切换到变化检测功能',
				type: 'success',
				duration:1700
			});
			this.$store.commit('CHANGE_ROUTER')
		},
		changeRouteDetection() {
			this.$message({
				showClose: true,
				message:'您已切换到目标检测功能',
				type: 'success',
				duration:1700
			});
			this.$store.commit('CHANGE_ROUTER')
		},
		changeRouteClassifiction() {
			this.$message({
				showClose: true,
				message:'您已切换到地物分类功能',
				type: 'success',
				duration:1700
			});
			this.$store.commit('CHANGE_ROUTER')
		},
		changeProcessingPlatform() {
			this.$message({
				showClose: true,
				message:'您已进入综合处理平台',
				type: 'success',
				duration:1700
			});
			this.$store.commit('CHANGE_ROUTER')
		},
	}
}
</script>

<style>
</style>
