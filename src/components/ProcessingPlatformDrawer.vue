<template>
	<!-- 目标提取 目标监测 地物分类相同 因此只在目标提取中做注释 -->
	<div>
		<!-- <el-button type="button" @click="dialog = true">打开操作面板</el-button> -->
		<div class="bar-title" @click="dialog = true" v-show="!dialog">
			<p>打开操作面板 ↑</p>
		</div>

		<el-drawer title="目标提取" :visible.sync="dialog" direction="ltr" custom-class="demo-drawer" ref="drawer"
			:modal="false" :wrapperClosable="false" :append-to-body="true">
			<div class="demo-drawer__content">
				<el-form :model="form">
					<el-form-item label="活动名称" :label-width="formLabelWidth">
						<el-input v-model="form.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="活动区域" :label-width="formLabelWidth">
						<el-select v-model="form.region" placeholder="请选择活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
				</el-form>

				<div class="demo-drawer__footer">

					<div style="display: inline-block;float: left;">
						<SelectImageButton class="SIB" btnName="选择影像"></SelectImageButton>

					</div>
					<el-button style="margin-left: 10px; width: 98px;" @click="ExtractObj">提取
					</el-button>
					<el-button style="margin-left: 10px; width: 98px;" @click="GetSlice">获得切片
					</el-button>
					<hr>
					<el-radio-group v-model="radio" :disabled="!$store.state.isOperated">
						<el-radio :label="1" style="margin-left: 10px;">仅原图</el-radio>
						<el-radio :label="2">仅结果图</el-radio>
						<el-radio :label="3">全部显示</el-radio>
						<el-radio :label="4">叠加显示</el-radio>
					</el-radio-group>
				</div>
				<div class="block" style="margin-top: 15px;margin-left: 10px;" v-show="$store.state.showOverlay">
					<span class="">结果图透明度</span>
					<el-slider v-model="opacityVal" style="width: 300px;"></el-slider>
				</div>
				<el-switch v-model="isSync" style="margin-top: 15px;margin-left: 10px;"
					v-show="$store.state.showBothImg" active-text="同步操作">
				</el-switch>
			</div>

		</el-drawer>
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>您还没有选择影像</span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import SelectImageButton from './SelectImageButton.vue'
	import axios from 'axios'
	export default {
		props: ['operationType'],
		components: {
			SelectImageButton
		},
		data() {
			return {
				dialog: false,
				loading: false,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '80px',
				radio: 1,
				dialogVisible: false,
				opacityVal: 100,
				isSync: false,
				syncParams: {

				}
			};
		},
		methods: {
			cancelForm() {
				this.loading = false;
				this.dialog = false;
			},
			ExtractObj() {
				if (!this.$store.state.firstImageURL) {
					this.dialogVisible = true
					return
				}
				this.radio = 3
				this.$store.commit('OBJEXTRACT')
				this.$store.commit('SHOW_BOTH_IMG')

				
			},
			GetSlice(){
				this.$store.state.firstImageURL="http://localhost:9000/image/72849a70a86c11ec9b466bc463015e46/{z}/{x}/{y}"
			}

		},
		watch: {
			radio(newValue) {
				if (newValue === 1) {
					this.$store.commit('SHOW_FIRST_ONLY')
				} else if (newValue === 2) {
					this.$store.commit('SHOW_SECOND_ONLY')
				} else if (newValue === 3) {
					this.$store.commit('SHOW_BOTH_IMG')
				} else {
					this.$store.commit('SHOW_OVERLAY')
				}
			},
			opacityVal(newValue) {
				this.$store.commit('CHANGE_OVERLAY_OPACITY', newValue / 100)
			},
			isSync(newValue) {
				this.$store.commit('SYNC_OPERATION', newValue)

			}

		}
	}
</script>

<style scoped>
	.el-drawer__wrapper {
		width: 450px;
	}


	.bar-title {
		cursor: pointer;
		margin: 0;
		background-color: rgba(84, 92, 100, 1.0);
		border: 2px solid rgba(52, 57, 62, 1.0);
		border-bottom: 0;
		border-top-right-radius: 14px;
		border-top-left-radius: 14px;
		position: absolute;
		left: -68px;
		top: 50%;
		width: 150px;
		height: 75px;
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
		text-align: center;
		font-weight: 600;
		font-style: normal;
		font-size: 16px;
		color: #ffd04b;
		transition-property: all;
		transition-duration: 0.08S;
		transition-timing-function: linear;
	}

	.bar-title:hover {
		background-color: rgba(84, 92, 100, 1.0);
		border-top-right-radius: 14px;
		border-top-left-radius: 14px;
		left: -70px;
		top: 50%;
		width: 160px;
		height: 80px;
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
		text-align: center;
		font-weight: 600;
		font-style: normal;
		font-size: 17px;
		color: #73c7ff;
	}

	p {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
	}

	.SIB {
		margin-left: 10px;
	}
</style>
