<template>
	<div class="CanvasDiv">
		<canvas ref="SliceCanvas" class="SliceCanvas"></canvas>

		<el-button class="zoomin" type="primary" icon="el-icon-zoom-in" @click="ZoomIn"></el-button>
		<el-button class="zoomout" type="primary" icon="el-icon-zoom-out" @click="ZoomOut"></el-button>
		<el-button class="resize" type="primary" icon="el-icon-refresh" @click="Resize"></el-button>
	</div>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				SliceCanvas: null,
				ctx: "", //dom节点
				image:null,
			}
		},
		mounted() {
			this.SliceCanvas = this.$refs.SliceCanvas
			this.ctx = this.SliceCanvas.getContext("2d");

		},
		computed: {
			canvasImgURL() {
				return this.$store.state.firstImageURL
			}
		},
		watch: {
			canvasImgURL(newValue) {
				
				const image = new Image();
				image.src = newValue;
				
				let thisCtx = this.ctx
				let thisCanvas = this.SliceCanvas
				let that=this
				image.onload = function(event) {
					image.width = image.width / 5
					image.height = image.height / 5
					console.log(image.width)
					// console.log(event, this);
					// URL.revokeObjectURL(this.src);

					thisCtx.drawImage(image, 30, 30,image.width,image.height);
					that.image=image
					console.log(this.image)
				}
			}
		},
		methods: {
			ZoomIn() {

				this.image.width*=1.5
				this.image.height*=1.5
				this.ctx.drawImage(this.image, 30, 30, this.image.width,this.image.height);
			},
			//图片缩小按钮
			ZoomOut() {
				this.image.width/=1.5
				this.image.height/=1.5
				this.ctx.drawImage(this.image, 30, 30, this.image.width,this.image.height);

			},
			//图片复原按钮
			Resize(){
				
			}
		}
	}
</script>

<style scoped>
	.CanvasDiv {
		position: absolute;
		width: 99%;
		height: 90%;
	}

	.SliceCanvas {
		background-color: #37363d;
		width: 100%;
		height: 100%;
	}

	.zoomin {
		right: 30px;
		bottom: 190px;
		width: 54px;
		height: 50px;
		position: absolute;
		cursor: pointer;
		z-index: 1;
		opacity: 0.5;
		background-color: gray;
		border-color: gray;
		margin-left: 1px;
	}

	.zoomin:hover {
		background-color: #98cff9;
		right: 26px;
		bottom: 186px;
		width: 62px;
		height: 58px;

	}

	.zoomout {
		right: 30px;
		bottom: 110px;
		width: 54px;
		height: 50px;
		position: absolute;
		cursor: pointer;
		z-index: 1;
		opacity: 0.5;
		background-color: gray;
		border-color: gray;
	}

	.zoomout:hover {
		background-color: #98cff9;
		right: 26px;
		bottom: 106px;
		width: 62px;
		height: 58px;
	}

	.resize {
		right: 30px;
		bottom: 30px;
		width: 54px;
		height: 50px;
		position: absolute;
		cursor: pointer;
		z-index: 1;
		opacity: 0.5;
		background-color: gray;
		border-color: gray;
	}

	.resize:hover {
		background-color: #98cff9;
		right: 26px;
		bottom: 26px;
		width: 62px;
		height: 58px;
	}
</style>
