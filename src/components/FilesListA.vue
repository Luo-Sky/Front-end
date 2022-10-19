<template>
	<div>
		<el-input v-model="search" size="mini" placeholder="输入关键字搜索" style="width:98%;margin-bottom: 10px;" />
		<el-table class="fileTable"
			:data="selectedFilesList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
			style=" width: 98%;height:400px" row-key="id" border default-expand-all stripe
			:tree-props="{children: 'children', hasChildren: 'hasChildren'}" size="mini" max-height="405px"
			empty-text="请选择一个文件夹,选择后这里将显示文件夹内的图片">


			<!-- <el-table-column prop="name" label="文件名" sortable width="240">
			</el-table-column> -->

			<el-table-column label="文件名" width="240">
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="top" :close-delay="0">
						<img :src="scope.row.url" style="width: 150px;">
						<div slot="reference" class="name-wrapper">{{ scope.row.name }}

						</div>
					</el-popover>
				</template>
			</el-table-column>



			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="text">选择</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import Tiff from 'tiff.js'
	export default {
		data() {
			return {
				search: '',
				// tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))
			};
		},

		computed: {
			selectedFilesList() {
				return this.$store.state.filesList
			},
			selectedFiles() {
				return this.$store.state.files
			}

		},

		methods: {
			handleEdit(index, row) {
				if (this.$store.state.isImgLoading) {
					that.$message({
						showClose: true,
						message: '还在加载其他图片，请耐心等待',
						type: 'warning',
						duration: 2000
					});
					return
				}
				this.$store.state.flag0=null
				this.$store.state.flag1=null
				this.$store.state.flag2=null
				for (var i = 0; i < this.selectedFiles.length; i++) {

					if (this.selectedFiles[i].name === row.name) {

						var file = this.selectedFiles[i]
						var url
						if (window.createObjectURL != undefined) { // basic
							url = window.createObjectURL(file);
						} else if (window.webkitURL != undefined) { // webkit or chrome
							url = window.webkitURL.createObjectURL(file);
						} else if (window.URL != undefined) { // mozilla(firefox)
							url = window.URL.createObjectURL(file);
						}

						this.$store.state.isImgLoading = true
						this.$store.state.loadingMsg = "加载图片中..."
						if (file.type != "image/tiff") {
							var that = this
							var tmpimg = new Image()
							tmpimg.src = url
							tmpimg.onload = function(event) {
								that.$store.state.imgWidth = tmpimg.naturalWidth
								that.$store.state.imgHeight = tmpimg.naturalHeight
								that.$store.state.drawnRectParams.width = that.$store.state.imgWidth
								that.$store.state.drawnRectParams.height = that.$store.state.imgHeight
								that.$store.state.img0 = tmpimg

								that.$store.state.file = file
								that.$store.state.fileType = file.type
								that.$store.commit('CHANGE_IMAGEURL', url)

								that.$store.state.secondImageURL = ""
								that.$store.state.isOperated = false

							}
						} else {
							var that = this
							var fr = new FileReader();
							fr.readAsArrayBuffer(file);

							Tiff.initialize({
								TOTAL_MEMORY: 1073741824 //1个G
							})
							fr.addEventListener("loadend", (e) => {
								// // var input = fr.readFileSync(filename);
								that.$store.state.tiff0 = new Tiff({
									buffer: e.target.result
								});
								that.$store.state.imgWidth = that.$store.state.tiff0.width()
								that.$store.state.imgHeight = that.$store.state.tiff0.height()
								that.$store.state.drawnRectParams.width = that.$store.state.imgWidth
								that.$store.state.drawnRectParams.height = that.$store.state.imgHeight

								that.$store.state.file = file
								that.$store.state.fileType = file.type
								that.$store.commit('CHANGE_IMAGEURL', url)


								that.$store.state.secondImageURL = ""
								that.$store.state.isOperated = false
							})
						}
						break;
					}

				}
			}
		},
	}
</script>

<style scoped>

</style>
