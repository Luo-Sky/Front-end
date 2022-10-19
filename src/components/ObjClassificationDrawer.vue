<template>
	<!-- 目标提取 目标监测 地物分类相同 因此只在目标提取中做注释 -->
	<div>

		<div class="bar-title" @click="showDrawer = true" style="z-index: 2004;box-shadow: 4px 4px 4px 4PX #d6d6d6;" v-show="$store.state.isOperated&&!$store.state.isBatchProcessingMode">
			<p style="">显示分类结果</p>

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
					if(newValue[0].data.length===5){
						var totalObj1 = 0
						var totalObj2 = 0
						var totalObj3 = 0
						var totalObj4 = 0
						var totalObj5 = 0
						for (var i = 0; i < newValue.length; i++) {
							var tmpData = newValue[i].data
	
							totalObj1 += tmpData[0].num
							totalObj2 += tmpData[1].num
							totalObj3 += tmpData[2].num
							totalObj4 += tmpData[3].num
							totalObj5 += tmpData[4].num
						}
						var tmp1 = {
							value: totalObj1==0?null:totalObj1,
							name: "建筑"
						}
						var tmp2 = {
							value: totalObj2==0?null:totalObj2,
							name: "耕地"
						}
						var tmp3 = {
							value: totalObj3==0?null:totalObj3,
							name: "森林"
						}
						var tmp4 = {
							value: totalObj4==0?null:totalObj4,
							name: "草地"
						}
						var tmp5 = {
							value: totalObj5==0?null:totalObj5,
							name: "水体"
						}
						this.extractData = []
						this.extractData.push(tmp1)
						this.extractData.push(tmp2)
						this.extractData.push(tmp3)
						this.extractData.push(tmp4)
						this.extractData.push(tmp5)
						
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
							color: ['rgb(255,0,0)', 'rgb(0,255,0)','rgb(0,255,255)','rgb(255,255,0)','rgb(0,0,255)'],
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
					else{
							var totalObj1 = 0
							var totalObj2 = 0
							var totalObj3 = 0
							var totalObj4 = 0
							var totalObj5 = 0
							var totalObj6 = 0
							var totalObj7 = 0
							var totalObj8 = 0
							var totalObj9 = 0
							var totalObj10 = 0
							var totalObj11 = 0
							var totalObj12 = 0
							var totalObj13 = 0
							var totalObj14 = 0
							var totalObj15 = 0
							for (var i = 0; i < newValue.length; i++) {
								var tmpData = newValue[i].data
								totalObj1 += tmpData[0].num
								totalObj2 += tmpData[1].num
								totalObj3 += tmpData[2].num
								totalObj4 += tmpData[3].num
								totalObj5 += tmpData[4].num
								totalObj6 += tmpData[5].num
								totalObj7 += tmpData[6].num
								totalObj8 += tmpData[7].num
								totalObj9 += tmpData[8].num
								totalObj10 += tmpData[9].num
								totalObj11 += tmpData[10].num
								totalObj12 += tmpData[11].num
								totalObj13 += tmpData[12].num
								totalObj14 += tmpData[13].num
								totalObj15 += tmpData[14].num
							}
							var tmp1 = {
								value: totalObj1==0?null:totalObj1,
								name: "工业用地"
							}
							var tmp2 = {
								value: totalObj2==0?null:totalObj2,
								name: "城市住宅"
							}
							var tmp3 = {
								value: totalObj3==0?null:totalObj3,
								name: "农村住宅"
							}
							var tmp4 = {
								value: totalObj4==0?null:totalObj4,
								name: "交通用地"
							}
							var tmp5 = {
								value: totalObj5==0?null:totalObj5,
								name: "水田"
							}
							var tmp6 = {
								value: totalObj6==0?null:totalObj6,
								name: "灌溉地"
							}
							var tmp7 = {
								value: totalObj7==0?null:totalObj7,
								name: "旱地"
							}
							var tmp8 = {
								value: totalObj8==0?null:totalObj8,
								name: "花园小区"
							}
							var tmp9 = {
								value: totalObj9==0?null:totalObj9,
								name: "乔木林地"
							}
							var tmp10 = {
								value: totalObj10==0?null:totalObj10,
								name: "灌木地"
							}
							var tmp11 = {
								value: totalObj11==0?null:totalObj11,
								name: "天然草地"
							}
							var tmp12 = {
								value: totalObj12==0?null:totalObj12,
								name: "人工草地"
							}
							var tmp13 = {
								value: totalObj13==0?null:totalObj13,
								name: "河流"
							}
							var tmp14 = {
								value: totalObj14==0?null:totalObj14,
								name: "湖泊"
							}
							var tmp15 = {
								value: totalObj15==0?null:totalObj15,
								name: "池塘"
							}
							this.extractData = []
							this.extractData.push(tmp1)
							this.extractData.push(tmp2)
							this.extractData.push(tmp3)
							this.extractData.push(tmp4)
							this.extractData.push(tmp5)
							this.extractData.push(tmp6)
							this.extractData.push(tmp7)
							this.extractData.push(tmp8)
							this.extractData.push(tmp9)
							this.extractData.push(tmp10)
							this.extractData.push(tmp11)
							this.extractData.push(tmp12)
							this.extractData.push(tmp13)
							this.extractData.push(tmp14)
							this.extractData.push(tmp15)
							
							
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
								color: ['rgb(200,0,0)', 'rgb(250,0,150)','rgb(200,150,150)','rgb(250,150,150)','rgb(0,200,0)',
								'rgb(150,250,0)', 'rgb(150,200,150)','rgb(200,0,200)','rgb(150,0,250)','rgb(150,150,250)',
								'rgb(250,200,0)', 'rgb(200,200,0)','rgb(0,0,200)','rgb(0,150,200)','rgb(0,200,250)',],
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
			
			historyResultImageURL(newValue) {

				if (newValue.length != 0) {
					if(newValue[0].data.length===5){
						var totalObj1 = 0
						var totalObj2 = 0
						var totalObj3 = 0
						var totalObj4 = 0
						var totalObj5 = 0
						for (var i = 0; i < newValue.length; i++) {
							var tmpData = newValue[i].data

							totalObj1 += tmpData[0].num
							totalObj2 += tmpData[1].num
							totalObj3 += tmpData[2].num
							totalObj4 += tmpData[3].num
							totalObj5 += tmpData[4].num
						}
						var tmp1 = {
							value: totalObj1==0?null:totalObj1,
							name: "建筑"
						}
						var tmp2 = {
							value: totalObj2==0?null:totalObj2,
							name: "耕地"
						}
						var tmp3 = {
							value: totalObj3==0?null:totalObj3,
							name: "森林"
						}
						var tmp4 = {
							value: totalObj4==0?null:totalObj4,
							name: "草地"
						}
						var tmp5 = {
							value: totalObj5==0?null:totalObj5,
							name: "水体"
						}
						this.extractData = []
						this.extractData.push(tmp1)
						this.extractData.push(tmp2)
						this.extractData.push(tmp3)
						this.extractData.push(tmp4)
						this.extractData.push(tmp5)
						
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
							color: ['rgb(255,0,0)', 'rgb(0,255,0)','rgb(0,255,255)','rgb(255,255,0)','rgb(0,0,255)'],
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
					else{
							var totalObj1 = 0
							var totalObj2 = 0
							var totalObj3 = 0
							var totalObj4 = 0
							var totalObj5 = 0
							var totalObj6 = 0
							var totalObj7 = 0
							var totalObj8 = 0
							var totalObj9 = 0
							var totalObj10 = 0
							var totalObj11 = 0
							var totalObj12 = 0
							var totalObj13 = 0
							var totalObj14 = 0
							var totalObj15 = 0
							for (var i = 0; i < newValue.length; i++) {
								var tmpData = newValue[i].data
								totalObj1 += tmpData[0].num
								totalObj2 += tmpData[1].num
								totalObj3 += tmpData[2].num
								totalObj4 += tmpData[3].num
								totalObj5 += tmpData[4].num
								totalObj6 += tmpData[5].num
								totalObj7 += tmpData[6].num
								totalObj8 += tmpData[7].num
								totalObj9 += tmpData[8].num
								totalObj10 += tmpData[9].num
								totalObj11 += tmpData[10].num
								totalObj12 += tmpData[11].num
								totalObj13 += tmpData[12].num
								totalObj14 += tmpData[13].num
								totalObj15 += tmpData[14].num
							}
							var tmp1 = {
								value: totalObj1==0?null:totalObj1,
								name: "工业用地"
							}
							var tmp2 = {
								value: totalObj2==0?null:totalObj2,
								name: "城市住宅"
							}
							var tmp3 = {
								value: totalObj3==0?null:totalObj3,
								name: "农村住宅"
							}
							var tmp4 = {
								value: totalObj4==0?null:totalObj4,
								name: "交通用地"
							}
							var tmp5 = {
								value: totalObj5==0?null:totalObj5,
								name: "水田"
							}
							var tmp6 = {
								value: totalObj6==0?null:totalObj6,
								name: "灌溉地"
							}
							var tmp7 = {
								value: totalObj7==0?null:totalObj7,
								name: "旱地"
							}
							var tmp8 = {
								value: totalObj8==0?null:totalObj8,
								name: "花园小区"
							}
							var tmp9 = {
								value: totalObj9==0?null:totalObj9,
								name: "乔木林地"
							}
							var tmp10 = {
								value: totalObj10==0?null:totalObj10,
								name: "灌木地"
							}
							var tmp11 = {
								value: totalObj11==0?null:totalObj11,
								name: "天然草地"
							}
							var tmp12 = {
								value: totalObj12==0?null:totalObj12,
								name: "人工草地"
							}
							var tmp13 = {
								value: totalObj13==0?null:totalObj13,
								name: "河流"
							}
							var tmp14 = {
								value: totalObj14==0?null:totalObj14,
								name: "湖泊"
							}
							var tmp15 = {
								value: totalObj15==0?null:totalObj15,
								name: "池塘"
							}
							this.extractData = []
							this.extractData.push(tmp1)
							this.extractData.push(tmp2)
							this.extractData.push(tmp3)
							this.extractData.push(tmp4)
							this.extractData.push(tmp5)
							this.extractData.push(tmp6)
							this.extractData.push(tmp7)
							this.extractData.push(tmp8)
							this.extractData.push(tmp9)
							this.extractData.push(tmp10)
							this.extractData.push(tmp11)
							this.extractData.push(tmp12)
							this.extractData.push(tmp13)
							this.extractData.push(tmp14)
							this.extractData.push(tmp15)
							
							
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
								color: ['rgb(200,0,0)', 'rgb(250,0,150)','rgb(200,150,150)','rgb(250,150,150)','rgb(0,200,0)',
								'rgb(150,250,0)', 'rgb(150,200,150)','rgb(200,0,200)','rgb(150,0,250)','rgb(150,150,250)',
								'rgb(250,200,0)', 'rgb(200,200,0)','rgb(0,0,200)','rgb(0,150,200)','rgb(0,200,250)',],
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
