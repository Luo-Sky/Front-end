<template>
	<div>
		<!--上传-->
		<input v-show="false" type="file" ref="fileRef" @change="SelectFiles()" accept="image/*" webkitdirectory>
		<el-button @click="uploadFile" size="mini">选择文件夹</el-button>

	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: ['btnName'],
		computed: {

		},
		methods: {
			uploadFile() {
				if (this.$store.state.isImgLoading){
					this.$message({
						showClose: true,
						message: '请等待其他操作完成',
						type: 'warning',
						duration: 3000
					});
					return
				}
				this.$refs.fileRef.dispatchEvent(new MouseEvent('click'))
			},
			SelectFiles() {
				var files = this.$refs.fileRef.files
				this.$store.state.files = files
				var filesList = []
				var len = files.length
				for (var i = 0; i < len; i++) {
					var file = files[i]
					var name = file.name
					var url
					if (window.createObjectURL != undefined) { // basic
						url = window.createObjectURL(file);
					} else if (window.webkitURL != undefined) { // webkit or chrome
						url = window.webkitURL.createObjectURL(file);
					} else if (window.URL != undefined) { // mozilla(firefox)
						url = window.URL.createObjectURL(file);
					}
					var fileType = file.type
					if (fileType != 'image/tiff' && fileType != 'image/jpg'  && fileType != 'image/jpeg'&& fileType != 'image/png' && fileType !=
						'image/bmp' &&fileType != 'image/tif') {
						continue
					}
					const tmp = {
						name,
						url,
						fileType
					}
					filesList.push(tmp)
				}
				this.$store.state.filesList = filesList
				
			},
		}
	}
</script>

<style>
</style>
