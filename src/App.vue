<template>
	<div id="app">
		<!-- <img alt="Vue logo" src="./assets/logo.png">
	    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
		<Header v-if="isRouterAlive"></Header>
		<router-view v-if="isRouterAlive"></router-view>
		<Footer v-show="$route.meta.footerShow"></Footer>
		<!-- <Login /> -->
	</div>
</template>

<script>
	import Home from "./pages/Home";
	import NavBar from "./components/NavBar";
	import FuncCard from "./components/FuncCard";
	import Header from "./components/Header";
	import Footer from "./components/Footer";
	export default {
		name: 'app',
		components: {
			Home,
			NavBar,
			FuncCard,
			Header,
			Footer,
		},
		data() {
			return {
				isRouterAlive: true
			}
		},

		methods: {
			reload() {
				this.isRouterAlive = false
				this.$nextTick(function() {
					this.isRouterAlive = true
				})
			}
		},
		//===========================下面是解决刷新页面丢失vuex数据
		created() {
			// //在页面加载时读取sessionStorage里的状态信息
			// if (sessionStorage.getItem('store')) {
			// 	this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem(
			// 		'store'))));
			// }

			// //在页面刷新时将vuex里的信息保存到sessionStorage里
			// window.addEventListener('beforeunload', () => {
			// 	sessionStorage.setItem('store', JSON.stringify(this.$store.state));
			// });
		}
	};
</script>

<style>
	/* 用于控制抽屉的css，因为写在组件里没用，所以目前直接写在APP里，后续需要改进 */

</style>
