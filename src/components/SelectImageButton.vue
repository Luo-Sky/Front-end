<template>
	<div>
		<!--上传-->
		<input v-show="false" id="selectFile" ref="fileRef" type="file" @change="fileChange()" accept="image/*">
		<el-button @click="uploadFile" :disabled="btnDisabled" size="mini" style="width: 85px;">{{btnName}}</el-button>
	</div>
</template>

<script>
	import Tiff from 'tiff.js'
	export default {
		data() {
			return {

			};
		},
		props: ['btnName'],
		computed: {
			btnDisabled() {
				if (this.btnName === "选择时像2" && !this.$store.state.oldTimeImageURL) {
					return true
				}
			}
		},
		methods: {
			//上传文件
			uploadFile() {
				if (this.$store.state.isImgLoading){
					this.$message({
						showClose: true,
						message: '请等待其他操作完成',
						type: 'warning',
						duration: 3000
					});
					return
				}
				this.$refs.fileRef.dispatchEvent(new MouseEvent('click'))
			},
			
			//当选择好文件后做出的变化
			fileChange() {
				let file = this.$refs.fileRef.files[0]
				if(!file){
					return
				}
				var url = this.getObjectURL(file)
				this.$store.state.isImgLoading = true
				this.$store.state.loadingMsg="加载图片中..."
				this.$store.state.flag0=null
				this.$store.state.flag1=null
				this.$store.state.flag2=null
				
				
				//不是tiff
				if (file.type != "image/tiff") {
					var that = this
					var tmpimg = new Image()
					tmpimg.src = url
					tmpimg.onload = function(event) {
						
						//非变化检测时
						if (that.btnName === "选择影像") {
							that.$store.state.imgWidth = tmpimg.naturalWidth
							that.$store.state.imgHeight = tmpimg.naturalHeight
							that.$store.state.drawnRectParams.width=tmpimg.naturalWidth
							that.$store.state.drawnRectParams.height=tmpimg.naturalHeight
							that.$store.state.img0 = tmpimg
							that.$store.state.file = file
							that.$store.state.fileType = file.type
							that.$store.commit('CHANGE_IMAGEURL', url)
						}
						
						//变化检测时
						if (that.btnName === "选择时像1") {
							if (that.$store.state.imgWidth2 != 0 && that.$store.state.imgHeight2 != 0) {
								if (tmpimg.naturalWidth != that.$store.state.imgWidth2 || tmpimg.naturalHeight != that
									.$store.state.imgHeight2) {

									that.$message({
										showClose: true,
										message: '两张图片的大小不同，请选择大小一致的图片',
										type: 'error',
										duration: 3000
									});
									that.$store.state.isImgLoading = false
									return
								}
							}
							that.$store.state.imgWidth1 = tmpimg.naturalWidth
							that.$store.state.imgHeight1 = tmpimg.naturalHeight
							that.$store.state.drawnRectParams.width=tmpimg.naturalWidth
							that.$store.state.drawnRectParams.height=tmpimg.naturalHeight
							that.$store.state.img1 = tmpimg
							that.$store.state.oldTimeFile = file
							that.$store.state.oldTimeFileType = file.type
							that.$store.commit('CHANGE_OLDTIMEURL', url)
						}
						if (that.btnName === "选择时像2") {
							if (that.$store.state.imgWidth1 != 0 && that.$store.state.imgHeight1 != 0) {
								if (tmpimg.naturalWidth != that.$store.state.imgWidth1 || tmpimg.naturalHeight != that
									.$store.state.imgHeight1) {

									that.$message({
										showClose: true,
										message: '两张图片的大小不同，请选择大小一致的图片',
										type: 'error',
										duration: 3000
									});
									that.$store.state.isImgLoading = false
									return
								}
							}
							that.$store.state.imgWidth2 = tmpimg.naturalWidth
							that.$store.state.imgHeight2 = tmpimg.naturalHeight
							that.$store.state.drawnRectParams.width=tmpimg.naturalWidth
							that.$store.state.drawnRectParams.height=tmpimg.naturalHeight
							that.$store.state.img2 = tmpimg
							that.$store.state.newTimeFile = file
							that.$store.state.newTimeFileType = file.type
							that.$store.commit('CHANGE_NEWTIMEURL', url)
						}
						that.$store.state.secondImageURL = ""
						that.$store.state.isOperated = false

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

						if (that.btnName === "选择影像") {
							that.$store.state.tiff0 = new Tiff({
								buffer: e.target.result
							});
							that.$store.state.imgWidth = that.$store.state.tiff0.width()
							that.$store.state.imgHeight = that.$store.state.tiff0.height()
							that.$store.state.drawnRectParams.width=that.$store.state.tiff0.width()
							that.$store.state.drawnRectParams.height=that.$store.state.tiff0.height()
							that.$store.state.file = file
							that.$store.state.fileType = file.type
							that.$store.commit('CHANGE_IMAGEURL', url)
						}
						if (that.btnName === "选择时像1") {
							var tiff = new Tiff({
								buffer: e.target.result
							});
							if (that.$store.state.imgWidth2 != 0 && that.$store.state.imgHeight2 != 0) {
								if (tiff.width() != that.$store.state.imgWidth2 || tiff.height() != that.$store.state.imgHeight2) {

									that.$message({
										showClose: true,
										message: '两张图片的大小不同，请选择大小一致的图片',
										type: 'error',
										duration: 3000
									});
									that.$store.state.isImgLoading = false
									return
								}
							}
							that.$store.state.tiff1=tiff
							that.$store.state.imgWidth1 = that.$store.state.tiff1.width()
							that.$store.state.imgHeight1 = that.$store.state.tiff1.height()
							that.$store.state.drawnRectParams.width=that.$store.state.tiff1.width()
							that.$store.state.drawnRectParams.height=that.$store.state.tiff1.height()
							that.$store.state.oldTimeFile = file
							that.$store.state.oldTimeFileType = file.type
							that.$store.commit('CHANGE_OLDTIMEURL', url)
						}
						if (that.btnName === "选择时像2") {
							var tiff = new Tiff({
								buffer: e.target.result
							});

							if (that.$store.state.imgWidth2 != 0 && that.$store.state.imgHeight2 != 0) {
								if (tiff.width() != that.$store.state.imgWidth2 || tiff.height() != that.$store.state.imgHeight2) {
									that.$message({
										showClose: true,
										message: '两张图片的大小不同，请选择大小一致的图片',
										type: 'error',
										duration: 3000
									});
									that.$store.state.isImgLoading = false
									return
								}
							}
							that.$store.state.tiff2=tiff
							that.$store.state.imgWidth2 = that.$store.state.tiff2.width()
							that.$store.state.imgHeight2 = that.$store.state.tiff2.height()
							that.$store.state.drawnRectParams.width=that.$store.state.tiff2.width()
							that.$store.state.drawnRectParams.height=that.$store.state.tiff2.height()
							that.$store.state.newTimeFile = file
							that.$store.state.newTimeFileType = file.type
							that.$store.commit('CHANGE_NEWTIMEURL', url)
						}
						that.$store.state.secondImageURL = ""
						that.$store.state.isOperated = false

					})


				}



			},

			getObjectURL(file) {
				let url = null;

				if (window.createObjectURL != undefined) { // basic
					url = window.createObjectURL(file);
				} else if (window.webkitURL != undefined) { // webkit or chrome
					url = window.webkitURL.createObjectURL(file);
				} else if (window.URL != undefined) { // mozilla(firefox)
					url = window.URL.createObjectURL(file);
				}
				return url;
			},
		}
	}
</script>

<style>
</style>
