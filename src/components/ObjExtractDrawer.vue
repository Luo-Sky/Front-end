<template>
	<!-- 目标提取 目标监测 地物分类相同 因此只在目标提取中做注释 -->
	<div>

		<div class="bar-title" @click="showDrawer = true" style="z-index: 2004;box-shadow: 4px 4px 4px 4PX #d6d6d6;" v-show="$store.state.isOperated&&!$store.state.isBatchProcessingMode">
			<p style="">显示提取结果</p>

		</div>


		<div style="position: absolute;
		right: 0%;
		top: 10%;
		width: 300px;
		height: 330px;
		z-index: 2005;
		overflow: hidden;" v-show="showDrawer">
			<transition>
				<div class="resultContainer" v-show="showDrawer">
					<i class="el-dialog__close el-icon el-icon-close" style="margin-left: 92%"
						@click="showDrawer=false"></i>
					<div ref="pieChart" style="margin-left: 10px;margin-top: 10px;width:300px;height:300px;">

					</div>
				</div>
			</transition>
		</div>


	</div>
</template>

<script>
	import 'animate.css'
	export default {
		components: {

		},
		data() {
			return {
				showDrawer: false,
				myChart: null,
				extractData: [],
			};
		},
		computed: {
			resultImageURL() {
				return this.$store.state.resultImageURL
			},
			historyResultImageURL(){
				return this.$store.state.historyResultImageURL
			}


		},
		mounted() {
			let echarts = require('echarts')
			var chart = this.$refs.pieChart
			this.myChart = echarts.init(chart)

		},

		watch: {
			resultImageURL(newValue) {
				if (newValue.length != 0) {
					var totalObj = 0
					var totalNotObj = 0
					for (var i = 0; i < newValue.length; i++) {
						var tmpData = newValue[i].data
						totalObj += tmpData[0].num
						totalNotObj += tmpData[1].num
					}
					var tmp1 = {
						value: totalObj,
						name: "目标"
					}
					var tmp2 = {
						value: totalNotObj,
						name: "非目标"
					}
					this.extractData = []
					this.extractData.push(tmp1)
					this.extractData.push(tmp2)

					const option = {
						title: {
							text: '提取结果',
							left: 'center',
							textStyle: {
								color: '#969696'
							}
						},

						tooltip: {
							trigger: 'item',
							formatter: "{b} : {d}%"

						},
						color: ['red', 'blue'],
						series: [{

							clockwise: 'true',
							startAngle: '0',
							radius: '45%',
							center: ['50%', '50%'],

							type: "pie", // type设置为饼图
							data: this.extractData
						}]
					}

					this.myChart.setOption(option)
				}

			},
			historyResultImageURL(newValue) {
				if (newValue.length != 0) {
					var totalObj = 0
					var totalNotObj = 0
					for (var i = 0; i < newValue.length; i++) {
						var tmpData = newValue[i].data
						totalObj += tmpData[0].num
						totalNotObj += tmpData[1].num
					}
					var tmp1 = {
						value: totalObj,
						name: "目标"
					}
					var tmp2 = {
						value: totalNotObj,
						name: "非目标"
					}
					this.extractData = []
					this.extractData.push(tmp1)
					this.extractData.push(tmp2)
			
					const option = {
						title: {
							text: '提取结果',
							left: 'center',
							textStyle: {
								color: '#969696'
							}
						},
			
						tooltip: {
							trigger: 'item',
							formatter: "{b} : {d}%"
			
						},
						color: ['red', 'blue'],
						series: [{
			
							clockwise: 'true',
							startAngle: '0',
							radius: '45%',
							center: ['50%', '50%'],
			
							type: "pie", // type设置为饼图
							data: this.extractData
						}]
					}
			
					this.myChart.setOption(option)
				}
			
			}

		},
		methods: {

		},
	}
</script>

<style scoped>
	.bar-title {
		cursor: pointer;
		margin: 0;
		background-color: rgba(245, 245, 245, 0.8);
		border: 2px solid rgba(153, 162, 173, 0.8);


		border-top-left-radius: 14px;
		border-bottom-left-radius: 14px;
		position: absolute;
		right: 0%;
		top: 30%;
		width: 50px;
		height: 130px;
		writing-mode:tb;
		text-align: center;
		font-weight: 600;
		font-style: normal;
		font-size: 14px;
		color: #969696;
		transition-property: all;
		transition-duration: 0.08S;
		transition-timing-function: linear;
	}

	.bar-title:hover {
		background-color: rgba(223, 223, 223, 0.8);

	}


	.resultContainer {
		position: absolute;
		right: 0%;
		top: 9%;
		width: 300px;
		height: 300px;
		background-color: #d6e7ec;
		border-radius: 5px;
		z-index: 2005;
	}

	.el-dialog__close.el-icon.el-icon-close:hover {
		cursor: pointer;
	}

	.v-enter-active {
		animation: showornot 0.6s;
	}

	.v-leave-active {
		animation: showornot 0.3s reverse;
	}

	@keyframes showornot {
		from {
			right: -100%;
		}

		to {
			right: 0%;
		}
	}
</style>
