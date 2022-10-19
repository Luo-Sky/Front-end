<template>
    <div>
        <!-- v-model="search" -->

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
            <el-col :span="18">
                <div style="background-color: white;width: 100%;height: 40em;">
                    <!-- <div style="background-color: aquamarine;width: 100%;height: 2em;"></div> -->
                    <el-card style="background-color: white;" shadow="hover">

                        <el-row>
                            <el-col :span="4">
                                <span
                                    style="margin-left: 10px;color:#505050;font-size:200%;font-weight: bold;">项目列表</span>
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

                            <el-col :span="16">
                                <div id="searchdiv">
                                    <el-button style="float: right; margin-right: 3em;" @click="projectsearch()"
                                        type="primary" icon="el-icon-search" size="small" circle>
                                    </el-button>
                                    <el-input style="float: right; width: 25em; margin-right:1em;margin-left: 5%;"
                                        v-model="searchcontent" size="mini" placeholder="输入关键字搜索" />
                                </div>
                            </el-col>
                        </el-row>

                        <div style="background-color:#969696;width: 100%;height: 1px;margin-top: 25px;"></div>

                        <el-table class="projecttable" :data="tableData" :row-style="{ height: '10em' }"
                            @sort-change="sortChange" :default-sort="{ prop: 'date', order: 'descending' }"
                            style="border-collapse:separate !important; border-spacing:50px;" tooltip-effect="dark">
                            <!-- <el-table-column type="selection" width="55" ></el-table-column>          -->
                            <!-- 序号日期名称描述 -->
                            <el-table-column min-width="24%" align="center" label="序号" type="index" width="80">
                            </el-table-column>

                            <!-- 封面的显示 -->
                            <el-table-column min-width="24%" align="center" prop="img" label="项目封面" width="150">
                                <template slot-scope="scope">
                                    <el-popover placement="top-start" trigger="hover">
                                        <!--trigger属性值：hover、click、focus 和 manual-->
                                        <a :href="scope.row.img" target="_blank" title="查看最大化图片"><img
                                                :src="scope.row.img" style="width: 300px;height: 300px" /></a>
                                        <img slot="reference" :src="scope.row.img"
                                            style="width: 100px;height: 100px; cursor:pointer" />
                                    </el-popover>
                                </template>
                            </el-table-column>


                            <el-table-column min-width="24%" align="center" prop="createTime" label="创建时间" width="180"
                                sortable='custom'>
                            </el-table-column>


                            <!-- name address -->
                            <el-table-column min-width="24%" align="center" prop="title" label="名称" width="150">
                                <template slot-scope="scope">
                                    <input type="text" v-model="scope.row.title" v-show="scope.row.iseditor" />
                                    <span v-show="!scope.row.iseditor">{{ scope.row.title }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column min-width="24%" align="center" prop="description" label="描述" width="150">
                                <template slot-scope="scope">
                                    <input type="text" v-model="scope.row.description" v-show="scope.row.iseditor" />
                                    <span v-show="!scope.row.iseditor">{{ scope.row.description }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column min-width="24%" prop="detail" align="center" label="项目内容" width="180"
                                :data="moredetail">
                                <template slot-scope="scope">
                                    <!-- {{scope.row.title}} -->
                                    <el-link icon="el-icon-info" @click="todetail(scope.row, scope.$index)">查看项目内容
                                    </el-link>
                                </template>
                            </el-table-column>
                            <el-table-column min-width="24%" align="center" label="操作">
                                <!-- align="right" -->
                                <template slot-scope="scope">
                                    <!--单个编辑按钮-->
                                    <el-button @click="projectedit(scope.row, scope)" type="primary" icon="el-icon-edit"
                                        size="small" circle></el-button>


                                    <el-button @click="projectsave(scope.row)" type="warning"
                                        icon=" el-icon-document-checked" size="small" circle></el-button>

                                    <el-button @click="projectdelete(scope.$index, tableData, scope.row)" type="danger"
                                        icon="el-icon-delete" size="small" circle></el-button>



                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination style="margin-top: 3px;" @size-change="sizeChange"
                            @current-change="currentChange" :current-page="page" :page-size="size"
                            :page-sizes="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>

                    </el-card>

                </div>

            </el-col>


            <el-col :span="3"></el-col>
        </el-row>







    </div>

</template>
<script>
let id = 1000;
import service from '@/userinfo/request';
import axios from 'axios'
export default {

    name: "Search",
    beforeRouteEnter: (to, from, next) => {

        let islogin = localStorage.getItem("isLogin")
        if (!islogin) {

            next((vm) => { vm.$message("请先登录"), vm.$router.push({ path: "/Login" }); });
        }
        next()

    },
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
            tempData: [],
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
                description: '',
                img: ''
            },
            userID: "",
            projectID: "",

            page: 1, //第几页
            size: 3, //一页多少条
            total: 0, //总条目数
            pageSizes: [3, 5, 10, 20, 50, 100, 200, 300, 400, 500, 1000], //可选择的一页多少条
            tableData: [], //表格绑定的数据
            allData: [],
            moredetail: "查看详情",
            searchcontent: ""

        };
    },
    methods: {
        dateData(property, bol) { //property是你需要排序传入的key,bol为true时是升序，false为降序
            return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                if (bol) {
                    // 升序
                    return Date.parse(value1) - Date.parse(value2);
                } else {
                    // 降序
                    return Date.parse(value2) - Date.parse(value1)
                }

            }
        },
        sortChange(column) {
            // console.log("column", column)
            // console.log("this.allData[column.prop]", this.allData)

            // this.pageIndex = 1; // 排序后返回第一页
            if (column.order === "descending") {
                this.tempData.sort(this.dateData("createTime", true))
                this.getTabelData()
                // this.tableData.sort((a, b) => b[column.prop] - a[column.prop]);
            } else if (column.order === "ascending") {
                this.tempData.sort(this.dateData("createTime", false))
                this.getTabelData()
                // this.tableData.sort((a, b) => a[column.prop] - b[column.prop]);
            }
        },


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









        // 点击多选

        handleSelectionChange(val) {

            this.multipleSelection = val;

            this.batchPassArr = [] //每次点击需清空原本数组的内容

            this.multipleSelection.map(item => { //遍历数组，把id存进自定义的数组里

                this.batchPassArr.push(item.id)

            })

            this.batchPassArr = this.batchPassArr.join(',')

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
                                that.getAlldata()
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
        projectsearch() {
            service

                .get(this.$store.state.serverURL + "/projects",
                    {
                        params: {
                            userId: this.userID,
                            pageSize: -1,
                            pageNum: -1,
                            search: this.searchcontent,
                        }
                    }
                )

                .then((res) => {

                    this.allData = res.data.records

                    if (res.code === '100') {

                    } else {
                        // alert("您输入的用户名或密码错误！");
                    }
                    // (this.allData,"iseditor","false")
                    this.allData.forEach((item, index) => {
                        // item.select = false //这是错误写法
                        this.$set(item, 'iseditor', false); //正确姿势
                    },
                    )

                    this.getTabelData2()
                });
        },
        projectedit(row) {

            row.iseditor = true;
        },
        projectsave(row) {
            row.iseditor = false;
            // console.log("row", row)
            service
                .put(this.$store.state.serverURL + "/projects", {
                    id: row.id,
                    title: row.title,
                    description: row.description,
                }
                )
                .then((res) => {
                    if (res.code === '0') {
                        this.$message("修改成功")
                    } else {
                        this.$message("修改失败")
                    }
                });
        },
        // 单个删除
        projectdelete(index, rows, row) {
            let _this = this;

            _this.$confirm('删除操作不可逆，确定删除该项目吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {


                rows.splice(index, 1);

                service
                    .delete(_this.$store.state.serverURL + "/projects/" + row.id,
                        {
                            params: {
                                id: row.id,
                            }
                        }

                    )
                    .then((res) => {
                        if (res.code === '0') {



                            service.get(_this.$store.state.serverURL + "/projects",
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
                                        _this.getAlldata()

                                        this.dialogFormVisible = false
                                    }
                                    else {
                                        this.$message({
                                            showClose: true,
                                            message: '繁忙中...',
                                            type: 'error',
                                            duration: 3000
                                        });
                                    }

                                });

                            _this.$message({
                                type: 'success',
                                message: '删除成功'
                            });

                        } else {
                            _this.$message({
                                type: 'error',
                                message: '出错了请重试'
                            });
                        }
                    });





            }).catch(() => {
                //取消操作
                _this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },

        todetail(index) {
            localStorage.setItem("proid", index.id)
            this.$router.push({ path: "/history" });
        },
        getAlldata() {
            //获取所有project
            service

                .get(this.$store.state.serverURL + "/projects",
                    {
                        params: {
                            userId: this.userID,
                            pageSize: -1,
                            pageNum: -1,
                        }
                    }
                )
                .then((res) => {

                    // console.log("res.data.records", res.data.records)
                    this.allData = res.data.records

                    localStorage.setItem("projectInfo", JSON.stringify(res.data.records));
                    if (res.code === '100') {

                    } else {
                        // alert("您输入的用户名或密码错误！");
                    }
                    // (this.allData,"iseditor","false")
                    this.allData.forEach((item, index) => {

                        this.$set(item, 'iseditor', false);
                    },
                    )
                    this.tempData = this.allData
                    this.getTabelData2()
                });

        },


        //获取表格数据，自行分页(slice)
        getTabelData() {
            let data = JSON.parse(JSON.stringify(this.tempData))
            // console.log('leixing', typeof (data))//data需要object
            this.tableData = data.splice(
                (this.page - 1) * this.size,
                this.size
            );
            // console.log('tabledata', this.tableData)//data需要object
            this.total = this.tempData.length
        },


        //获取表格数据，自行分页（splice）
        getTabelData2() {

            // console.log('获取表格数据', this.allData)
            let data = JSON.parse(JSON.stringify(this.allData))
            // console.log('leixing', typeof (data))//data需要object
            this.tableData = data.splice(
                (this.page - 1) * this.size,
                this.size
            );
            // console.log('tabledata', this.tableData)//data需要object
            this.total = this.allData.length
            console.log(this.total)
        },
        //page改变时的回调函数，参数为当前页码
        currentChange(val) {
            // console.log("翻页，当前为第几页", val);
            this.page = val;
            this.getTabelData2();
        },
        //size改变时回调的函数，参数为当前的size
        sizeChange(val) {
            // console.log("改变每页多少条，当前一页多少条数据", val);
            this.size = val;
            this.page = 1;
            this.getTabelData2();
        },

        append(data) {
            const newChild = { id: id++, label: 'testtest', children: [] };
            if (!data.children) {
                this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },

        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },

        renderContent(h, { node, data, store }) {
            return (
                <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span>
                        <el-button size="mini" type="text" on-click={() => this.append(data)}>Append</el-button>
                        <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>Delete</el-button>
                    </span>
                </span>);
        }



    },

    created() {
        this.userID = localStorage.getItem("ID")
        this.getAlldata()
        this.allData = JSON.parse(JSON.stringify(localStorage.getItem('projectInfo')))
        // this.allData=localStorage.getItem('projectInfo')
        // console.log('create',localStorage.getItem('projectInfo'))
        console.log(this.allData)

    },
};
</script>

<style >
#searchdiv {
    /* left: 78em; */
    /* position: relative; */
    margin-top: 8px;
    margin-left: 5em;
}

.cell-space /deep/ .el-table .el-table__body-wrapper .el-table__body {
    border-collapse: separate !important;
    border-spacing: 25px;
}


.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}

.projecttable {
    /* width: 80%;
    left: 5em; */
    margin-top: 4em;
}

.hide .el-upload--picture-card {
    display: none !important;
    ;
}
</style>
