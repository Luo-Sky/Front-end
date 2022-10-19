<template>
	<div>
		<el-input v-model="search" size="mini" placeholder="输入关键字搜索" style="width:98%;margin-bottom: 15px;" />
		<el-table class="fileTable"
			:data="selectedFilesList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
			style=" width: 98%;height:395px" row-key="id" border default-expand-all stripe
			:tree-props="{children: 'children', hasChildren: 'hasChildren'}" size="mini" max-height="400px"
			empty-text="请选择一个文件夹,选择后这里将显示文件夹内的图片">


			<!-- <el-table-column prop="name" label="文件名" sortable width="240">
			</el-table-column> -->

			<el-table-column label="文件名" width="180">
				<template slot-scope="scope">
					<el-popover trigger="hover" placement="top" :close-delay="0">
						<img :src="scope.row.url" width="100px" style="width: 150px;">
						<div slot="reference" class="name-wrapper">{{ scope.row.name }}

						</div>
					</el-popover>
				</template>
			</el-table-column>


			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit1(scope.$index, scope.row)" type="text">时像1</el-button>
					<el-button size="mini" @click="handleEdit2(scope.$index, scope.row)" type="text"
						:disabled="!$store.state.oldTimeImageURL">时像2</el-button>
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
			handleEdit1(index, row) {
				if (this.$store.state.isImgLoading) {
					that.$message({
						showClose: true,
						message: '还在加载其他图片，请耐心等待',
						type: 'warning',
						duration: 2000
					});
					return
				}
				
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
						this.$store.state.loadingMsg="加载图片中..."
						if (file.type != "image/tiff") {
							var that = this
							var tmpimg = new Image()
							tmpimg.src = url
							tmpimg.onload = function(event) {
								if (that.$store.state.imgWidth2 != 0 && that.$store.state.imgHeight2 != 0) {
									if (tmpimg.naturalWidth != that.$store.state.imgWidth2 || tmpimg.naturalHeight !=
										that.$store.state.imgHeight2) {

										that.$message({
											showClose: true,
											message: '两张图片的大小不同，请选择大小一致的图片',
											type: 'error',
											duration: 3000
										});
										that.$store.state.isImgLoading = false
										return
									}
								}
								that.$store.state.imgWidth1 = tmpimg.naturalWidth
								that.$store.state.imgHeight1 = tmpimg.naturalHeight
								that.$store.state.drawnRectParams.width=that.$store.state.imgWidth
								that.$store.state.drawnRectParams.height=that.$store.state.imgHeight
								that.$store.state.img1 = tmpimg
								that.$store.state.oldTimeFile = file
								that.$store.state.oldTimeFileType = file.type
								that.$store.commit('CHANGE_OLDTIMEURL', url)
								that.$store.state.secondImageURL = ""
								that.$store.state.isOperated = false
								that.$store.state.flag0=null
								that.$store.state.flag1=null
								that.$store.state.flag2=null

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
								var tiff = new Tiff({
									buffer: e.target.result
								});


								if (that.$store.state.imgWidth2 != 0 && that.$store.state.imgHeight2 != 0) {
									if (tiff.width() != that.$store.state.imgWidth2 || tiff.height() != that.$store
										.state.imgHeight2) {

										that.$message({
											showClose: true,
											message: '两张图片的大小不同，请选择大小一致的图片',
											type: 'error',
											duration: 3000
										});
										that.$store.state.isImgLoading = false
										return
									}
								}
								that.$store.state.tiff1 = tiff
								that.$store.state.imgWidth1 = that.$store.state.tiff1.width()
								that.$store.state.imgHeight1 = that.$store.state.tiff1.height()
								that.$store.state.drawnRectParams.width=that.$store.state.imgWidth1
								that.$store.state.drawnRectParams.height=that.$store.state.imgHeight1
								that.$store.state.oldTimeFile = file
								that.$store.state.oldTimeFileType = file.type
								that.$store.commit('CHANGE_OLDTIMEURL', url)

								that.$store.state.secondImageURL = ""
								that.$store.state.isOperated = false
								
								that.$store.state.flag0=null
								that.$store.state.flag1=null
								that.$store.state.flag2=null
								
							})


						}
					}
				}

			},
			handleEdit2(index, row) {
				if (this.$store.state.isImgLoading) {
					that.$message({
						showClose: true,
						message: '还在加载其他图片，请耐心等待',
						type: 'warning',
						duration: 2000
					});
					return
				}
				
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
						this.$store.state.loadingMsg="加载图片中..."
						if (file.type != "image/tiff") {
							var that = this
							var tmpimg = new Image()
							tmpimg.src = url
							tmpimg.onload = function(event) {
								if (that.$store.state.imgWidth1 != 0 && that.$store.state.imgHeight1 != 0) {
									if (tmpimg.naturalWidth != that.$store.state.imgWidth1 || tmpimg.naturalHeight !=
										that.$store.state.imgHeight1) {

										that.$message({
											showClose: true,
											message: '两张图片的大小不同，请选择大小一致的图片',
											type: 'error',
											duration: 3000
										});
										that.$store.state.isImgLoading = false
										return
									}
								}
								that.$store.state.imgWidth2 = tmpimg.naturalWidth
								that.$store.state.imgHeight2 = tmpimg.naturalHeight
								that.$store.state.drawnRectParams.width=that.$store.state.imgWidth2
								that.$store.state.drawnRectParams.height=that.$store.state.imgHeight2
								that.$store.state.img2 = tmpimg
								that.$store.state.newTimeFile = file
								that.$store.state.newTimeFileType = file.type
								that.$store.commit('CHANGE_NEWTIMEURL', url)
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
								var tiff = new Tiff({
									buffer: e.target.result
								});

								if (that.$store.state.imgWidth2 != 0 && that.$store.state.imgHeight2 != 0) {
									if (tiff.width() != that.$store.state.imgWidth2 || tiff.height() != that.$store
										.state.imgHeight2) {

										that.$message({
											showClose: true,
											message: '两张图片的大小不同，请选择大小一致的图片',
											type: 'error',
											duration: 3000
										});
										that.$store.state.isImgLoading = false
										return
									}
								}
								that.$store.state.tiff2 = tiff
								that.$store.state.imgWidth2 = that.$store.state.tiff2.width()
								that.$store.state.imgHeight2 = that.$store.state.tiff2.height()
								that.$store.state.drawnRectParams.width=that.$store.state.imgWidth2
								that.$store.state.drawnRectParams.height=that.$store.state.imgHeight2
								that.$store.state.newTimeFile = file
								that.$store.state.newTimeFileType = file.type
								that.$store.commit('CHANGE_NEWTIMEURL', url)

								that.$store.state.secondImageURL = ""
								that.$store.state.isOperated = false
							})
						}
					}
				}


			},


		}
	}
</script>

<style scoped>
</style>
