<template>
	<!-- 批量处理 -->
	<div>
		<div v-show="isFirstStep">
			<input v-show="false" id="selectFile" ref="filesRef" type="file" @change="SelectFiles"
				accept="image/jpeg,image/png,image/bmp" multiple="multiple">
			<el-button @click="uploadFiles" size="mini" style="width: 85px;margin-left: 3%;margin-bottom: 10px;">添加影像
			</el-button>

			<el-button @click="dialogVisible = true" size="mini"
				style="width: 85px;margin-left: 3%;margin-bottom: 10px;">全部删除
			</el-button>

			<el-button size="mini" style="width: 85px;margin-left: 30%;margin-bottom: 10px;" @click="isFirstStep=false"
				:disabled="batchProcessingFiles1.length!=batchProcessingFiles2.length||batchProcessingFiles1.length===0||batchProcessingFiles2.length===0">
				下一步
			</el-button>

			<el-input v-model="search" size="mini" placeholder="输入关键字搜索"
				style="width:95%;margin-bottom: 10px; margin-left: 10px;" />

			<el-tabs tab-position="left" style="height: 80%;width:99%" v-model="activeName">
				<el-tab-pane label="时像1">
					<el-table class="fileTable"
						:data="batchProcessingFiles1.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
						style=" width: 95%;height:300px;margin-left: 10px;" row-key="id" border default-expand-all
						stripe size="mini" max-height="305px" empty-text="请添加批量处理图片">

						<el-table-column :label="'时像1('+'已添加'+batchProcessingFiles1.length+'/30)'" width="150">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>

							</template>
						</el-table-column>

						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button size="mini" @click="handleDelete1(scope.$index, scope.row)" type="text">删除
								</el-button>
								<el-button size="mini" @click="downloadResult(scope.$index, scope.row)" type="text"
									:disabled="scope.row.resultURL===''">下载结果</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>

				<el-tab-pane label="时像2">
					<el-table class="fileTable"
						:data="batchProcessingFiles2.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
						style=" width: 95%;height:300px;margin-left: 10px;" row-key="id" border default-expand-all
						stripe size="mini" max-height="305px" empty-text="请添加批量处理图片">

						<el-table-column :label="'时像2('+'已添加'+batchProcessingFiles2.length+'/30)'" width="150">
							<template slot-scope="scope">
								<div slot="reference" class="name-wrapper">{{ scope.row.name }}</div>

							</template>
						</el-table-column>

						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button size="mini" @click="handleDelete2(scope.$index, scope.row)" type="text">删除
								</el-button>
								<el-button size="mini" @click="downloadResult(scope.$index, scope.row)" type="text"
									:disabled="scope.row.resultURL===''">下载结果</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>


			<el-button size="mini" style="width: 120px;margin-left: 65%;margin-top: 5px;" @click="batchDownload"
				v-show="successLength===processingLength">
				下载全部结果图
			</el-button>
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
						<el-option v-for="item in projectList" :key="item.id" :label="item.title" :value="item.id">
						</el-option>
					</el-select>
					<el-popover placement="top-start" width="250" trigger="hover"
						content="若您没有可选项目,请返回图像处理/工作台或我的项目页面创建一个项目。">
						<img slot="reference" src="../../public/help.png"
							style="margin-left:3px;width:14px;z-index: 200;">
					</el-popover>
				</el-form-item>

				<el-form-item label="操作命名" label-width="80px">
					<el-input v-model="form.operationId" autocomplete="off" :style="formItemWidth"></el-input>
					<el-popover placement="top-start" width="250" trigger="hover" content="批处理中每条操作记录命名在您输入的命名的基础上添加序号">
						<img slot="reference" src="../../public/help.png"
							style="margin-left:3px;width:14px;z-index: 200;">
					</el-popover>
				</el-form-item>
				<el-form-item>
					<el-button size="mini" @click="isFirstStep=true" style="margin-left: 10px;">上一步
					</el-button>
					<el-button style="position: absolute;right:8%; width: 80px;" @click="StartProcessing" size="mini">
						开始处理
					</el-button>
				</el-form-item>


			</el-form>
		</div>


		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>确定删除已添加的全部影像吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="deleteFiles">确 定</el-button>
			</span>
		</el-dialog>

		<!-- <el-dialog title="提示" :visible.sync="dialogVisible2" width="30%">
			<span>再次添加影像会清空该页面中已完成的批处理操作，但您仍能在历史记录中查询它们，确定这么做吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="deleteFiles">确 定</el-button>
			</span>
		</el-dialog> -->
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		components: {

		},
		props: ['operationAPI'],
		data() {
			return {
				activeName: 0,
				form: {
					confidence: 'medium',
					threshold: 50,
					projectTitle: '',
					operationId: 'test',
				},
				formLabelWidth: '110px',
				formItemWidth: {
					width: '90%'
				},
				isFirstStep: true,
				search: '',
				dialogVisible: false,
				dialogVisible2: false,
				processingLength: 30, //开始批处理时上传的影像数量
				successLength: 0, //批处理过程中获得已结果图的数量
			};
		},
		computed: {
			batchProcessingFiles1() {
				return this.$store.state.batchProcessingFiles1
			},
			batchProcessingFiles2() {
				return this.$store.state.batchProcessingFiles2
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

		methods: {
			uploadFiles() {
				if (this.$store.state.isImgLoading) {
					this.$message({
						showClose: true,
						message: '请等待其他操作完成',
						type: 'warning',
						duration: 3000
					});
					return
				}
				this.$refs.filesRef.dispatchEvent(new MouseEvent('click'))
			},
			SelectFiles() {
				if (this.$store.state.isImgLoading) {
					this.$message({
						showClose: true,
						message: '请等待其他操作完成',
						type: 'warning',
						duration: 3000
					});
					return
				}
				if (this.$store.state.isBatchProcessingOperated) {
					this.$store.state.isBatchProcessingOperated = false
					this.$store.state.batchProcessingFiles1 = []
					this.$store.state.batchProcessingFiles2 = []
					console.log('已清除')
				}
				var files = this.$refs.filesRef.files
				var len = files.length

				if (this.activeName === '0') {
					if (this.batchProcessingFiles1.length + len > 30) {
						this.$message({
							showClose: true,
							message: '一次性最多处理30张影像，请重新选择',
							type: 'warning',
							duration: 3000
						});
						return
					}
					for (var i = 0; i < len; i++) {

						var file = files[i]
						var name = file.name
						var url
						var previewImg = []

						if (window.createObjectURL != undefined) { // basic
							url = window.createObjectURL(file);
						} else if (window.webkitURL != undefined) { // webkit or chrome
							url = window.webkitURL.createObjectURL(file);
						} else if (window.URL != undefined) { // mozilla(firefox)
							url = window.URL.createObjectURL(file);
						}
						previewImg.push(url)
						var fileType = file.type
						if (fileType != 'image/jpg' && fileType != 'image/jpeg' && fileType != 'image/png' && fileType !=
							'image/bmp') {
							continue
						}
						const tmp = {
							name,
							url,
							file,
							previewImg,
							resultURL: "",
							upLoadProgress: 0,
							showProgress: false,
							resultFlag: ""
						}
						this.$store.state.batchProcessingFiles1.push(tmp)
					}
				} else {
					if (this.batchProcessingFiles2.length + len > 30) {
						this.$message({
							showClose: true,
							message: '一次性最多处理30张影像，请重新选择',
							type: 'warning',
							duration: 3000
						});
						return
					}
					for (var i = 0; i < len; i++) {

						var file = files[i]
						var name = file.name
						var url
						var previewImg = []

						if (window.createObjectURL != undefined) { // basic
							url = window.createObjectURL(file);
						} else if (window.webkitURL != undefined) { // webkit or chrome
							url = window.webkitURL.createObjectURL(file);
						} else if (window.URL != undefined) { // mozilla(firefox)
							url = window.URL.createObjectURL(file);
						}
						previewImg.push(url)
						var fileType = file.type
						if (fileType != 'image/jpg' && fileType != 'image/jpeg' && fileType != 'image/png' && fileType !=
							'image/bmp') {
							continue
						}
						const tmp = {
							name,
							url,
							file,
							previewImg,
							resultURL: "",
							upLoadProgress: 0,
							showProgress: false,
							resultFlag: ""
						}
						this.$store.state.batchProcessingFiles2.push(tmp)
					}
				}
			},
			deleteFiles() {
				if (this.$store.state.isImgLoading) {
					this.$message({
						showClose: true,
						message: '请等待其他操作完成',
						type: 'warning',
						duration: 3000
					});
					return
				}
				this.dialogVisible = false
				if (this.batchProcessingFiles1.length === 0 || this.batchProcessingFiles2.length === 0) {
					this.$message({
						showClose: true,
						message: '当前未添加任何影像',
						type: 'error',
						duration: 3000
					});
					return
				}
				this.$store.state.batchProcessingFiles1 = []
				this.$store.state.batchProcessingFiles2 = []
			},

			handleDelete1(index, row) {
				if (this.$store.state.isImgLoading) {
					this.$message({
						showClose: true,
						message: '请等待其他操作完成',
						type: 'warning',
						duration: 3000
					});
					return
				}
				for (var i = 0; i < this.batchProcessingFiles1.length; i++) {

					if (this.batchProcessingFiles1[i].name === row.name) {
						this.$store.state.batchProcessingFiles1.splice(i, 1)
						break;
					}

				}
			},
			handleDelete2(index, row) {
				if (this.$store.state.isImgLoading) {
					this.$message({
						showClose: true,
						message: '请等待其他操作完成',
						type: 'warning',
						duration: 3000
					});
					return
				}
				for (var i = 0; i < this.batchProcessingFiles2.length; i++) {

					if (this.batchProcessingFiles2[i].name === row.name) {
						this.$store.state.batchProcessingFiles2.splice(i, 1)
						break;
					}

				}
			},
			StartProcessing() {
				if (this.$store.state.isImgLoading) {
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

				if (this.batchProcessingFiles1.length != this.batchProcessingFiles2.length) {

					this.$message({
						showClose: true,
						message: '两类时像图数量不一致',
						type: 'error',
						duration: 3000
					});
					return
				}
				var that = this
				this.successLength = 0
				this.processingLength = this.batchProcessingFiles1.length
				this.$store.state.isBatchProcessingOperated = true
				for (var i = 0; i < this.batchProcessingFiles1.length; i++) {
					let time = i
					let formData = new FormData();
					this.batchProcessingFiles1[time].showProgress = true
					this.batchProcessingFiles2[time].showProgress = true
					formData.append('file1', this.batchProcessingFiles1[time].file)
					formData.append('file2', this.batchProcessingFiles2[time].file)
					axios.post(
						`${this.$store.state.serverURL}/cdHistorys?projectId=${this.form.projectTitle}&title=${this.form.operationId}_${i.toString()}`,
						formData, {
							headers: {
								'Content-Type': 'multipart/form-data'
							},
							onUploadProgress: function(
								progressEvent
							) { //axios封装的原生获取下载进度的事件，该回调参数progressEvent中包含下载文件的总进度以及当前进度
								if (progressEvent.lengthComputable) {
									//属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
									//如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded

									that.batchProcessingFiles1[time].upLoadProgress = Math.floor(progressEvent
										.loaded / progressEvent.total * 99) //实时获取最新下载进度
									that.batchProcessingFiles2[time].upLoadProgress = Math.floor(progressEvent
										.loaded / progressEvent.total * 99) //实时获取最新下载进度
								}
							}
						}).then((res) => {
						let tmp = {
							confidence: that.form.confidence,
							minPixel: that.form.threshold,
							top: -1,
							left: -1,
							right: -1,
							bottom: -1,
						}

						let jsonTmp = JSON.stringify(tmp)
						let msg =
							`${that.$store.state.serverURL}/cdHistorys/process?flag1=${res.data.data.sourceImg1.split('/')[res.data.data.sourceImg1.split('/').length - 1]}&flag2=${res.data.data.sourceImg2.split('/')[res.data.data.sourceImg2.split('/').length - 1]}&historyId=${res.data.data.id}&batch=1`

						axios.post(msg, jsonTmp, {
							headers: {
								'Content-Type': 'application/json'
							}

						}).then(
							(res) => {

								if (res.data.data) {
									that.$store.state.batchProcessingFiles1[time].resultURL = res.data.data
										.label
									that.$store.state.batchProcessingFiles1[time].previewImg.push(res.data.data
										.label)
									that.$store.state.batchProcessingFiles2[time].resultURL = res.data.data
										.label
									that.$store.state.batchProcessingFiles2[time].previewImg.push(res.data.data
										.label)
									that.batchProcessingFiles1[time].resultFlag = res.data.data.label.split(
										'/')[res.data.data.label.split('/').length - 1]
									that.batchProcessingFiles2[time].resultFlag = res.data.data.label.split(
										'/')[res.data.data.label.split('/').length - 1]
									that.successLength += 1
									// that.$store.state.isImgLoading = false
									that.batchProcessingFiles1[time].showProgress = false
									that.batchProcessingFiles2[time].showProgress = false
								} else {
									this.$message({
										showClose: true,
										message: '提取失败，可能服务器发生了故障，请稍后重试...',
										type: 'error',
										duration: 3000

									});
									that.batchProcessingFiles1[time].showProgress = false
									that.batchProcessingFiles2[time].showProgress = false

									// that.$store.state.isImgLoading = false

								}
							})
					})

				}
				this.isFirstStep = true
			},
			downloadResult(index, row) {
				let msg =
					`${this.$store.state.serverURL}/files/${row.resultFlag}`
				console.log(msg)
				axios.get(msg, {
					headers: {
						'Content-Type': 'application/json'
					},
					responseType: 'blob'

				}).then(
					(res) => {
						if (res) {
							const blob = new Blob([res.data]); //处理文档流
							const fileName = row.name + "_result.png";
							const elink = document.createElement('a');
							elink.download = fileName;
							elink.style.display = 'none';
							elink.href = URL.createObjectURL(blob);
							document.body.appendChild(elink);
							elink.click();
							URL.revokeObjectURL(elink.href); // 释放URL 对象
							document.body.removeChild(elink);
						} else {
							this.$message({
								showClose: true,
								message: '下载失败，服务器可能出现问题',
								type: 'error',
								duration: 3000

							});

						}
					})


				// a.dispatchEvent(event); // 触发a的单击事件
			},
			// downloadAllResults() {
			// 	for (var i = 0; i < this.$store.state.batchProcessingFiles0.length; i++) {
			// 		console.log(i)
			// 		let url = this.$store.state.batchProcessingFiles0[i].resultURL
			// 		let a = document.createElement("a"); // 生成一个a元素
			// 		let event = new MouseEvent("click"); // 创建一个单击事件
			// 		a.download = this.$store.state.batchProcessingFiles0.name + "_result"
			// 		a.href = url; // 将生成的URL设置为a.href属性
			// 		console.log('下载', i)
			// 		a.dispatchEvent(event); // 触发a的单击事件
			// 		URL.revokeObjectURL(a.href) // 释放URL 对象
			// 		a.remove();

			// 	}
			// },



			batchDownload() {
				var flagList = []
				for (var i = 0; i < this.$store.state.batchProcessingFiles1.length; i++) {
					flagList.push(this.$store.state.batchProcessingFiles1[i].resultFlag)
				}

				var tmp = {
					flagList,
					zipFileName: "下载结果"
				}

				let jsonTmp = JSON.stringify(tmp)

				console.log(jsonTmp)
				let msg =
					`${this.$store.state.serverURL}/files/zip`
				axios.post(msg, jsonTmp, {
					headers: {
						'Content-Type': 'application/json'
					},
					responseType: 'blob'

				}).then(
					(res) => {
						if (res) {
							console.log(res.data)
							const blob = new Blob([res.data], {
								type: 'application/zip'
							}); //处理文档流
							const fileName = '下载结果';
							const elink = document.createElement('a');
							elink.download = fileName;
							elink.style.display = 'none';
							elink.href = URL.createObjectURL(blob);
							document.body.appendChild(elink);
							elink.click();
							URL.revokeObjectURL(elink.href); // 释放URL 对象
							document.body.removeChild(elink);
						} else {
							this.$message({
								showClose: true,
								message: '下载失败，服务器可能出现问题',
								type: 'error',
								duration: 3000

							});


							// that.$store.state.isImgLoading = false

						}
					})
			},

		},
	}
</script>

<style scoped>

</style>
