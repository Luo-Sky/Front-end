<template>
	<div class="imgDiv" :style="ImgContainerStyle">

		<div ref="image1" class="rsImage" @mousemove.prevent="mouseMove" v-show="imgUrl" @mousedown.prevent="mouseDown"
			@mouseup="mouseUp" @mousewheel.prevent="mousewheel" :style="img1Style">
			<div id="image1" v-show="checkList.indexOf('原图')>-1" :style="img1Style">
				<canvas id="imgCanvas" v-show="fileType!='image/tiff'"></canvas>
			</div>
			<div v-show="checkList.indexOf('结果')>-1" :style="resultImgStyle">
				<ResultImage></ResultImage>
			</div>

			<canvas id="rectCanvas" ref="rectCanvas"
				style="position: absolute;left:0px;top:0px;width: inherit;z-index: 200;"
				@mousedown.prevent="DrawRectMouseDown" @mousemove.prevent="DrawRectMouseMove"
				@mouseup.prevent="DrawRectMouseUp"></canvas>

		</div>
		<!-- <el-button class="DrawRect" type="primary" size="mini" icon="el-icon-full-screen" @click="DrawRect"
			:style="DrawingRectBtnStyle"></el-button> -->
		<el-button class="ZoomIn" type="primary" size="mini" icon="el-icon-zoom-in" @click="ZoomIn"></el-button>
		<el-button class="ZoomOut" type="primary" size="mini" icon="el-icon-zoom-out" @click="ZoomOut"></el-button>
		<el-button class="Resize" type="primary" size="mini" icon="el-icon-refresh" @click="Resize"></el-button>

		<el-popover placement="left" width="160" trigger="hover" popper-class="modePopover" :close-delay="0">
			<el-checkbox-group v-model="checkList">
				<el-checkbox label="原图"></el-checkbox>
				<el-checkbox label="结果"></el-checkbox>
			</el-checkbox-group>
			<el-button slot="reference" class="Layers" type="primary" size="mini" icon="el-icon-menu"></el-button>
		</el-popover>

		<el-popover placement="left" width="230" trigger="hover" popper-class="modePopover" :close-delay="0">
			<span style="margin-top: 8px;margin-left: 10px;display: inline;float: left;">结果图透明度</span>
			<el-slider v-model="opacityVal" style="margin-left:100px; width: 130px;"></el-slider>
			<el-button slot="reference" size="mini" type="primary" class="changeOpacityVal" icon="el-icon-view">
			</el-button>
		</el-popover>


		<div style="position: absolute; right: 36%; bottom: 46%; width: 220px;background-color: #969696;opacity: 0.5;"
			v-show="!$store.state.firstImageURL">
			<label style="position: absolute; right: 60px; bottom: 10px; width: 150px; ">等待加载图片...</label>
		</div>
		
		<div class="modal" v-show="imgLoading"
			style="background-color: rgba(0, 0, 0, 0.5);z-index: 502;width: 100%;height: 100%;position: absolute;">
			<span style="position: absolute;width: 20%;margin-left:45% ;margin-top:25% ;color: #409eff;">
				{{loadingMsg}}
			</span>
			<el-progress :percentage="$store.state.upLoadProgress" style="width: 30%;margin-left:35% ;margin-top:27% ;"
				v-show="$store.state.showProcess">
			</el-progress>
			<i class="el-icon-loading" v-show="!$store.state.showProcess"
				style="margin-left:48% ;margin-top:27% ;color:#409eff"></i>
		</div>
	</div>
</template>

<script>
	import ResultImage from './ResultImage.vue'
	export default {
		components: {
			ResultImage
		},

		data() {
			return {
				checkList: ["原图", "结果"],
				opacityVal: 100,
				img1: null,
				imgCanvas: null,
				tiffCanvas: null,
				rectCanvas: null,
				imgCanvasCtx: null,
				tiffCanvasCtx: null,
				rectCanvasCtx: null,
				imgWidth: 0,
				imgHeight: 0,
				maxsize: 100, //图片最大放大倍率
				minsize: 0.1,
				////用于存放鼠标点击的相关参数
				clickParams: {
					isDown: false, //是否按下鼠标
					disX: 0, //X偏移量
					disY: 0,
				},
				//用于存放图片的位置和大小参数
				imgParams: {
					left: 0, //图片左上角相对于容器左上角的X轴距离
					top: 0,
					width: 0,
					height: 0
				},
				rectParams: {
					isDrawing: false,
					drawingSurfaceImageData: null,
					mousedown: {
						x: 0,
						y: 0
					},
					drawnRect: {
						width: 0,
						height: 0,
						left: 0,
						top: 0
					},
					dragging: false,

				}
			};
		},
		computed: {
			loadingMsg() {
				return this.$store.state.loadingMsg
			},
			imgLoading() {
				return this.$store.state.isImgLoading
			},
			isDrawingRect() {
				return this.$store.state.isDrawingRect
			},
			imgUrl() {
				return this.$store.state.firstImageURL
			},
			img1Style() {
				if (this.isDrawingRect) {
					return {
						left: this.imgParams.left + "px",
						top: this.imgParams.top + "px",
						width: this.imgParams.width + "px",
						height: this.imgParams.height + "px",
					}
				}
				return {
					cursor: "move",
					left: this.imgParams.left + "px",
					top: this.imgParams.top + "px",
					width: this.imgParams.width + "px",
					height: this.imgParams.height + "px",
				}
			},
			resultImgStyle() {
				if (this.isDrawingRect) {
					return {
						left: this.imgParams.left + "px",
						top: this.imgParams.top + "px",
						width: this.imgParams.width + "px",
						height: this.imgParams.height + "px",
						opacity: this.opacityVal / 100
					}
				}
				return {
					cursor: "move",
					left: this.imgParams.left + "px",
					top: this.imgParams.top + "px",
					width: this.imgParams.width + "px",
					height: this.imgParams.height + "px",
					opacity: this.opacityVal / 100
				}
			},
			fileType() {
				return this.$store.state.fileType
			},
			DrawingRectBtnStyle() {
				if (this.isDrawingRect === true) {
					return {
						"background": "#98cff9",
					}
				} else {
					return {}
				}
			},
			ImgContainerStyle() {
				if (this.isDrawingRect) {
					return {
						cursor: 'crosshair'
					}
				}
			},
			clickCancelRectTimes() {
				return this.$store.state.clickCancelRectTimes
			}
		},
		watch: {
			//撤销绘制框选
			clickCancelRectTimes(newValue) {
				this.rectCanvasCtx.clearRect(0, 0, this.rectCanvas.width, this.rectCanvas.height);
				this.saveDrawingSurface();
				this.$store.state.isDrawn = false
			},
			//当传入原图得URL时，需要加载图片
			imgUrl(newValue) {
				this.rectCanvasCtx.clearRect(0, 0, this.imgWidth, this.imgHeight);
				if (this.imgCanvasCtx) {
					this.imgCanvasCtx.clearRect(0, 0, this.imgWidth, this.imgHeight);
				}
				if (this.tiffCanvas) {
					const elmnt = document.getElementById("tiffCanvas");
					elmnt.remove();
					this.tiffCanvas = null
					this.tiffCanvasCtx = null
				}


				if (this.fileType != "image/tiff") {
					var that = this
					that.imgWidth = that.$store.state.img0.naturalWidth
					that.imgHeight = that.$store.state.img0.naturalHeight
					that.imgParams.top = 0
					that.imgParams.left = 0
					that.imgParams.width = 600 * that.imgWidth / that.imgHeight
					that.imgParams.height = 600

					that.imgCanvas = document.querySelector('#imgCanvas')
					that.imgCanvas.width = that.imgWidth
					that.imgCanvas.height = that.imgHeight
					that.rectCanvas.width = that.imgWidth
					that.rectCanvas.height = that.imgHeight
					that.imgCanvasCtx = that.imgCanvas.getContext('2d')
					that.imgCanvasCtx.drawImage(that.$store.state.img0, 0, 0);
					that.imgCanvas.setAttribute('style', 'width: inherit;')

				} else {
					var that = this
					that.imgWidth = that.$store.state.tiff0.width()
					that.imgHeight = that.$store.state.tiff0.height()
					that.rectCanvas.width = that.$store.state.tiff0.width()
					that.rectCanvas.height = that.$store.state.tiff0.height()
					that.imgParams.top = 0
					that.imgParams.left = 0
					that.imgParams.width = 600 * that.imgWidth / that.imgHeight
					that.imgParams.height = 600
					var canvas = that.$store.state.tiff0.toCanvas();
					canvas.setAttribute('id', 'tiffCanvas')
					canvas.setAttribute('style', 'width:inherit')
					that.tiffCanvas = canvas
					document.querySelector('#image1').appendChild(canvas);
					that.tiffCanvasCtx = canvas.getContext("2d");

				}
				this.$store.state.isImgLoading = false
			},

			//调整透明度
			opacityVal(newValue) {
				this.$store.commit('CHANGE_OVERLAY_OPACITY', newValue / 100)
			},

		},
		mounted() {
			this.img1 = this.$refs.image1; //获取图片元素
			this.rectCanvas = this.$refs.rectCanvas
			this.rectCanvasCtx = this.rectCanvas.getContext('2d')

		},
		methods: {
			windowToCanvas(x, y) {
				//返回元素的大小以及位置d
				var bbox = this.rectCanvas.getBoundingClientRect();
				return {
					x: (x - bbox.left) / (this.imgParams.width / this.rectCanvas.width),
					y: (y - bbox.top) / ((this.rectCanvas.height / this.rectCanvas.width) * this.imgParams.width / this
						.rectCanvas.height)
				};
			},

			//绘制框图
			updateRectangle(loc) {
				this.rectParams.drawnRect.width = Math.abs(loc.x - this.rectParams.mousedown.x);
				this.rectParams.drawnRect.height = Math.abs(loc.y - this.rectParams.mousedown.y);

				//从左往右拉，和从右往左拉的两种情况。主要是判断左边的位置
				//因为从左往右拉的时候，左边x坐标不变
				//从右往左拉的时候，左边线的x坐标需要跟着鼠标移动

				if (loc.x > this.rectParams.mousedown.x) this.rectParams.drawnRect.left = this.rectParams
					.mousedown.x;
				else this.rectParams.drawnRect.left = loc.x;

				if (loc.y > this.rectParams.mousedown.y) this.rectParams.drawnRect.top = this.rectParams.mousedown.y;
				else this.rectParams.drawnRect.top = loc.y;

				this.rectCanvasCtx.save();
				this.rectCanvasCtx.beginPath();
				var colorRGBA = this.$store.state.rectColor.replace('rgb', 'rgba')
				colorRGBA = colorRGBA.replace(')', ',') + "0.5)"
				this.rectCanvasCtx.fillStyle = colorRGBA
				this.rectCanvasCtx.strokeStyle = this.$store.state.rectColor

				this.rectCanvasCtx.lineWidth = 3;
				this.rectCanvasCtx.fillRect(this.rectParams.drawnRect.left, this.rectParams.drawnRect.top, this.rectParams
					.drawnRect
					.width, this.rectParams.drawnRect.height);
				this.rectCanvasCtx.strokeRect(this.rectParams.drawnRect.left, this.rectParams.drawnRect.top, this
					.rectParams
					.drawnRect
					.width, this.rectParams.drawnRect.height)
				this.rectCanvasCtx.restore();
			},
			saveDrawingSurface() {
				this.rectParams.drawingSurfaceImageData = this.rectCanvasCtx.getImageData(0, 0, this.rectCanvas.width, this
					.rectCanvas
					.height);
			},

			restoreDrawingSurface() {
				this.rectCanvasCtx.putImageData(this.rectParams.drawingSurfaceImageData, 0, 0);
			},

			//开启画框
			DrawRect() {
				this.isDrawingRect = !this.isDrawingRect
			},
			DrawRectMouseDown(e) {

				if (!this.isDrawingRect) {

					return
				}

				var loc = this.windowToCanvas(e.clientX, e.clientY);
				this.saveDrawingSurface();
				this.rectParams.mousedown.x = loc.x;
				this.rectParams.mousedown.y = loc.y;
				this.rectParams.dragging = true;
			},
			DrawRectMouseMove(e) {
				var loc;
				if (this.rectParams.dragging) {
					loc = this.windowToCanvas(e.clientX, e.clientY);
					this.restoreDrawingSurface();
					this.updateRectangle(loc);
				}

			},

			DrawRectMouseUp(e) {
				if (!this.isDrawingRect) {
					return
				}
				var loc = this.windowToCanvas(e.clientX, e.clientY);
				this.restoreDrawingSurface();
				this.updateRectangle(loc);
				this.rectParams.dragging = false;
				this.$store.state.isDrawingRect = false;
				this.$store.state.isDrawn = true

				this.$store.state.drawnRectParams = this.rectParams.drawnRect
			},


			//移动图片
			mouseUp() {
				//鼠标抬起
				if (this.isDrawingRect) {
					return
				}
				this.clickParams.isDown = false;
			},
			mouseDown(e) {
				//鼠标按下事件
				if (this.isDrawingRect) {
					return
				}
				this.clickParams.disX = e.clientX - this.img1.offsetLeft;
				this.clickParams.disY = e.clientY - this.img1.offsetTop;

				//开关打开
				this.clickParams.isDown = true;
				//mousedown.prevent阻止默认事件，否则鼠标拖拽的时候监听不到鼠标抬起
			},
			//鼠标移动事件
			mouseMove(e) {
				if (this.isDrawingRect) {
					return
				}
				if (!this.clickParams.isDown) return;
				this.imgParams.left = e.clientX - this.clickParams.disX
				this.imgParams.top = e.clientY - this.clickParams.disY

			},
			////鼠标滚轮放大缩小图片事件
			mousewheel(e) {
				//鼠标滚动事件
				if (this.rectParams.dragging) {
					return
				}
				if (e.wheelDelta || e.detail) {
					if ((Number(this.img1.style.width.replace('px', '')) + Number(this.img1.style.width.replace('px',
							'')) * e.wheelDelta / 1000) / 600 < this
						.minsize) {
						return
					}
					if ((Number(this.img1.style.width.replace('px', '')) + Number(this.img1.style.width.replace('px',
							'')) * e.wheelDelta / 1000) / 600 > this
						.maxsize) {
						return
					}
					var ratioX = e.layerX / Number(this.img1.style.width.replace('px', ''))
					var ratioY = e.layerY / Number(this.img1.style.height.replace('px', ''))
					this.imgParams.left -= Number(this.img1.style.width.replace('px', '')) * e.wheelDelta * ratioX / 1000
					this.imgParams.top -= Number(this.img1.style.height.replace('px', '')) * e.wheelDelta * ratioY / 1000
					this.imgParams.width += this.imgParams.width * e.wheelDelta / 1000

				}
			},

			//图片放大按钮
			ZoomIn() {
				if ((Number(this.img1.style.width.replace('px', '')) * 1.5) / 600 > this.maxsize) {
					return
				}
				this.imgParams.left -= (Number(this.img1.style.width.replace('px', '')) * 1.5 - Number(this.img1.style
					.width.replace('px', ''))) / 2
				this.imgParams.top -= (Number(this.img1.style.width.replace('px', '')) * 1.5 - Number(this.img1.style.width
					.replace('px', ''))) / 2
				this.imgParams.width *= 1.5

			},
			//图片缩小按钮
			ZoomOut() {
				if ((Number(this.img1.style.width.replace('px', '')) / 1.5) / 600 < this.minsize) {
					return
				}
				this.imgParams.left += (Number(this.img1.style.width.replace('px', '')) - Number(this.img1.style.width
					.replace('px', '')) / 1.5) / 2
				this.imgParams.top += (Number(this.img1.style.width.replace('px', '')) - Number(this.img1.style.width
					.replace('px', '')) / 1.5) / 2

				this.imgParams.width /= 1.5

			},
			//图片复原按钮
			Resize() {
				this.imgParams.left = 0
				this.imgParams.top = 0
				var ratio = this.imgWidth / this.imgHeight
				this.imgParams.width = 600 * ratio
			},
		},

	};
</script>

<style scoped>
	.imgDiv {
		position: relative;
		overflow-x: hidden;
		overflow-y: hidden;
		background-color: #fafafa;
		border: 2px solid rgba(71, 146, 173, 0.8);
		border-radius: 5px;
		height: 99%;
		box-shadow: 2px 2px 3px 3PX #d6d6d6;
	}

	.imgDiv:hover {
		border: 2px solid rgba(173, 29, 29, 0.8);
	}

	.rsImage {
		position: absolute;
		
		z-index: 0;
	}

	.rsImageOver {
		position: absolute;
		cursor: move;
		z-index: 0;
		border: 2px solid #acacac;
	}

	.Layers {
		position: absolute;
		right: 20px;
		bottom: 200px;
		height: 40px;
		cursor: pointer;
		z-index: 1;
		opacity: 0.5;
		background-color: gray;
		border-color: gray;
	}

	.Layers:hover {
		background-color: #98cff9;
	}

	.ZoomIn {
		position: absolute;
		right: 20px;
		bottom: 155px;
		height: 40px;
		cursor: pointer;
		z-index: 1;
		opacity: 0.5;
		background-color: gray;
		border-color: gray;
	}

	.ZoomIn:hover {
		background-color: #98cff9;
	}

	.ZoomOut {
		position: absolute;
		right: 20px;
		bottom: 110px;
		height: 40px;
		cursor: pointer;
		z-index: 1;
		opacity: 0.5;
		background-color: gray;
		border-color: gray;
	}

	.ZoomOut:hover {
		background-color: #98cff9;
	}

	.Resize {
		position: absolute;
		right: 20px;
		bottom: 65px;
		height: 40px;
		cursor: pointer;
		z-index: 1;
		opacity: 0.5;
		background-color: gray;
		border-color: gray;
	}

	.Resize:hover {
		background-color: #98cff9;
	}




	.changeOpacityVal {
		position: absolute;
		right: 20px;
		bottom: 20px;
		width: 45px;
		height: 40px;
		cursor: pointer;
		z-index: 1;
		opacity: 0.5;
		background-color: gray;
		border-color: gray;
	}

	.modal {
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 502;
		width: 100%;
		height: 100%;
		position: absolute;
	}
</style>
