<template>
	<div>
		<ObjExtractDrawer/>
		<div class="operationTable" v-show="JSON.stringify(this.$route.params) === '{}'">
			<ObjExtractTable />
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
	import ObjExtractTable from '../components/ObjExtractTable.vue'
	import ObjExtractDrawer from '../components/ObjExtractDrawer.vue'
	import HistoryTableA from '../components/HistoryTableA.vue'
	
	export default {
		components: {
			RsImageContainerA,
			ObjExtractTable,
			ObjExtractDrawer,
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
	.ImageContainer{
		margin-left: 25%;
	}
	
</style>
