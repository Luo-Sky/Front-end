<template>
	<div style="width: 70%;height:605px; margin-top: 1%; position: absolute;" ref="Container">
		<div  :style="singleImg" v-show="!$store.state.isBatchProcessingMode">
			<DoubleImage></DoubleImage>
		</div>
		<div   :style="singleImg" v-show="$store.state.isBatchProcessingMode">
			<BatchProcessingImgsContainerB></BatchProcessingImgsContainerB>
		</div>
	</div>

</template>

<script>
	import DoubleImage from './DoubleImage.vue'
	import BatchProcessingImgsContainerB from './BatchProcessingImgsContainerB.vue'

	export default {
		components: {
			DoubleImage,
			BatchProcessingImgsContainerB
		},

		data() {
			return {}
		},
		computed: {

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
