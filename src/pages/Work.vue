<template>
	<div id="building">

		<el-dialog title="创建一个新的项目" :visible.sync="dialogFormVisible">

			<el-form label-width="120px" ref="kfFormRef" :rules="kfFormRules" :model="form">
				<el-form-item label="项目封面：" prop="headImg">
					<el-upload :action="uploadURL" list-type="picture-card" :class="{ hide: hideUpload }" name="files"
						:on-preview="handlePreview" :on-remove="remove" :on-change="uploadChange"
						:http-request="headUpload">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="previewVisible">
						<img width="100%" :src="previewPath" alt="">
					</el-dialog>
				</el-form-item>

				<el-form-item label="项目名称">
					<el-input v-model="form.name" autocomplete="off" style="width:95%"></el-input>
				</el-form-item>
				<el-form-item label="项目描述">
					<el-input type="textarea" :rows="3" placeholder="请输入有关项目的描述" v-model="form.description"
						style="width:95%">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="CreateNewProject">确 定</el-button>
			</div>
		</el-dialog>


		<el-row>
			<el-col :span="3">
				<div style="width:100%;height: 5em;"></div>
			</el-col>
			<el-col :span="19">
				<div style="background-color: antiquewhite;width: 100%;height: 40em;">
					<!-- <div style="background-color: aquamarine;width: 100%;height: 2em;"></div> -->
					<el-card style="background-color: white;" shadow="hover">

						<el-row>
							<el-col :span="4">
								<span
									style="margin-left: 10px;color: #969696;font-size:200%;font-weight: bold;">功能选择</span>
							</el-col>
							<el-col :span="4">
								<el-popover placement="top-start" width="250" trigger="hover" style="float: right;"
									content="在正式处理图像前，您需要先创建一个项目，您的操作结果将会记录在您所选的项目之下，方便您后期浏览。">
									<img slot="reference" src="../../public/help.png"
										style="width:18px;position: relative;top: 9px;left: 9px;">
								</el-popover>
								<el-button style="float: right;position: relative;width:123px;top: 20%;"
									icon=" el-icon-folder-add" @click="ClickCreateNewProject">
									新建项目
								</el-button>
							</el-col>
						</el-row>
						<div style="background-color:#969696;width: 100%;height: 1px;margin-top: 25px;"></div>

						<el-row>
							<el-col :span="1" class="type-item">
								<el-tooltip placement="left">

									<div slot="content">提取遥感影像中特定目标地物<br />将其在结果图中高亮显示，包<br />括对道路、水体和建筑物的提<br />取。
									</div>
									<el-card class="typetitle1" shadow="hover">
										目标提取
									</el-card>
								</el-tooltip>
							</el-col>
							<!-- extract -->
							<el-col :span="6" v-for="item in extract" :key="extract.id" class="team-item">
								<el-card :body-style="{ padding: '0px' }" shadow="hover" class="operate1">
									<img :src="item.url" class="image">
									<div style="padding: 14px;">
										<!-- <i class="el-icon-search"></i> -->
										<span class="title">{{ item.title }}</span><br>
										<span class="description">{{ item.description }}</span>
										<div class="bottom clearfix">
												<div style="background-color:#969696;width: 100%;height: 1px;"></div>
											<el-button type="text" class="newwork" @click="newprocess(item.typeid)">新建处理
											</el-button>
										</div>
									</div>
								</el-card>
							</el-col>
						</el-row>

						<el-row>
							<el-col :span="1" class="type-item">
								<el-tooltip placement="left">
									<div slot="content">识别两张不同时相同一地区的<br />遥感影像中建筑物变化的区域<br />并将其在结果图中高亮显示。</div>
									<el-card class="typetitle2" shadow="hover">
										变化检测
									</el-card>
								</el-tooltip>
							</el-col>
							<!-- change -->
							<el-col :span="24" v-for="item in change" :key="change.id" class="team-item">
								<el-card :body-style="{ padding: '0px' }" shadow="hover" class="operate2">
									<img :src="item.url" class="image">
									<div style="padding: 14px;">

										<span class="title">{{ item.title }}</span><br>
										<span class="description">{{ item.description }}</span>
										<div class="bottom clearfix">
												<div style="background-color:#969696;width: 100%;height: 1px;"></div>
											<el-button type="text" class="newwork" @click="newprocess(item.typeid)">新建处理
											</el-button>
										</div>
									</div>
								</el-card>
							</el-col>
						</el-row>

						<el-row>
							<el-col :span="1" class="type-item">
								<el-tooltip placement="left">
									<div slot="content">
										检测和识别一张遥感影像中的<br />特定地物并在结果图中结合置<br />信度大小将其框出，包括对飞<br />机、立交桥以及操场的检测。
									</div>
									<el-card class="typetitle3">
										目标检测
									</el-card>
								</el-tooltip>
							</el-col>
							<!-- detection -->
							<el-col :span="6" v-for="item in detection" :key="detection.id" class="team-item">
								<el-card :body-style="{ padding: '0px' }" shadow="hover" class="operate3">
									<!-- <div style="position: absolute;margin-top: 45px;margin-right: 160px;width: 100px;height: 100px;border-radius: 50px;
					background: linear-gradient(120deg,hsla(0,0%,100%,.15) -5%,hsla(0,0%,100%,0) 95%);"></div>
					<div style="position: absolute;top: -20px;left: 160px;width: 100px;height: 100px;border-radius: 50px;
					background: linear-gradient(120deg,hsla(0,0%,100%,.15) -5%,hsla(0,0%,100%,0) 95%);">
					</div> -->
									<img :src="item.url" class="image">
									<div style="padding: 14px;">
										<span class="title">{{ item.title }}</span><br>
										<span class="description">{{ item.description }}</span>
										<div class="bottom clearfix">
												<div style="background-color:#969696;width: 100%;height: 1px;"></div>
											<el-button type="text" class="newwork" @click="newprocess(item.typeid)">新建处理
											</el-button>
										</div>
									</div>
								</el-card>
							</el-col>
						</el-row>


						<el-row>
							<el-col :span="1" class="type-item">


								<el-tooltip placement="left">
									<div slot="content">
										将一张遥感影像中的地物进行<br />分类并用不同颜色标记，其在<br />结果图中不同地物将以不同<br />颜色呈现，每种颜色代表一类<br />地物，包括5类地物的粗分类<br />以及15类地物的精分类。

									</div>
									<el-card class="typetitle0" shadow="hover">
										地物分类
									</el-card>
								</el-tooltip>

								<el-tooltip class="item" effect="dark" content="地物分类操作" placement="left">

								</el-tooltip>
							</el-col>
							<!-- classification -->

							<el-col :span="6" v-for="item in classification" :key="classification.id" class="team-item">
								<el-card :body-style="{ padding: '0px' }" shadow="hover" class="operate0">
									<img :src="item.url" class="image">
									<div style="padding: 14px;">
										<span class="title">{{ item.title }}</span><br>
										<span class="description">{{ item.description }}</span>
										<div class="bottom clearfix">
												<div style="background-color:#969696;width: 100%;height: 1px;"></div>
											<el-button type="text" class="newwork" @click="newprocess(item.typeid)">新建处理
											</el-button>
										</div>
									</div>
								</el-card>
							</el-col>


						</el-row>






					</el-card>

				</div>

			</el-col>


			<el-col :span="3"></el-col>
		</el-row>













	</div>
</template>

<script>
import axios from 'axios'
import service from '@/userinfo/request';
export default {
	data() {
		return {
			// 上传图片的URL地址
			uploadURL: '',
			previewPath: '',
			previewVisible: false,
			codePath: '',
			codeVisible: false,
			hideUpload: false,
			hideCode: false,
			limitCount: 1,
			limitCode: 1,
			headImg: [],//头像
			kfFormRules: {

				headImg: [{ required: true, message: '请上传项目图片', trigger: 'change' }],

			},
			headFile: '',
			headFileList: '',
			codeFile: '',
			codeFileList: '',
			para: [],

			dialogFormVisible: false,
			form: {
				name: '',
				description: ''
			},
			formLabelWidth: '120px',
			extract: [{
				url: require("../assets/img/daolu.png"),
				title: "道路",
				description: "典型道路目标自动提取",
				typeid: "1-1"
			},
			{
				url: require("../assets/img/water.png"),
				title: "水体",
				description: "典型水体目标自动提取",
				typeid: "1-2"
			},
			{
				url: require("../assets/img/building.png"),
				title: "建筑物",
				description: "典型建筑目标自动提取",
				typeid: "1-3"
			},
			],
			change: [{
				url: require("../assets/img/buildings.png"),
				title: "建筑物变化检测",
				description: "建筑新增、拆除变化检测",
				typeid: "2-1"
			},],
			detection: [{
				url: require("../assets/img/playground.png"),
				title: "操场",
				description: "操场目标检测",
				typeid: "3-1"
			},
			{
				url: require("../assets/img/bridge.png"),
				title: "立交桥",
				description: "立交桥目标检测",
				typeid: "3-2"
			},
			{
				url: require("../assets/img/plane.png"),
				title: "飞机",
				description: "飞机目标检测",
				typeid: "3-3"
			},
			],
			classification: [{
				url: require("../assets/img/class1.png"),
				title: "粗分类",
				description: "5类地物属性自动分类",
				typeid: "4-1"
			},
			{
				url: require("../assets/img/class2.png"),
				title: "精分类",
				description: "15类地物属性自动分类",
				typeid: "4-2"
			},

			],
			type: [{
				title: "目标提取",
				des: ""
			},
			{
				title: "变化检测",
				des: ""
			},
			{
				title: "目标检测",
				des: ""
			},
			{
				title: "地物分类",
				des: ""
			},
			]
		};
	},
	mounted() {

		//获取所有project
		service.get(this.$store.state.serverURL + "/projects",
			{
				params: {
					userId: localStorage.getItem("ID"),
					pageSize: -1,
					pageNum: -1,
				}
			}
		)
			.then((res) => {
				// console.log("res.data.records", res.data.records)
				this.allData = res.data.records
				localStorage.setItem("projectInfo", JSON.stringify(res.data.records));
				const x = localStorage.getItem("projectInfo")
			});


	},
	methods: {
		// 处理图片预览效果
		handlePreview(file) {
			this.previewPath = file.url;
			this.previewVisible = true
		},
		remove(file, fileList) {
			if (fileList.length == 0) {
				this.kfFormRules.headImg = [{ required: true, message: '请上传微信头像', trigger: 'change' }];
			}
			this.hideUpload = fileList.length >= this.limitCount;
		},
		uploadChange(file, fileList) {

			this.headFile = file;
			this.headFileList = fileList;
			if (fileList.length == 1) {
				let { headImg, ...data } = this.kfFormRules; //删除kfFormRules中的headImg属性
				this.kfFormRules = data;
			}
			this.$refs.kfFormRef.clearValidate('headImg');
			this.hideUpload = fileList.length >= this.limitCount;
			this.para = file.raw;

			// console.log("???",typeof(this.headImg))
		},
		headUpload(params) {
			let param = new FormData();
			param.append("files", params.file);
			// axios({
			//     url: this.adminConfig.uploadPath+"upload/upload/",
			//     method: "post",
			//     data: param,
			//     headers: {
			//         "Content-Type": "multipart/form-data"
			//     }
			// }).then(res => {
			//     this.headImg = [];
			//     this.headImg.push(res.data.data)
			// })
		},
		ClickCreateNewProject() {
			if (!localStorage.getItem("ID")) {
				this.$message({
					showClose: true,
					message: '您还未登录，请先登录',
					type: 'error',
					duration: 3000
				});
				this.$router.push("/login");
				return
			}
			this.dialogFormVisible = true
		},
		CreateNewProject() {
			if (!this.form.name) {
				this.$message({
					showClose: true,
					message: '项目名为空，请输入一个项目名',
					type: 'error',
					duration: 3000
				});
				return
			}
			var formData = new FormData();
			formData.append('userId', parseInt(localStorage.getItem("ID"))),
				formData.append('title', this.form.name)
			formData.append('description', this.form.description)
			// formData.append('createTime', Date.now()*1)时间string指定不行
			formData.append('file', this.para)
			var that = this
			axios.post(
				`${this.$store.state.serverURL}/projects`,
				formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}).then(
				(res) => {
					service.get(that.$store.state.serverURL + "/projects",
						{
							params: {
								userId: localStorage.getItem("ID"),
								pageSize: -1,
								pageNum: -1,
							}
						}
					)
						.then((res) => {
							if (res.data.records) {
								this.allData = res.data.records
								localStorage.setItem("projectInfo", JSON.stringify(res.data.records));
								const x = localStorage.getItem("projectInfo")

								this.$message({
									showClose: true,
									message: '创建项目成功',
									type: 'success',
									duration: 3000
								});
								this.dialogFormVisible = false
							}
							else {
								this.$message({
									showClose: true,
									message: '创建失败，服务器处理错误，请稍后重试',
									type: 'error',
									duration: 3000
								});
							}

						});
				})
		},
		newprocess(typeid) {
			if (!localStorage.getItem("ID")) {
				this.$message({
					showClose: true,
					message: '您还未登录，请先登录',
					type: 'error',
					duration: 3000
				});
				this.$router.push("/login");
				return
			}
			this.$store.commit('CHANGE_ROUTER')
			if (typeid === "1-1") {

				this.$router.push({
					name: "extract",
					query: {
						processType: "road"
					}
				})
			} else if (typeid === "1-2") {
				this.$router.push({
					name: "extract",
					query: {
						processType: "water"
					}
				})
			} else if (typeid === "1-3") {
				this.$router.push({
					name: "extract",
					query: {
						processType: "buildup"
					}
				})
			} else if (typeid === "2-1") {
				this.$router.push({
					name: "change",
					query: {
						processType: "build"
					}
				})
			} else if (typeid === "3-1") {
				this.$router.push({
					name: "detection",
					query: {
						processType: "playground"
					}
				})
			} else if (typeid === "3-2") {
				this.$router.push({
					name: "detection",
					query: {
						processType: "overpass"
					}
				})
			} else if (typeid === "3-3") {
				this.$router.push({
					name: "detection",
					query: {
						processType: "aircraft"
					}
				})
			} else if (typeid === "4-1") {
				this.$router.push({
					name: "classification",
					query: {
						processType: "5"
					}
				})
			} else if (typeid === "4-2") {
				this.$router.push({
					name: "classification",
					query: {
						processType: "15"
					}
				})
			}

		}
	},
}
</script>

<style scoped>
#building {

	width: 96%;
	height: 100%;
	position: absolute;
	background-size: 100% 100%;
}

.allprocess {
	margin-top: 5em;
	width: 60em;
	margin-left: 19em;
}

.typetitle1 {
	font-weight: bold;
	width: 55px;
	height: 128px;
	margin-top: 15px;
	text-align: center;
	color: rgb(107, 107, 107);
	/* background: linear-gradient(294deg, #F19F3C 0%,#f83600 100%); */
	/* background: linear-gradient(303deg, #5BD5FF 0%,#E57474 100%); */
	background-color: rgb(236 245 255);
	border: 0;
}

.typetitle1:hover {
	color: rgb(77, 77, 77);
	/* background: linear-gradient(294deg, #fe8c00 0%,#CA2E00 100%); */
	background-color: rgb(218, 235, 255);
	box-shadow:
		0.1px 0.1px 0.4px rgba(0, 0, 0, 0.025),
		0.4px 0.5px 1px rgba(0, 0, 0, 0.036),
		1.2px 1.3px 1.9px rgba(0, 0, 0, 0.045),
		2.8px 2.9px 3.4px rgba(0, 0, 0, 0.054),
		5.9px 6.3px 6.3px rgba(0, 0, 0, 0.065),
		15px 16px 15px rgba(0, 0, 0, 0.09);
}

.typetitle2 {
	font-weight: bold;
	width: 55px;
	height: 128px;
	margin-top: 15px;
	text-align: center;
	color: rgb(107, 107, 107);
	/* background: linear-gradient(303deg, #9EC982 0%,#5D7E35 100%); */
	background-color: rgb(224, 235, 210);
	border: 0;
}

.typetitle2:hover {
	color: rgb(77, 77, 77);
	/* background: linear-gradient(303deg, #9EC982 0%,#4B662B 100%); */
	background-color: rgb(206, 227, 177);
	box-shadow:
		0.1px 0.1px 0.4px rgba(0, 0, 0, 0.025),
		0.4px 0.5px 1px rgba(0, 0, 0, 0.036),
		1.2px 1.3px 1.9px rgba(0, 0, 0, 0.045),
		2.8px 2.9px 3.4px rgba(0, 0, 0, 0.054),
		5.9px 6.3px 6.3px rgba(0, 0, 0, 0.065),
		15px 16px 15px rgba(0, 0, 0, 0.09);
}

.typetitle3 {
	font-weight: bold;
	width: 55px;
	height: 128px;
	margin-top: 15px;
	text-align: center;
	border: 0;
	color: rgb(107, 107, 107);
	background-color: rgb(254 215 215);
	/* background: linear-gradient(303deg, #5BD5FF 0%,#3C7FF0 100%); */
	/* background: linear-gradient(303deg, #00c6fb 0%,#005bea 100%); */
}

.typetitle3:hover {
	color: rgb(77, 77, 77);
	/* background: linear-gradient(303deg, #00c6fb 0%,#005bea 100%); */
	background-color:  rgb(255, 203, 203);
	border: 0;
	box-shadow:
		0.1px 0.1px 0.4px rgba(0, 0, 0, 0.025),
		0.4px 0.5px 1px rgba(0, 0, 0, 0.036),
		1.2px 1.3px 1.9px rgba(0, 0, 0, 0.045),
		2.8px 2.9px 3.4px rgba(0, 0, 0, 0.054),
		5.9px 6.3px 6.3px rgba(0, 0, 0, 0.065),
		15px 16px 15px rgba(0, 0, 0, 0.09);
}

.typetitle0 {
	font-weight: bold;
	width: 55px;
	height: 128px;
	margin-top: 15px;
	text-align: center;
	color: rgb(107, 107, 107);
	/* background: linear-gradient(150deg, #727ceb -13%, #f976cd 110%); */
	/* background: linear-gradient(150deg, #f976cd -13%, #727ceb 110%); */
	background-color: rgba(236, 223, 247);
	border: 0;
}

.typetitle0:hover {
	color: rgb(77, 77, 77);
	/* background: linear-gradient(150deg, #686FC4  -13%, #f976cd 110%); */
	background-color: rgb(231, 211, 248);
	box-shadow:
		0.1px 0.1px 0.4px rgba(0, 0, 0, 0.025),
		0.4px 0.5px 1px rgba(0, 0, 0, 0.036),
		1.2px 1.3px 1.9px rgba(0, 0, 0, 0.045),
		2.8px 2.9px 3.4px rgba(0, 0, 0, 0.054),
		5.9px 6.3px 6.3px rgba(0, 0, 0, 0.065),
		15px 16px 15px rgba(0, 0, 0, 0.09);
}

.el-col-5 {
	width: 22.7%;
}

.el-col-6 {
	width: 12%;
}

.cla {
	margin-right: 18em;
}


.operate1 {
	color: rgb(107, 107, 107);
	background-color: rgb(236 245 255);
	/* background: linear-gradient(320deg, #F19F3C 0%,#f83600 100%); */
	width: 14em;
	height: 8em;
	border: 0;
	margin-top: 15px;
	margin-left: 6em;
	text-align: center;
}

.operate1:hover {
	color: rgb(77, 77, 77);
	/* background: linear-gradient(320deg, #fe8c00 0%,#CA2E00 100%); */
	background-color: rgb(218, 235, 255);
	border: 0;
	box-shadow:
		0.1px 0.1px 0.4px rgba(0, 0, 0, 0.025),
		0.4px 0.5px 1px rgba(0, 0, 0, 0.036),
		1.2px 1.3px 1.9px rgba(0, 0, 0, 0.045),
		2.8px 2.9px 3.4px rgba(0, 0, 0, 0.054),
		5.9px 6.3px 6.3px rgba(0, 0, 0, 0.065),
		15px 16px 15px rgba(0, 0, 0, 0.09);
}

.operate1:hover .image {
	display: none;
}

.operate1:hover .description {
	display: block;
	font-size: 13px;
	color: rgb(107, 107, 107);
	margin-top: 2em;
}

.operate1:hover .newwork {
	display: block;

	margin-left: 5em;

}

.operate2 {
	color: rgb(107, 107, 107);
	background-color: rgb(224, 235, 210);
	/* background: linear-gradient(303deg, #ACD68C 0%,#779553 100%); */
	width: 14em;
	height: 8em;
	border: 0;
	margin-top: 15px;
	margin-left: 6em;
	text-align: center;
}

.operate2:hover {
	color: rgb(77, 77, 77);
	background-color: rgb(206, 227, 177);
	/* background: linear-gradient(303deg, #9EC982 0%,#4B662B 100%); */
	border: 0;
	box-shadow:
		0.1px 0.1px 0.4px rgba(0, 0, 0, 0.025),
		0.4px 0.5px 1px rgba(0, 0, 0, 0.036),
		1.2px 1.3px 1.9px rgba(0, 0, 0, 0.045),
		2.8px 2.9px 3.4px rgba(0, 0, 0, 0.054),
		5.9px 6.3px 6.3px rgba(0, 0, 0, 0.065),
		15px 16px 15px rgba(0, 0, 0, 0.09);
}

.operate2:hover .image {
	display: none;
}

.operate2:hover .description {
	display: block;
	font-size: 13px;
	color: rgb(107, 107, 107);
	margin-top: 2em;
}

.operate2:hover .newwork {
	display: block;

	margin-left: 5em;

}

.operate3 {
	color: rgb(107, 107, 107);
	background-color: rgb(254 215 215);
	/* background: linear-gradient(303deg, #5BD5FF 0%,#3C7FF0 100%); */
	width: 14em;
	height: 8em;
	border: 0;
	margin-top: 15px;
	margin-left: 6em;
	text-align: center;
}

.operate3:hover {
	color: rgb(77, 77, 77);
	background-color: rgb(255, 203, 203);
	border: 0;
	box-shadow:
		0.1px 0.1px 0.4px rgba(0, 0, 0, 0.025),
		0.4px 0.5px 1px rgba(0, 0, 0, 0.036),
		1.2px 1.3px 1.9px rgba(0, 0, 0, 0.045),
		2.8px 2.9px 3.4px rgba(0, 0, 0, 0.054),
		5.9px 6.3px 6.3px rgba(0, 0, 0, 0.065),
		15px 16px 15px rgba(0, 0, 0, 0.09);
}

.operate3:hover .image {
	display: none;
}

.operate3:hover .description {
	display: block;
	font-size: 13px;
	color: rgb(107, 107, 107);
	margin-top: 2em;
}

.operate3:hover .newwork {
	display: block;

	margin-left: 5em;

}

.operate0 {
	color: rgb(107, 107, 107);
	/* background: linear-gradient(150deg, #727ceb -13%, #f976cd 110%); */
	background-color: rgba(236, 223, 247);
	width: 14em;
	height: 8em;
	border: 0;
	margin-top: 15px;
	margin-left: 6em;
	text-align: center;
}

.operate0:hover {
	color: rgb(77, 77, 77);

	/* background: linear-gradient(150deg, #686FC4  -13%, #f976cd 110%); */
	background-color: rgb(231, 211, 248);
	border: 0;
	box-shadow:
		0.1px 0.1px 0.4px rgba(0, 0, 0, 0.025),
		0.4px 0.5px 1px rgba(0, 0, 0, 0.036),
		1.2px 1.3px 1.9px rgba(0, 0, 0, 0.045),
		2.8px 2.9px 3.4px rgba(0, 0, 0, 0.054),
		5.9px 6.3px 6.3px rgba(0, 0, 0, 0.065),
		15px 16px 15px rgba(0, 0, 0, 0.09);
}

.operate0:hover .image {
	display: none;
}

.operate0:hover .description {
	display: block;
	font-size: 13px;
	color: rgb(107, 107, 107);
	margin-top: 2em;
}

.operate0:hover .newwork {
	display: block;

	margin-left: 5em;

}

.operate {
	color: rgb(252, 254, 253);
	background-color: rgb(229, 116, 116);

	width: 14em;
	height: 8em;
	border: 0;
	margin-top: 15px;
	margin-left: 6em;
	text-align: center;
}


.description {
	display: none;

}


.newwork {
	display: none;
	color: rgb(77, 77, 77);
}

.newwork:hover {

	color: rgb(0, 156, 247);
}

.title {
	margin-left: 0em;
	font-size: large;
	font-weight: bold;
}

.image {
	width: 3em;
	display: block;
	margin-left: 40%;
	margin-top: 2em;
}

.bottom {
	margin-top: 13px;
	line-height: 12px;
}

type-item .team {
	margin-top: 0em;
	margin-left: 20%;
}

.team-item {
	margin-left: 12%;
	position: relative;
}

.type-item {
	margin-left: 11%;
	position: absolute;
	z-index: 100;
}



.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}

.clearfix:after {
	clear: both
}

.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}

.clearfix:after {
	clear: both
}

.box-card {
	width: 480px;
}







.erow {
	margin-bottom: 20px;

}

.ecol {
	border-radius: 4px;
}

.bg-purple-dark {
	background: #99a9bf;
}

.bg-purple {
	background: #d3dce6;
}

.bg-purple-light {
	background: #e5e9f2;
}

.grid-content {
	border-radius: 4px;
	min-height: 36px;
}

.row-bg {
	padding: 10px 0;
	background-color: #f9fafc;
}
</style>
