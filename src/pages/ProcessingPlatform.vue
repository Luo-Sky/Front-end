<template>
	<div>
		<ImageSliceCanvas/>
		<ProcessingPlatformDrawer/>
	</div>
	

</template>

<script>
	import ImageSliceCanvas from '../components/ImageSliceCanvas.vue'
	import ProcessingPlatformDrawer from '../components/ProcessingPlatformDrawer.vue'
	export default {
		components: {
			ImageSliceCanvas,
			ProcessingPlatformDrawer
		},
			
		data(){
			return {
			}
		},
		mounted() {
		}
	}
</script>

<style scoped>

</style>
