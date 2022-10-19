<template>
	<div id="">
		<ObjClassificationDrawer/>
		<div class="operationTable" v-show="JSON.stringify(this.$route.params) === '{}'">
			<ObjClassificationTable />
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
	import ObjClassificationTable from '../components/ObjClassificationTable.vue'
	import ObjClassificationDrawer from '../components/ObjClassificationDrawer.vue'
	import HistoryTableA from '../components/HistoryTableA.vue'
	export default {
		components: {
			RsImageContainerA,
			ObjClassificationTable,
			ObjClassificationDrawer,
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
