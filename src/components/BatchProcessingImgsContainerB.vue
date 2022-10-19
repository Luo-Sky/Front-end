<template>
	<div style="position: relative;
		height: 99%;">
		<div class="imgDiv1">
			<div class="block" v-for="img in batchProcessingFiles1" :key="img.url"
				style="width: 200px;height: 200px;float: left;margin-left: 5%;margin-top: 4.5%;position:relative">
				<div id="">
					<div style="text-align: center;color: #4d4d4d;width: 200px;height:25px;overflow:hidden">{{img.name}}</div>
				</div>
				<div style="width: 100%;position:relative">
					<el-image :src="img.url" :preview-src-list="img.previewImg"
						style="box-shadow: 2px 4px 4px 4PX #d6d6d6;width: 200px;height: 200px;"></el-image>
					<div class="modal" v-show="img.showProgress"
						style="background-color: rgba(0, 0, 0, 0.4);z-index: 502;width: 200px;height: 200px;position: absolute;margin-top: -102%;">

						<el-progress :percentage="img.upLoadProgress" type="circle" :width="80"
							style="margin-left:60px ;margin-top:60px ;">
						</el-progress>

					</div>
					<div style="width: inherit;z-index: 100;position: absolute;margin-top: -102%;">
						<el-image :src="img.resultURL" v-show="img.resultURL" :preview-src-list="img.previewImg"
							style="width: 200px;height: 200px;">
						</el-image>

					</div>
				</div>

			</div>

			<div style="position: absolute; right: 25%; bottom: 46%; width: 220px;background-color: #969696;opacity: 0.5;"
				v-show="$store.state.batchProcessingFiles1.length===0">
				<label style="position: absolute;  bottom: 10px; width: 200px; ">等待加载时像1图片...</label>
			</div>
		</div>


		<div class="imgDiv2">

			<div class="block" v-for="img in batchProcessingFiles2" :key="img.url"
				style="width: 200px;height: 200px;float: left;margin-left: 5%;margin-top: 4.5%;position:relative">
				<div id="">
					<span style="text-align: center;color: #4d4d4d;">{{img.name}}</span>
				</div>
				<div style="width: 100%;position:relative">
					<el-image :src="img.url" :preview-src-list="img.previewImg"
						style="box-shadow: 2px 4px 4px 4PX #d6d6d6;width: 200px;height: 200px;"></el-image>
					<div class="modal" v-show="img.showProgress"
						style="background-color: rgba(0, 0, 0, 0.4);z-index: 502;width: 200px;height: 200px;position: absolute;margin-top: -102%;">
						<el-progress :percentage="img.upLoadProgress" type="circle" :width="80"
							style="margin-left:60px ;margin-top:60px ">
						</el-progress>
					</div>
					<div style="width: inherit;z-index: 100;position: absolute;margin-top: -102%;">
						<el-image :src="img.resultURL" v-show="img.resultURL" :preview-src-list="img.previewImg"
						style="width: 200px;height: 200px;">
						</el-image>

					</div>
				</div>

			</div>

			<div style="position: absolute; right: 25%; bottom: 46%; width: 220px;background-color: #969696;opacity: 0.5;"
				v-show="$store.state.batchProcessingFiles2.length===0">
				<label style="position: absolute;  bottom: 10px; width: 200px; ">等待加载时像2图片...</label>
			</div>

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
			batchProcessingFiles1() {
				return this.$store.state.batchProcessingFiles1
			},
			batchProcessingFiles2() {
				return this.$store.state.batchProcessingFiles2
			},
		},

		watch: {
		}

	}
</script>

<style scoped>
	.imgDiv1 {
		position: relative;
		overflow-y: auto;
		/* background-color: #414141; */
		border: 2px solid rgba(71, 146, 173, 0.8);
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		height: 100%;
		width: 49.5%;
		display: inline-block;
		float: left;
	}

	.imgDiv1:hover {
		border: 2px solid rgba(173, 29, 29, 0.8);
	}

	.imgDiv2 {
		position: relative;
		overflow-y: auto;
		/* background-color: #414141; */
		border: 2px solid rgba(71, 146, 173, 0.8);
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		height: 100%;
		width: 49.5%;

	}

	.imgDiv2:hover {
		border: 2px solid rgba(173, 29, 29, 0.8);
	}


	.modal {}
</style>
