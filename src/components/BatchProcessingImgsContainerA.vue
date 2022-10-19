<template>
	<div class="imgDiv">

		<div class="block" v-for="img in batchProcessingFiles" :key="img.url"
			style="width: 200px;height: 200px;float: left;margin-left: 5%;margin-top: 4.5%;position:relative">
			<div id="">
				<div style="text-align: center;color: #4d4d4d;width: 200px;height:25px;overflow:hidden">{{img.name}}</div>
			</div>
			<div style="width: 100%;position:relative">
				<el-image :src="img.url" :preview-src-list="img.previewImg"
					style="box-shadow: 2px 4px 4px 4PX #d6d6d6;width: 200px;height: 200px;"></el-image>
				<div class="modal"  v-show="img.showProgress"
					style="background-color: rgba(0, 0, 0, 0.4);z-index: 502;width: 200px;height:200px;position: absolute;margin-top: -205px;">

					<el-progress :percentage="img.upLoadProgress" type="circle" :width="100"
						style="margin-left:25% ;margin-top:25% ;">
					</el-progress>
					<!-- <i class="el-icon-loading" v-show="!$store.state.showProcess"
							style="margin-left:48% ;margin-top:40% ;color:#409eff"></i> -->
				</div>
				<div style="width: inherit;z-index: 100;position: absolute;margin-top: -102%;">
					<el-image :src="img.resultURL" v-show="img.resultURL" :preview-src-list="img.previewImg"
						style="width: 200px;height: 200px;"></el-image>

				</div>
			</div>



		</div>

		<div style="position: absolute; right: 36%; bottom: 46%; width: 220px;background-color: #969696;opacity: 0.5;"
			v-show="$store.state.batchProcessingFiles0.length===0">
			<label style="position: absolute; right: 60px; bottom: 10px; width: 200px; ">等待加载批量处理图片...</label>
		</div>

	</div>
</template>

<script>
	export default {

		data() {
			return {

			}
		},

		computed: {
			batchProcessingFiles() {
				return this.$store.state.batchProcessingFiles0
			},
		},

		watch: {

		}

	}
</script>

<style scoped>
	.imgDiv {
		position: relative;
		overflow-y: auto;
		/* background-color: #414141; */
		border: 2px solid rgba(71, 146, 173, 0.8);
		border-radius: 5px;
		height: 99%;
	}

	.imgDiv:hover {
		border: 2px solid rgba(173, 29, 29, 0.8);
	}


	.modal {}
</style>
