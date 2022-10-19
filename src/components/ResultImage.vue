<template>
	<div style="position: absolute;width: inherit;left:0px;top:0px;z-index: 100;">
		<canvas ref="result" class="result" style="width: inherit;" v-show="$store.state.isOperated"></canvas>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				result: null,
				resultCtx: null,
				rectParams: {
					drawingSurfaceImageData: null
				}
			};
		},
		computed: {
			storeImgWidth() {
				return this.$store.state.imgWidth
			},
			storeImgWidth1() {
				return this.$store.state.imgWidth1
			},

			storeImgHeight() {
				return this.$store.state.imgHeight
			},
			storeImgHeight1() {
				return this.$store.state.imgHeight1
			},

			resultImageURL() {
				return this.$store.state.resultImageURL
			},
			historyResultImageURL() {
				return this.$store.state.historyResultImageURL
			},
			imgIsChanged() {
				return this.$store.state.isOperated
			}

		},
		watch: {
			//当isOperated发生变化时清除一次画布，此时已更换了数据，所以原结果需要清除
			imgIsChanged() {
				this.resultCtx.clearRect(0, 0, this.result.width, this.result.height);
			},
			//当得到结果时绘制结果图
			resultImageURL(newValue) {
				if (newValue.length != 0) {
					var resultData = newValue[newValue.length - 1]
					var resultImg = new Image()
					resultImg.src = resultData.url
					var that = this
					resultImg.onload = function(event) {
						that.resultCtx.drawImage(resultImg, resultData.left, resultData.top)
						that.resultCtx.strokeStyle = that.$store.state.rectColor
						that.resultCtx.lineWidth = 2;
						that.resultCtx.strokeRect(resultData.left, resultData.top,
							resultImg.width, resultImg.height)
						that.resultCtx.restore();
					}
				}


				//测试用代码
				// this.resultCtx.fillStyle = "rgba(255,0,0,0.5)"
				// this.resultCtx.strokeStyle = "rgb(255,0,0)"
				// this.resultCtx.lineWidth = 3;
				// this.resultCtx.fillRect(newValue[newValue.length - 1].left, newValue[newValue.length - 1].top,
				// 	newValue[
				// 		newValue.length - 1].width, newValue[newValue.length - 1].height);
				// this.resultCtx.strokeRect(newValue[newValue.length - 1].left, newValue[newValue.length - 1].top,
				// 	newValue[
				// 		newValue.length - 1].width, newValue[newValue.length - 1].height)
				// this.resultCtx.restore();


			},
			
			//当查历史记录时
			historyResultImageURL(newValue) {
				this.$store.state.isOperated = true//防止清除画布

				var dataList = newValue

				var that = this

				let imgTags = [] //img所有标签
				let imgTotal = dataList.length //所有图片的个数
				let promiseAll = []
				for (var i = 0; i < imgTotal; i++) {
					promiseAll[i] = new Promise((resolve, reject) => {

						var imgTag = new Image()
						imgTag.src = dataList[i].url
						imgTag.onload = function() {
							resolve(imgTag)
						}
					})
				}
				//当所有图片加载完成后再绘制图片
				Promise.all(promiseAll).then(imgTag => {
					for (var i = 0; i < imgTotal; i++) {
						that.resultCtx.drawImage(imgTag[i], dataList[i].left, dataList[i].top)
						that.resultCtx.strokeStyle = that.$store.state.rectColor
						that.resultCtx.lineWidth = 2;
						that.resultCtx.strokeRect(dataList[i].left, dataList[i].top,
							imgTag[i].width, imgTag[i].height)
						that.resultCtx.restore();
					}

				})

			},
			
			//当原图发生变化时要让画布的大小与原图一致
			storeImgWidth(newValue) {
				this.result.width = newValue
			},
			storeImgWidth1(newValue) {
				this.result.width = newValue
			},

			storeImgHeight(newValue) {
				this.result.height = newValue
			},
			storeImgHeight1(newValue) {
				this.result.height = newValue
			},

		},
		mounted() {
			this.result = this.$refs.result; //获取图片元素
			this.resultCtx = this.result.getContext('2d')
		},
		methods: {
			
			//存储画布内容
			saveDrawingSurface() {
				this.rectParams.drawingSurfaceImageData = this.resultCtx.getImageData(0, 0, this.result.width,
					this
					.result
					.height);
			},
			//还原画布内容
			restoreDrawingSurface() {
				this.resultCtx.putImageData(this.rectParams.drawingSurfaceImageData, 0, 0);
			},

		}

	}
</script>

<style scoped>

</style>
