<template>
	<div id="">
		<ObjChangeDrawer/>
		<div class="operationTable" v-show="JSON.stringify(this.$route.params) === '{}'">
			<ObjChangeTable />
		</div>
		<div class="operationTable" v-show="JSON.stringify(this.$route.params) != '{}'">
			<HistoryTableB />
		</div>
		<div class="ImageContainer">
			<RsImageContainerB />
		</div>
	</div>


</template>

<script>
	import RsImageContainerB from '../components/RSImageContainerB.vue'
	import ObjChangeTable from '../components/ObjChangeTable.vue'
	import ObjChangeDrawer from '../components/ObjChangeDrawer.vue'
	import HistoryTableB from '../components/HistoryTableB.vue'
	export default {
		components: {
			RsImageContainerB,
			ObjChangeTable,
			ObjChangeDrawer,
			HistoryTableB
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

		overflow: hidden;
	}

	.ImageContainer {
		margin-left: 29%;
	}
</style>
