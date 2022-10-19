<template>
	<div>

		<div class="operationTable" v-show="JSON.stringify(this.$route.params) === '{}'">
			<ObjDetectionTable />
		</div>
		<div class="operationTable" v-show="JSON.stringify(this.$route.params) != '{}'">
			<HistoryTableA />
		</div>
		<div class="ImageContainer">
			<RsImageContainerA  />
		</div>
	</div>


</template>

<script>
	import RsImageContainerA from '../components/RSImageContainerA.vue'
	import ObjDetectionTable from '../components/ObjDetectionTable.vue'
	import HistoryTableA from '../components/HistoryTableA.vue'
	
	
	export default {
		components: {
			RsImageContainerA,
			ObjDetectionTable,
			HistoryTableA

		},

		data() {
			return {

			}
		},
		mounted() {}
	}
</script>

<style scoped>
	.operationTable {
		display: inline-block;
		float: left;
		margin-left: 0px;
		margin-top: 1%;
		width: 25%;
		overflow: hidden;
	}

	.ImageContainer {
		margin-left: 25%;
	}
</style>
