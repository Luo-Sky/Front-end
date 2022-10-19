<template>
	<div class="imgDiv" :style="ImgContainerStyle" @mousemove="dividerMouseMove" @mouseup="dividerMouseUp">
		<div class="rsImage1" @mousemove="mouseMove" @mousedown.prevent="mouseDown" @mouseup="mouseUp"
			@mousewheel.prevent="mousewheel" :style="cursorStyle">
			<div id="image1" ref="image1" v-show="checkList.indexOf('时相1')>-1" class="rsImage1" :style="img1Style">
				<canvas id="imgCanvas1" v-show="oldTimeFileType!='image/tiff'" ></canvas>
			</div>
			<div id="image2" ref="image2" v-show="checkList.indexOf('时相2')>-1" class="rsImage2" :style="img2Style">
				<canvas id="imgCanvas2" v-show="newTimeFileType!='image/tiff'"></canvas>
			</div>
			<div class="rsImage1" v-show="checkList.indexOf('结果')>-1" :style="resultImgStyle">
				<ResultImage></ResultImage>
			</div>
			
			<canvas id="rectCanvas" ref="rectCanvas" :style="rectCanvasStyle" @mousedown="DrawRectMouseDown"
				@mousemove="DrawRectMouseMove" @mouseup="DrawRectMouseUp"></canvas>
		</div>

		<div class="divider" ref="divider" v-show="oldTimeImageUrl&&newTimeImageUrl"><img class="dividerImg"
				@mousedown.prevent="dividerMouseDown" @mouseup="dividerMouseUp" src="../../public/doubleArrowF.png">
		</div>

		<!-- <el-button class="DrawRect" type="primary" size="mini" icon="el-icon-full-screen" @click="DrawRect"
			:style="DrawingRectBtnStyle"></el-button> -->
		<el-button class="ZoomIn" type="primary" size="mini" icon="el-icon-zoom-in" @click="ZoomIn"></el-button>
		<el-button class="ZoomOut" type="primary" size="mini" icon="el-icon-zoom-out" @click="ZoomOut"></el-button>
		<el-button class="Resize" type="primary" size="mini" icon="el-icon-refresh" @click="Resize"></el-button>
		<el-popover placement="left" width="185" trigger="hover" popper-class="modePopover" content="开启或关闭分割线追踪"
			:close-delay="0">
			<el-button slot="reference" class="DividerTrack" type="primary" size="mini" icon="el-icon-link"
				:style="DividerTrackBtnStyle" @click="DividerTrack"></el-button>
		</el-popover>
		<el-popover placement="left" width="240" trigger="hover" popper-class="modePopover" :close-delay="0">
			  <el-checkbox-group v-model="checkList">
			    <el-checkbox label="时相1"></el-checkbox>
				<el-checkbox label="时相2"></el-checkbox>
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
			v-show="!$store.state.oldTimeImageURL">
			<label style="position: absolute; right: 60px; bottom: 10px; width: 150px; ">等待加载图片...</label>
		</div>
		
		<div class="modal" v-show="imgLoading">
			<span style="position: absolute;width: 20%;margin-left:45% ;margin-top:25% ;color: #409eff;">
				{{loadingMsg}}
			</span>
			<el-progress :percentage="$store.state.upLoadProgress" style="width: 30%;margin-left:35% ;margin-top:27% ;"
				v-show="$store.state.showProcess">
			</el-progress>
			<i class="el-icon-loading" v-show="!$store.state.showProcess" style="margin-left:48% ;margin-top:27% ;color:#409eff"></i>
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
				checkList:["时相1","时相2","结果"],
				opacityVal: 100,
				showMode: "全部",
				img1: null,
				img2: null,
				imgCanvas1: null,
				tiffCanvas1: null,
				imgCanvasCtx1: null,
				tiffCanvasCtx1: null,
				imgCanvas2: null,
				tiffCanvas2: null,
				imgCanvasCtx2: null,
				tiffCanvasCtx2: null,
				imgWidth1: null,
				imgHeight1: null,
				imgWidth2: null,
				imgHeight2: null,
				divider: null,
				params: { //用于存放图片的缩放，位置移动等参数
					maxsize: 20, //图片最大放大倍率
					minsize: 0.04,
					isDown: false, //是否按下鼠标
					disX: 0, //X偏移量
					disY: 0,
				},
				imgParams: {
					left: 0, //图片左上角相对于容器左上角的X轴距离
					top: 0,
					width: 100, //图片的宽度
					height: 100, //图片的宽度
				},
				clipShow: 0, //表示分割线裁剪的范围，左半部分将显示时相1，右半部分显示时相2
				dividerPos: 0, //分割线的位置
				isDividerMoving: false, //判断分割线是否正在移动
				dividerDisX: 0, //分割线移动的距离
				isDividerTracked: true,
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
			img1Style() {
				return {
					left: this.imgParams.left + "px",
					top: this.imgParams.top + "px",
					width: this.imgParams.width + "px",
					height: this.imgParams.height + "px"
				}
			},
			img2Style() {
				this.clipShow = this.dividerPos - this.imgParams.left
				var imgParamswidth = this.imgParams.width + 500
				var x = "rect(0px " + imgParamswidth + "px" + " " + "1000000px" + " " + this.clipShow + "px)"
				return {
					left: this.imgParams.left + "px",
					top: this.imgParams.top + "px",
					width: this.imgParams.width + "px",
					height: this.imgParams.height + "px",
					clip: x
				}
			},
			resultImgStyle(){
				if (this.isDrawingRect) {
					return {
						left: this.imgParams.left + "px",
						top: this.imgParams.top + "px",
						width: this.imgParams.width + "px",
						height: this.imgParams.height + "px",
						opacity:this.opacityVal/100
					}
				}
				return {
					cursor: "move",
					left: this.imgParams.left + "px",
					top: this.imgParams.top + "px",
					width: this.imgParams.width + "px",
					height: this.imgParams.height + "px",
					opacity:this.opacityVal/100
				}
			},
			cursorStyle() {
				if (this.isDrawingRect) {
					return {
						
					}
				}
				return {

					cursor: "move",
				}
			},
			rectCanvasStyle() {
				return {
					position: "absolute",
					left: this.imgParams.left + "px",
					top: this.imgParams.top + "px",
					width: this.imgParams.width + "px",
					"z-index": 200
				}
			},

			overlayOpacity() {
				return this.$store.state.overlayOpacity
			},
			oldTimeFileType() {
				return this.$store.state.oldTimeFileType
			},
			newTimeFileType() {
				return this.$store.state.newTimeFileType
			},
			oldTimeImageUrl() {
				return this.$store.state.oldTimeImageURL
			},
			newTimeImageUrl() {
				return this.$store.state.newTimeImageURL
			},

			stateShowMode() {
				return this.$store.state.showMode
			},
			DividerTrackBtnStyle() {
				if (this.isDividerTracked === true) {
					return {
						"background": "#98cff9",
					}
				} else {
					return {}
				}
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
			clickCancelRectTimes(newValue) {
				console.log('clickCancelRectTimes',newValue)
				console.log('this.rectCanvas.width, this.rectCanvas.height',this.rectCanvas.width, this.rectCanvas.height)
				this.rectCanvasCtx.clearRect(0, 0, this.rectCanvas.width, this.rectCanvas.height);
				this.saveDrawingSurface();
				this.$store.state.isDrawn = false
			},
			oldTimeImageUrl(newValue) {
				this.rectCanvasCtx.clearRect(0, 0, this.rectCanvas.width, this.rectCanvas.height);
				if (this.oldTimeFileType != "image/tiff") {
					var that = this
					if (this.imgCanvasCtx1) {
						this.imgCanvasCtx1.clearRect(0, 0, this.imgWidth1, this.imgHeight1);
					}
					if (this.tiffCanvas1) {
						const elmnt = document.getElementById("tiffCanvas1");
						elmnt.remove();
						this.tiffCanvas1 = null
						this.tiffCanvasCtx1 = null
					}
					that.imgWidth1 = that.$store.state.img1.naturalWidth
					that.imgHeight1 = that.$store.state.img1.naturalHeight

					that.imgParams.top = 0
					that.imgParams.left = 0
					that.imgParams.width = 600 * that.imgWidth1 / that.imgHeight1
					that.imgParams.height = 600
					that.rectCanvas.width = that.imgWidth1
					that.rectCanvas.height = that.imgHeight1
					that.imgCanvas1 = document.querySelector('#imgCanvas1')
					that.imgCanvas1.width = that.imgWidth1
					that.imgCanvas1.height = that.imgHeight1

					that.imgCanvasCtx1 = that.imgCanvas1.getContext('2d')
					that.imgCanvasCtx1.drawImage(that.$store.state.img1, 0, 0);
					that.imgCanvas1.setAttribute('style', 'width: inherit;')

				} else {

					if (this.imgCanvasCtx1) {
						this.imgCanvasCtx1.clearRect(0, 0, this.imgWidth1, this.imgHeight1);
					}
					if (this.tiffCanvas1) {
						const elmnt = document.getElementById("tiffCanvas1");
						elmnt.remove();
						this.tiffCanvas1 = null
						this.tiffCanvasCtx1 = null
					}
					var that = this

					that.imgWidth1 = that.$store.state.tiff1.width()
					that.imgHeight1 = that.$store.state.tiff1.height()
					that.rectCanvas.width = that.imgWidth1
					that.rectCanvas.height = that.imgHeight1
					that.imgParams.top = 0
					that.imgParams.left = 0
					that.imgParams.width = 600 * that.imgWidth1 / that.imgHeight1
					that.imgParams.height = 600
					var canvas = that.$store.state.tiff1.toCanvas();
					canvas.setAttribute('id', 'tiffCanvas1')
					canvas.setAttribute('style', 'width:inherit')
					that.tiffCanvas1 = canvas
					document.querySelector('#image1').appendChild(canvas);
					that.tiffCanvasCtx1 = canvas.getContext("2d");
				}
				this.$store.state.isImgLoading = false
			},
			newTimeImageUrl(newValue) {
				this.rectCanvasCtx.clearRect(0, 0, this.rectCanvas.width, this.rectCanvas.height);
				if (this.imgCanvasCtx2) {
					this.imgCanvasCtx2.clearRect(0, 0, this.imgWidth2, this.imgHeight2);
				}
				if (this.tiffCanvas2) {
					const elmnt = document.getElementById("tiffCanvas2");
					elmnt.remove();
					this.tiffCanvas2 = null
					this.tiffCanvasCtx2 = null
				}

				if (this.newTimeFileType != "image/tiff") {
					var that = this

					that.imgWidth2 = that.$store.state.img2.naturalWidth
					that.imgHeight2 = that.$store.state.img2.naturalHeight

					that.imgParams.top = 0
					that.imgParams.left = 0
					that.imgParams.width = 600 * that.imgWidth2 / that.imgHeight2
					that.imgParams.height = 600
					that.rectCanvas.width = that.imgWidth2
					that.rectCanvas.height = that.imgHeight2
					that.imgCanvas2 = document.querySelector('#imgCanvas2')
					that.imgCanvas2.width = that.imgWidth2
					that.imgCanvas2.height = that.imgHeight2

					that.imgCanvasCtx2 = that.imgCanvas2.getContext('2d')
					that.imgCanvasCtx2.drawImage(that.$store.state.img2, 0, 0);
					that.imgCanvas2.setAttribute('style', 'width: inherit;')

				} else {
					var that = this
					if (this.imgCanvasCtx2) {
						this.imgCanvasCtx2.clearRect(0, 0, this.imgWidth2, this.imgHeight2);
					}
					if (this.tiffCanvas2) {
						const elmnt = document.getElementById("tiffCanvas2");
						elmnt.remove();
						this.tiffCanvas2 = null
						this.tiffCanvasCtx2 = null
					}
					// // var input = fr.readFileSync(filename);

					that.imgWidth2 = that.$store.state.tiff2.width()
					that.imgHeight2 = that.$store.state.tiff2.height()
					that.rectCanvas.width = that.imgWidth2
					that.rectCanvas.height = that.imgHeight2
					that.imgParams.top = 0
					that.imgParams.left = 0
					that.imgParams.width = 600 * that.imgWidth2 / that.imgHeight2
					that.imgParams.height = 600
					var canvas = that.$store.state.tiff2.toCanvas();
					canvas.setAttribute('id', 'tiffCanvas2')
					canvas.setAttribute('style', 'width:inherit')
					that.tiffCanvas2 = canvas
					document.querySelector('#image2').appendChild(canvas);
					that.tiffCanvasCtx2 = canvas.getContext("2d");

				}

				this.dividerPos = this.imgParams.left + this.imgParams.width / 2
				this.divider.style.left = this.dividerPos + "px"
				this.$store.state.isImgLoading = false
			},
			opacityVal(newValue) {
				this.$store.commit('CHANGE_OVERLAY_OPACITY', newValue / 100)
			},

			//当开启了同步操作时，需要时刻向公共参数发送新的参数
			imgParams: {
				deep: true,
				handler(newValue, oldValue) {}
			},


		},
		mounted() {
			this.img1 = this.$refs.image1; //获取图片元素
			this.img2 = this.$refs.image2; //获取图片元素
			this.divider = this.$refs.divider;
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
			DrawRect() {
				this.isDrawingRect = !this.isDrawingRect

			},
			DrawRectMouseDown(e) {
				if (!this.isDrawingRect || this.isDividerMoving) {
					return
				}
				var loc = this.windowToCanvas(e.clientX, e.clientY);
				this.saveDrawingSurface();
				this.rectParams.mousedown.x = loc.x;
				this.rectParams.mousedown.y = loc.y;
				this.rectParams.dragging = true;
			},
			DrawRectMouseMove(e) {
				if (this.isDividerMoving) {
					return
				}
				var loc;
				if (this.rectParams.dragging) {

					loc = this.windowToCanvas(e.clientX, e.clientY);
					this.restoreDrawingSurface();
					this.updateRectangle(loc);
				}
			},
			DrawRectMouseUp(e) {
				if (!this.isDrawingRect || this.isDividerMoving) {
					return
				}
				var loc = this.windowToCanvas(e.clientX, e.clientY);
				this.restoreDrawingSurface();
				this.updateRectangle(loc);
				this.rectParams.dragging = false;
				this.$store.state.isDrawingRect = false;
				this.$store.state.isDrawn = true
				this.$store.state.drawnRectParams = this.rectParams.drawnRect
				console.log(this.rectParams.drawnRect)
			},
			mouseUp() {
				if (this.isDrawingRect) {
					return
				}
				//鼠标抬起
				this.params.isDown = false;
				this.isDividerMoving = false;
			},
			mouseDown(e) {
				//鼠标按下事件
				if (this.isDrawingRect) {
					return
				}
				this.params.disX = e.clientX - this.img1.offsetLeft;
				this.params.disY = e.clientY - this.img1.offsetTop;

				//开关打开
				this.params.isDown = true;
				//mousedown.prevent阻止默认事件，否则鼠标拖拽的时候监听不到鼠标抬起
			},
			dividerMouseDown(e) {
				this.isDividerMoving = true
				this.dividerDisX = e.clientX
			},

			dividerMouseUp(e) {
				this.isDividerMoving = false;
			},
			dividerMouseMove(e) {
				if (this.isDividerMoving) {
					var move = e.clientX - this.dividerDisX
					this.dividerDisX = e.clientX
					this.dividerPos += move
					this.divider.style.left = this.dividerPos + "px"
				}
			},
			mouseMove(e) {
				if (this.isDividerMoving) {
					var move = e.clientX - this.dividerDisX
					this.dividerDisX = e.clientX
					this.dividerPos += move
					this.divider.style.left = this.dividerPos + "px"
				}
				if (this.isDrawingRect) {
					return
				}
				if (this.params.isDown) {
					var oldLeft = this.imgParams.left
					var oldWidth = this.imgParams.width
					this.imgParams.left = e.clientX - this.params.disX
					this.imgParams.top = e.clientY - this.params.disY
					//分割线跟踪
					if (this.isDividerTracked) {
						this.dividerPos = (this.dividerPos - oldLeft) * this.imgParams.width / oldWidth + this.imgParams
							.left
						this.divider.style.left = this.dividerPos + "px"
					}
				}



			},
			mousewheel(e) {
				if (this.rectParams.dragging) {
					return
				}
				//鼠标滚动事件
				if (e.wheelDelta || e.detail) {
					if ((Number(this.img1.style.width.replace('px', '')) + Number(this.img1.style.width.replace('px',
							'')) * e.wheelDelta / 1000) / 600 < this.params
						.minsize) {
						return
					}
					if ((Number(this.img1.style.width.replace('px', '')) + Number(this.img1.style.width.replace('px',
							'')) * e.wheelDelta / 1000) / 600 > this.params
						.maxsize) {
						return
					}
					var ratioX = e.layerX / Number(this.img1.style.width.replace('px', ''))
					var ratioY = e.layerY / Number(this.img1.style.height.replace('px', ''))
					var oldLeft = this.imgParams.left
					var oldWidth = this.imgParams.width
					this.imgParams.left -= Number(this.img1.style.width.replace('px', '')) * e.wheelDelta * ratioX / 1000
					this.imgParams.top -= Number(this.img1.style.height.replace('px', '')) * e.wheelDelta * ratioY / 1000
					this.imgParams.width += this.imgParams.width * e.wheelDelta / 1000
					//分割线跟踪
					if (this.isDividerTracked) {
						this.dividerPos = (this.dividerPos - oldLeft) * this.imgParams.width / oldWidth + this.imgParams
							.left
						this.divider.style.left = this.dividerPos + "px"
					}
				}

			},

			mouseLeave() {
				this.$store.state.mouseInFirst = false
			},
			mouseover() {
				this.$store.state.mouseInFirst = true
			},
			//图片放大按钮
			ZoomIn() {
				if ((Number(this.img1.style.width.replace('px', '')) * 1.5) / 600 > this.params
					.maxsize) {
					return
				}
				var oldLeft = this.imgParams.left
				var oldWidth = this.imgParams.width
				this.imgParams.left -= (Number(this.img1.style.width.replace('px', '')) * 1.5 - Number(this.img1.style
					.width.replace('px', ''))) / 2
				this.imgParams.top -= (Number(this.img1.style.width.replace('px', '')) * 1.5 - Number(this.img1.style.width
					.replace('px', ''))) / 2
				this.imgParams.width *= 1.5
				if (this.isDividerTracked) {
					this.dividerPos = (this.dividerPos - oldLeft) * this.imgParams.width / oldWidth + this.imgParams.left
					this.divider.style.left = this.dividerPos + "px"
				}
			},
			//图片缩小按钮
			ZoomOut() {
				if ((Number(this.img1.style.width.replace('px', '')) / 1.5) / 600 < this.params
					.minsize) {
					return
				}
				var oldLeft = this.imgParams.left
				var oldWidth = this.imgParams.width
				this.imgParams.left += (Number(this.img1.style.width.replace('px', '')) - Number(this.img1.style.width
					.replace('px', '')) / 1.5) / 2
				this.imgParams.top += (Number(this.img1.style.width.replace('px', '')) - Number(this.img1.style.width
					.replace('px', '')) / 1.5) / 2
				this.imgParams.width /= 1.5

				if (this.isDividerTracked) {
					this.dividerPos = (this.dividerPos - oldLeft) * this.imgParams.width / oldWidth + this.imgParams.left
					this.divider.style.left = this.dividerPos + "px"
				}
			},
			//图片复原按钮
			Resize() {
				var oldLeft = this.imgParams.left
				var oldWidth = this.imgParams.width
				this.imgParams.left = 0
				this.imgParams.top = 0
				var tmpwidth = this.imgWidth1
				var tmpheight = this.imgHeight1
				var ratio = tmpwidth / tmpheight
				this.imgParams.width = 600 * ratio
				//分割线跟踪
				if (this.isDividerTracked) {
					this.dividerPos = (this.dividerPos - oldLeft) * this.imgParams.width / oldWidth + this.imgParams.left
					this.divider.style.left = this.dividerPos + "px"
				}
			},

			DividerTrack() {
				this.isDividerTracked = !this.isDividerTracked
			},
		},
	};
</script>

<style scoped>
	.imgDiv {
		margin-left: 0px;

		position: relative;
		overflow-x: hidden;
		overflow-y: hidden;
		background-color: #fafafa;
		box-shadow: 2px 2px 3px 3PX #d6d6d6;
		border: 2px solid rgba(71, 146, 173, 0.8);
		border-radius: 5px;
		height: 99%;
	}

	.imgDiv:hover {

		border: 2px solid rgba(173, 29, 29, 0.8);
	}

	.DrawRect {
		position: absolute;
		right: 20px;
		bottom: 245px;
		height: 40px;
		cursor: pointer;
		z-index: 1;
		opacity: 0.5;
		background-color: gray;
		border-color: gray;
	}

	.DrawRect:hover {
		background-color: #98cff9;
	}

	.rsImage1 {
		position: absolute;

		z-index: 0;
	}

	.rsImage2 {
		position: absolute;

		z-index: 0;

	}

	.rsImageOver {
		position: absolute;
		cursor: move;
		z-index: 0;
		border: 2px solid #acacac;
	}

	.ZoomIn {
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

	.ZoomIn:hover {
		background-color: #98cff9;
	}

	.ZoomOut {
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

	.ZoomOut:hover {
		background-color: #98cff9;
	}

	.Resize {
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

	.Resize:hover {
		background-color: #98cff9;
	}

	.DividerTrack {
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


	.divider {
		background-color: rgb(49, 48, 48);
		width: 0.2%;
		height: 100%;
		position: absolute;
	}

	.divider:hover {
		background-color: rgb(75, 125, 161);
	}

	.dividerImg {
		width: 32px;
		position: absolute;
		margin-top: 80px;
		margin-left: -14px;
		z-index: 20;
	}

	.dividerImg:hover {
		cursor: pointer;
	}
	
	.Layers {
		position: absolute;
		right: 20px;
		bottom: 245px;
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
	
	.modal {
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 502;
		width: 100%;
		height: 100%;
		position: absolute;
	}
	
</style>
