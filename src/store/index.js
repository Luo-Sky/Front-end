import Vue from 'vue'

import Vuex from 'vuex'

const actions = {
	//也可以越过actions直接到mutations

}

const mutations = {
	//改变第一张图片的URL
	CHANGE_IMAGEURL(state, value) {
		state.firstImageURL = value
		state.resultImageURL = []
	},
	//改变时相1图片的URL
	CHANGE_OLDTIMEURL(state, value) {
		state.oldTimeImageURL = value
		state.resultImageURL = []
	},
	//改变时相2图片的URL	
	CHANGE_NEWTIMEURL(state, value) {
		state.newTimeImageURL = value
		state.resultImageURL = []
	},

	OBJEXTRACT(state, value) {
		state.isOperated = true
	},



	//当路由发生修改时，所有变量需要进行初始化
	CHANGE_ROUTER(state, value) {
		state.isOperated = false,
		state.isBatchProcessingOperated=false,
			state.firstImageURL = "",
			state.resultImageURL = [],
			state.historyResultImageURL = [],
			state.batchProcessingResultImageURL = [],
			state.oldTimeImageURL = "",
			state.newTimeImageURL = "",
			state.file = null,
			state.oldTimeFile = null,
			state.newTimeFile = null,
			state.oldTimeFileType = null,
			state.newTimeFileType = null,
			state.files= null, //files用于存储文件夹的文件本体
			state.filesList=[], //filesList用于存储文件夹文件的相关属性
			state.isDrawingRect = false,
			state.clickCancelRectTimes = 0,
			state.isDrawn = false,
			state.imgWidth = 0,
			state.imgHeight = 0,
			state.imgWidth1 = 0,
			state.imgHeight1 = 0,
			state.imgWidth2 = 0,
			state.imgHeight2 = 0,
			state.img0 = null,
			state.tiff0 = null,
			state.img1 = null,
			state.tiff1 = null,
			state.img2 = null,
			state.tiff2 = null,
			state.isImgLoading = false,
			state.loadingMsg = "加载图片中...",
			state.rectColor = "rgb(255,255,0)",
			state.drawnRectParams = {
				top: 0,
				left: 0,
				width: 0,
				height: 0
			},
			state.flag0 = null,
			state.flag1 = null,
			state.flag2 = null,
			state.historyId = null,
			state.batchProcessingFiles0=[],
			state.batchProcessingFiles1=[],
			state.batchProcessingFiles2=[],
			state.isBatchProcessingMode=false,
			state.upLoadProgress=0,
			state.showProcess=false
	},


}

const state = {
	serverURL: "http://faye.nat300.top",
	isOperated: false,//判断是否已经做过处理
	isBatchProcessingOperated:false,//判断是否已经做过批处理
	firstImageURL: "", //原图的URL
	resultImageURL: [], //结果图
	batchProcessingResultImageURL:[],
	historyResultImageURL: [], //历史结果图
	oldTimeImageURL: "", //时相1图片的URL
	newTimeImageURL: "", //时相2图片的URL
	file: null, //选择的文件流，目前暂时这样设置，
	fileType: null, //文件的类型
	oldTimeFile: null, //选择的文件流，目前暂时这样设置，
	newTimeFile: null, //选择的文件流，目前暂时这样设置，
	oldTimeFileType: null,
	newTimeFileType: null,
	files: null, //files用于存储文件夹的文件本体
	filesList: [], //filesList用于存储文件夹文件的相关属性
	isDrawingRect: false,//判断是否正在画框
	clickCancelRectTimes: 0,//判断是否按下了撤销框选，每按一次则加一次
	isDrawn: false,//判断是否已经画了框
	imgWidth: 0,//非变化检测时原图宽度
	imgHeight: 0,//非变化检测时原图高度
	imgWidth1: 0,//变化检测时时相1的宽度
	imgHeight1: 0,//变化检测时时相1的高度
	imgWidth2: 0,//变化检测时时相2的宽度
	imgHeight2: 0,//变化检测时时相2的高度
	img0: null,//存储非变化检测时的原图
	tiff0: null,//存储非变化检测时的原图tiff形式
	img1: null,//存储变化检测时时相1的原图
	tiff1: null,//存储变化检测时时相1的原图tiff形式
	img2: null,//存储变化检测时时相2的原图
	tiff2: null,//存储变化检测时时相2的原图tiff形式
	isImgLoading: false,//判断图片框是否正在加载中
	loadingMsg: "加载图片中...",
	rectColor: "rgb(255,255,0)",//框图颜色
	drawnRectParams: {//画出框的参数
		top: 0,
		left: 0,
		width: 0,
		height: 0
	},
	flag0: null,//存储当前从后端拿到的图片的id
	flag1: null,
	flag2: null,
	historyId: null,//存储该条记录的id
	
	batchProcessingFiles0:[],
	batchProcessingFiles1:[],
	batchProcessingFiles2:[],
	isBatchProcessingMode:false,
	upLoadProgress:0,
	showProcess:false,
}

const getters = {

}

Vue.use(Vuex)
export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters
})
