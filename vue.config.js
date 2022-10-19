module.exports = {
	lintOnSave:false,
	//开启代理服务器,方式1
	/* devServer:{
		proxy:'http://localhost:5000'
	} */
	//开启代理服务器,方式2
	devServer:{
		disableHostCheck: true
	}
}