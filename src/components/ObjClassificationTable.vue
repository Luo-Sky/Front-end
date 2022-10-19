<template>
	<div>
		<div class="operationTable" style="box-shadow: 2px 2px 2px 2PX #d6d6d6;background-color: #fcfcfc;">
			<div style="display: inline-block;float: left;">
				<el-button type="text" style="color: black;font-size: large;margin-top: 5px;margin-left: 5px;"><i
						class="el-icon-back" @click="$router.go(-1)"></i></el-button>
			</div>

			<div
				style=" color: #565656;text-align:center; font-size: 23px; font-weight: bold;margin-top: 10px;margin-bottom: 15px;width: 90%;">
				{{processTitle}}
			</div>
			<el-tabs v-model="activeName" type="card" :stretch="true">
				<el-tab-pane label="单次处理" name="first">
					<div v-show="isFirstStep">
						<div style="display: inline-block;float: left;">
							<SelectImageButton class="SIB" btnName="选择影像"></SelectImageButton>
						</div>
						<div style="display: inline-block;float: left;margin-left: 4%;">
							<SelectFiles />
						</div>
						<div style="margin-left: 30%;">
							<el-button size='mini' style="margin-left: 30%;" @click="isFirstStep=false"
								:disabled="!$store.state.firstImageURL">下一步</el-button>
						</div>

						<div style=" margin-left: 10px;  margin-top: 10px;">
							<FilesListA />
						</div>
					</div>
					<div v-show="!isFirstStep">
						<el-form :model="form" size="mini">

							<el-form-item>
								<span
									style="margin-top: 5px;margin-left: 10px;display: inline;float: left;color:#606266;">过滤阈值</span>
								<div style="width:70%;margin-left: 80px;">
									<el-slider style="" v-model="form.threshold"></el-slider>
								</div>
							</el-form-item>
							<el-form-item label="置信度" label-width="80px">
								<el-select v-model="form.confidence" :style="formItemWidth">
									<el-option label="低" value="low"></el-option>
									<el-option label="中" value="medium"></el-option>
									<el-option label="高" value="high"></el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="所属项目" label-width="80px" :filterable="true" placeholder="请选择">
								<el-select v-model="form.projectTitle" :style="formItemWidth">
									<el-option v-for="item in projectList" :key="item.id" :label="item.title"
										:value="item.id"></el-option>
								</el-select>
								<el-popover placement="top-start" width="250" trigger="hover"
									content="若您没有可选项目,请返回图像处理/工作台或我的项目页面创建一个项目。">
									<img slot="reference" src="../../public/help.png"
										style="margin-left:3px;width:14px;z-index: 200;">
								</el-popover>
							</el-form-item>

							<el-form-item label="操作命名" label-width="80px">
								<el-input v-model="form.operationId" autocomplete="off" :style="formItemWidth">
								</el-input>
							</el-form-item>
							<el-form-item>
								<el-button style="margin-left:8px; width: 80px;" @click="drawRect" size="mini">
									{{drawRectBtnName}}
								</el-button>
								<el-button style="margin-left:8px; width: 60px;" @click="resetRect" size="mini">撤销
								</el-button>
								<el-popover placement="top-start" width="250" trigger="hover"
									content="若不选择框选目标,则将整张图作为处理图片">
									<img slot="reference" src="../../public/help.png"
										style="margin-left:10px; width: 15px;">
								</el-popover>

								<el-button style="position: absolute;right:8%; width: 80px;" @click="ClassifyObj"
									size="mini">分类
								</el-button>
							</el-form-item>

							<el-form-item label="框选颜色" label-width="80px">
								<el-color-picker v-model="rectColor" :predefine="predefineColors" size="mini"
									color-format="rgb">
								</el-color-picker>
								<el-button style="position: absolute;right:10%; width: 80px;" @click="DownloadResult"
									v-show="$store.state.isOperated" size="mini">下载结果
								</el-button>
							</el-form-item>
							<el-form-item>
								<el-button size="mini" @click="isFirstStep=true" style="margin-left: 10px;">上一步
								</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-tab-pane>

				<el-tab-pane label="批量处理" name="second">
					<BatchProcessingTableA operationAPI="ocHistorys"></BatchProcessingTableA>

				</el-tab-pane>
			</el-tabs>
		</div>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>您还没有选择影像</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import SelectImageButton from './SelectImageButton.vue'
	import SelectFiles from './SelectFiles.vue'
	import FilesListA from './FilesListA.vue'
	import BatchProcessingTableA from './BatchProcessingTableA.vue'
	import axios from 'axios'
	import Tiff from 'tiff.js'
	export default {
		components: {
			SelectImageButton,
			SelectFiles,
			FilesListA,
			BatchProcessingTableA
		},
		data() {
			return {
				isFirstStep: true,
				activeName: 'first',
				showModal: false,
				table: false,
				dialog: false,
				loading: false,
				imgDataUrl: "",
				form: {
					confidence: 'medium',
					threshold: 50,
					projectTitle: '',
					operationId: 'test',
				},
				formLabelWidth: '60px',
				timer: null,
				radio: 1,
				dialogVisible: false,
				formItemWidth: {
					width: '90%'
				},
				drawRectBtnName: "框选目标",
				rectColor: "rgb(255,255,0)",
				predefineColors: [
					"rgb(255,255,0)",
					'rgb(255, 69, 0)',
					'rgb(255, 120, 0)',
					'rgb(85, 85, 255)',
					'rgb(85, 255, 0)',
					'rgb(170, 85, 127)',
				],
				processType: ""
			};
		},
		computed: {
			isDrawingRect() {
				return this.$store.state.isDrawingRect
			},
			processTitle() {
				if (this.$route.query.processType === "5") {
					return "地物粗分类"
				}
				if (this.$route.query.processType === "15") {
					return "地物精分类"
				}

			},
			projectList() {
				var tmpList = []
				const projects = JSON.parse(localStorage.getItem("projectInfo"))

				for (var i = 0; i < projects.length; i++) {
					var x = {
						id: projects[i].id,
						title: projects[i].title
					}
					tmpList.push(x)
				}
				return tmpList
			}
		},
		watch: {
			rectColor(newValue) {
				this.$store.state.rectColor = newValue
			},
			isDrawingRect(newValue) {
				if (newValue === false) {
					this.drawRectBtnName = "框选目标"
				} else {
					this.drawRectBtnName = "取消框选"
				}
			},
			activeName(newValue) {
				if (newValue === "first") {
					this.$store.state.isBatchProcessingMode = false
				} else {
					this.$store.state.isBatchProcessingMode = true
				}
			}
		},
		

		methods: {
			DownloadResult() {
				if (this.$store.state.isImgLoading){
					this.$message({
						showClose: true,
						message: '请等待其他操作完成',
						type: 'warning',
						duration: 3000
					});
					return
				}
				var url = this.$store.state.resultImageURL[this.$store.state.resultImageURL.length - 1].url
				let a = document.createElement("a"); // 生成一个a元素
				let event = new MouseEvent("click"); // 创建一个单击事件
				a.download = "result"; // 设置图片名称
				a.href = url; // 将生成的URL设置为a.href属性
				a.dispatchEvent(event); // 触发a的单击事件

			},
			drawRect() {
				if (this.$store.state.isImgLoading){
					this.$message({
						showClose: true,
						message: '请等待其他操作完成',
						type: 'warning',
						duration: 3000
					});
					return
				}
				if (this.$store.state.isDrawn === true) {
					this.$message({
						showClose: true,
						message: '请勿重复框选区域！',
						type: 'error',
						duration: 3000
					});
					return
				}
				this.$store.state.isDrawingRect = !this.$store.state.isDrawingRect
			},
			cancelRect() {
				this.$store.state.clickCancelRectTimes += 1
			},
			resetRect() {
				if (this.$store.state.isImgLoading){
					this.$message({
						showClose: true,
						message: '请等待其他操作完成',
						type: 'warning',
						duration: 3000
					});
					return
				}
				this.$store.state.drawnRectParams.top = 0
				this.$store.state.drawnRectParams.left = 0
				this.$store.state.drawnRectParams.width=this.$store.state.imgWidth
				this.$store.state.drawnRectParams.height=this.$store.state.imgWidth
				this.$store.state.clickCancelRectTimes += 1
			},
			ClassifyObj() {
				if (this.$store.state.isImgLoading){
					this.$message({
						showClose: true,
						message: '请等待其他操作完成',
						type: 'warning',
						duration: 3000
					});
					return
				}
				if (!this.form.projectTitle || !this.form.operationId || this.form.threshold <= 0) {
					this.$message({
						showClose: true,
						message: '存在选项为空！',
						type: 'error',
						duration: 3000
					});
					return
				}
				this.cancelRect()

				if (!this.$store.state.firstImageURL) {
					this.dialogVisible = true
					return
				}

				var that = this
				that.$store.state.upLoadProgress = 0
				that.$store.state.showProcess = true
				var formData = new FormData();
				formData.append('file', this.$store.state.file)

				this.$store.state.isImgLoading = true
				this.$store.state.loadingMsg = "处理图片中..."

				if (!that.$store.state.flag0) {
					axios.post(
						`${this.$store.state.serverURL}/ocHistorys?projectId=${this.form.projectTitle}&title=${this.form.operationId}`,
						formData, {
							headers: {
								'Content-Type': 'multipart/form-data'
							},
							onUploadProgress: function(
								progressEvent) { //axios封装的原生获取下载进度的事件，该回调参数progressEvent中包含下载文件的总进度以及当前进度
								if (progressEvent.lengthComputable) {
									//属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
									//如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
									that.$store.state.upLoadProgress = Math.floor(progressEvent.loaded / progressEvent.total *
										99)  //实时获取最新下载进度
									console.log(that.$store.state.upLoadProgress)
								}
							}
						}).then((res) => {
						this.$store.state.loadingMsg = "处理图片中..."
						that.$store.state.showProcess = false
						var data = res.data.data.sourceImg
						var historyId = res.data.data.id
						data = data.split('/')
						var flag = data[data.length - 1]
						that.$store.state.flag0 = flag
						that.$store.state.historyId = historyId

						var tmp = {
							confidence: that.form.confidence,
							minPixel: that.form.threshold,
							top: that.$store.state.drawnRectParams.top,
							left: that.$store.state.drawnRectParams.left,
							right: that.$store.state.drawnRectParams.left + that.$store.state.drawnRectParams
								.width,
							bottom: that.$store.state.drawnRectParams.top + that.$store.state.drawnRectParams
								.height,
						}

						var jsonTmp = JSON.stringify(tmp)
						axios.post(
							`${that.$store.state.serverURL}/ocHistorys/process/${that.$route.query.processType}?flag=${flag}` +
							"&historyId=" + historyId, jsonTmp, {
								headers: {
									'Content-Type': 'application/json'
								}
							}).then(
							(res) => {

								if (res.data.data) {
									var resultData = {
										left: res.data.data.left,
										top: res.data.data.top,
										url: res.data.data.label,
										data: res.data.data.data
									}

									that.$store.state.resultImageURL.push(resultData)
									that.$store.commit('OBJEXTRACT')
									that.$store.state.isImgLoading = false
									that.$store.state.drawnRectParams.top = 0
									that.$store.state.drawnRectParams.left = 0
									that.$store.state.drawnRectParams.width = that.$store.state.imgWidth
									that.$store.state.drawnRectParams.height = that.$store.state.imgHeight
								} else {
									this.$message({
										showClose: true,
										message: '提取失败，可能服务器发生了故障，请稍后重试...',
										type: 'error',
										duration: 3000
									});
									that.$store.state.isImgLoading = false
									that.$store.state.drawnRectParams.top = 0
									that.$store.state.drawnRectParams.left = 0
									that.$store.state.drawnRectParams.width = that.$store.state.imgWidth
									that.$store.state.drawnRectParams.height = that.$store.state.imgHeight
								}
							})
					})
				} else {
					var tmp = {
						confidence: that.form.confidence,
						minPixel: that.form.threshold,
						top: that.$store.state.drawnRectParams.top,
						left: that.$store.state.drawnRectParams.left,
						right: that.$store.state.drawnRectParams.left + that.$store.state.drawnRectParams
							.width,
						bottom: that.$store.state.drawnRectParams.top + that.$store.state.drawnRectParams
							.height,
					}

					var jsonTmp = JSON.stringify(tmp)
					axios.post(
						`${that.$store.state.serverURL}/ocHistorys/process/${that.$route.query.processType}?flag=${that.$store.state.flag0}` +
						"&historyId=" + that.$store.state.historyId, jsonTmp, {
							headers: {
								'Content-Type': 'application/json'
							}
						}).then(
						(res) => {

							if (res.data.data) {
								var resultData = {
									left: res.data.data.left,
									top: res.data.data.top,
									url: res.data.data.label,
									data: res.data.data.data
								}

								that.$store.state.resultImageURL.push(resultData)
								that.$store.commit('OBJEXTRACT')
								that.$store.state.isImgLoading = false
								that.$store.state.drawnRectParams.top = 0
								that.$store.state.drawnRectParams.left = 0
								that.$store.state.drawnRectParams.width = that.$store.state.imgWidth
								that.$store.state.drawnRectParams.height = that.$store.state.imgHeight
							} else {
								this.$message({
									showClose: true,
									message: '提取失败，可能服务器发生了故障，请稍后重试...',
									type: 'error',
									duration: 3000
								});
								that.$store.state.isImgLoading = false
								that.$store.state.drawnRectParams.top = 0
								that.$store.state.drawnRectParams.left = 0
								that.$store.state.drawnRectParams.width = that.$store.state.imgWidth
								that.$store.state.drawnRectParams.height = that.$store.state.imgHeight
							}
						})
				}

			},

		},
	}
</script>

<style scoped>
	.operationTable {
		border: 1px solid;
		border-color: #969696;
		width: 24%;
		height: 600px;
		position: absolute;
		border-radius: 5px;
	}

	.SIB {
		margin-left: 10px;
	}
</style>
