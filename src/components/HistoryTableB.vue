<template>

	<div>
		<div class="operationTable" style="box-shadow: 2px 2px 2px 2PX #d6d6d6;">
			<div style="display: inline-block;float: left;">
				<el-button type="text" style="color: black;font-size: large;margin-top: 5px;margin-left: 5px;"><i
						class="el-icon-back" @click="$router.go(-1)"></i></el-button>
			</div>

			<div
				style=" color: #565656;text-align:center; font-size: 23px; font-weight: bold;margin-top: 10px;margin-bottom: 15px;width: 90%;">
				{{processTitle}}
			</div>
			<p style="margin-left: 10px;color: #565656;">历史操作记录查询</p>
			<p style="margin-left: 10px;color: #565656;">处理时间：{{$route.params.records[0].startTime}}</p>
			<el-button style="margin-left: 10px;" @click="DownloadTime1">下载时像1</el-button>
			<el-button @click="DownloadTime2">下载时像2</el-button>
			<el-button @click="DownloadResult">下载结果图</el-button>
		</div>
	</div>


</template>

<script>

	import axios from 'axios'
	import Tiff from 'tiff.js'
	export default {
		components: {

		},
		data() {
			return {

			};
		},
		computed: {

			processTitle() {
				if (this.$route.query.processType === "build") {
					return "建筑物变化检测"
				}

			},

		},

		beforeMount() {
			if (JSON.stringify(this.$route.params) != "{}") {
				this.$store.state.isImgLoading = true
				this.$store.state.loadingMsg = "加载历史记录中..."
				var sourceImgURL1 = this.$route.params.sourceImg1
				var sourceImgURL2 = this.$route.params.sourceImg2


				new Promise((resolve, reject) => {
					var blob = null;
					var xhr = new XMLHttpRequest();
					xhr.open("GET", sourceImgURL1);
					xhr.responseType = "blob";
					xhr.onload = () => {
						blob = xhr.response;
						var s = xhr.getResponseHeader('Content-Disposition')
						s = s.split('.')
						s = s[s.length - 1]

						let file = new File([blob], 'source');
						resolve(file);

						if (s != "tif") {
							var that = this
							var tmpimg = new Image()
							tmpimg.src = sourceImgURL1
							tmpimg.onload = function(event) {
								that.$store.state.imgWidth1 = tmpimg.naturalWidth
								that.$store.state.imgHeight1 = tmpimg.naturalHeight
								that.$store.state.drawnRectParams.width = tmpimg.naturalWidth
								that.$store.state.drawnRectParams.height = tmpimg.naturalHeight
								that.$store.state.img1 = tmpimg
								that.$store.state.oldTimeFile = file
								that.$store.state.oldTimeFileType = 'image/s'
								that.$store.commit('CHANGE_OLDTIMEURL', sourceImgURL1)
								for (var i = 0; i < that.$route.params.records.length; i++) {

									var resultData = {
										left: that.$route.params.records[i].leftColumn,
										top: that.$route.params.records[i].topRow,
										url: that.$route.params.records[i].resultImg,
										data: (JSON.parse(that.$route.params.records[i].result)).data
									}
									that.$store.state.historyResultImageURL.push(resultData)
								}
							}
						} else {
							var that = this
							var fr = new FileReader();
							fr.readAsArrayBuffer(file);
							Tiff.initialize({
								TOTAL_MEMORY: 1073741824 //1个G
							})
							fr.addEventListener("loadend", (e) => {
								// // var input = fr.readFileSync(filename);
								var tiff = new Tiff({
									buffer: e.target.result
								});

								that.$store.state.tiff1 = tiff
								that.$store.state.imgWidth1 = that.$store.state.tiff1.width()
								that.$store.state.imgHeight1 = that.$store.state.tiff1.height()
								that.$store.state.drawnRectParams.width = that.$store.state.tiff1
									.width()
								that.$store.state.drawnRectParams.height = that.$store.state.tiff1
									.height()
								that.$store.state.oldTimeFile = file
								that.$store.state.oldTimeFileType = "image/tiff"
								that.$store.commit('CHANGE_OLDTIMEURL', sourceImgURL1)
								for (var i = 0; i < that.$route.params.records.length; i++) {

									var resultData = {
										left: that.$route.params.records[i].leftColumn,
										top: that.$route.params.records[i].topRow,
										url: that.$route.params.records[i].resultImg,
										data: (JSON.parse(that.$route.params.records[i].result))
											.data
									}
									that.$store.state.historyResultImageURL.push(resultData)
								}

							})
						}

					};
					xhr.onerror = (e) => {
						reject(e)
					};
					xhr.send();
				});


				new Promise((resolve, reject) => {
					var blob = null;
					var xhr = new XMLHttpRequest();
					xhr.open("GET", sourceImgURL2);
					xhr.responseType = "blob";
					xhr.onload = () => {
						blob = xhr.response;
						var s = xhr.getResponseHeader('Content-Disposition')
						s = s.split('.')
						s = s[s.length - 1]
						let file = new File([blob], 'source');
						resolve(file);

						if (s != "tif") {
							var that = this
							var tmpimg = new Image()
							tmpimg.src = sourceImgURL2
							tmpimg.onload = function(event) {

								that.$store.state.imgWidth2 = tmpimg.naturalWidth
								that.$store.state.imgHeight2 = tmpimg.naturalHeight
								that.$store.state.drawnRectParams.width = tmpimg.naturalWidth
								that.$store.state.drawnRectParams.height = tmpimg.naturalHeight
								that.$store.state.img2 = tmpimg
								that.$store.state.newTimeFile = file
								that.$store.state.newTimeFileType = "image/s"
								that.$store.commit('CHANGE_NEWTIMEURL', sourceImgURL2)

							}
						} else {
							var fr = new FileReader();
							fr.readAsArrayBuffer(file);
							Tiff.initialize({
								TOTAL_MEMORY: 1073741824 //1个G
							})
							fr.addEventListener("loadend", (e) => {
								// // var input = fr.readFileSync(filename);
								var tiff = new Tiff({
									buffer: e.target.result
								});

								that.$store.state.tiff2 = tiff
								that.$store.state.imgWidth2 = that.$store.state.tiff2.width()
								that.$store.state.imgHeight2 = that.$store.state.tiff2.height()
								that.$store.state.drawnRectParams.width = that.$store.state.tiff2
									.width()
								that.$store.state.drawnRectParams.height = that.$store.state.tiff2
									.height()
								that.$store.state.newTimeFile = file
								that.$store.state.newTimeFileType = "image/tiff"
								that.$store.commit('CHANGE_NEWTIMEURL', sourceImgURL2)


							})
						}

					};
					xhr.onerror = (e) => {
						reject(e)
					};
					xhr.send();
				});
			}
		},

		methods: {
			DownloadTime1(){
				var flag = this.$route.params.sourceImg1.split(
					'/')[this.$route.params.sourceImg1.split('/').length - 1]
				let msg =
					`${this.$store.state.serverURL}/files/${flag}`
				
				axios.get(msg, {
					headers: {
						'Content-Type': 'application/json'
					},
					responseType: 'blob'
				
				}).then(
					(res) => {
						if (res) {
							var s=res.headers['content-disposition'].split('.')
							s = s[s.length - 1]
							const blob = new Blob([res.data]); //处理文档流
							const elink = document.createElement('a');
							elink.style.display = 'none';
							elink.href = URL.createObjectURL(blob);
							elink.download = flag+'.'+s;
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
			},
			DownloadTime2(){
				var flag = this.$route.params.sourceImg2.split(
					'/')[this.$route.params.sourceImg2.split('/').length - 1]
				let msg =
					`${this.$store.state.serverURL}/files/${flag}`
				
				axios.get(msg, {
					headers: {
						'Content-Type': 'application/json'
					},
					responseType: 'blob'
				
				}).then(
					(res) => {
						if (res) {
							var s=res.headers['content-disposition'].split('.')
							s = s[s.length - 1]
							const blob = new Blob([res.data]); //处理文档流
							const elink = document.createElement('a');
							elink.style.display = 'none';
							elink.href = URL.createObjectURL(blob);
							elink.download = flag+'.'+s;
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
			},
			DownloadResult() {
				var flagList = []
				
				for (var i = 0; i < this.$route.params.records.length; i++) {
					flagList.push(this.$route.params.records[i].resultImg.split('/')[this.$route.params.records[i].resultImg.split('/').length - 1])
				}
				
				var tmp = {
					flagList,
					zipFileName: "下载结果"
				}
				
				let jsonTmp = JSON.stringify(tmp)
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
							const blob = new Blob([res.data], { type: 'application/zip' }); //处理文档流
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
	.operationTable {
		border: 1px solid;
		border-color: #969696;
		width: 28%;
		height: 79.5%;
		position: absolute;
		border-radius: 5px;
	}

	.SIB {
		margin-left: 10px;
	}
</style>
