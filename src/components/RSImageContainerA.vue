<template>
	<div style="width: 74%;height:605px; margin-top: 1%; position: absolute;" ref="Container">
		<div  :style="singleImg" v-show="!$store.state.isBatchProcessingMode">
			<OriginalRsImage></OriginalRsImage>
			
		</div>
		<div  :style="singleImg" v-show="$store.state.isBatchProcessingMode">
			<BatchProcessingImgsContainerA ></BatchProcessingImgsContainerA>
		</div>

	</div>

</template>

<script>
	import OriginalRsImage from './OriginalRsImage.vue'
	import BatchProcessingImgsContainerA from './BatchProcessingImgsContainerA.vue'

	export default {
		components: {
			OriginalRsImage,
			BatchProcessingImgsContainerA
		},
		data() {
			return {

			}
		},
		computed: {

			//单图片时容器样式
			singleImg() {
				return {
					width: '100%',
					height: '100%'
				}

			},
		},
	}
</script>

<style scoped>
</style>
