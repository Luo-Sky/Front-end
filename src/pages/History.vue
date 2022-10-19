<template>
    <div>
        <!-- v-model="search" -->
       
        <el-row>
            <el-col :span="3">
                <div style="width:100%;height: 5em;"></div>
            </el-col>
            <el-col :span="18">
                <div style="background-color: white;width: 100%;height: 40em;">
                    <!-- <div style="background-color: aquamarine;width: 100%;height: 2em;"></div> -->
                    <el-card style="background-color: white;" shadow="hover">

                        <el-row>

                        </el-row>
                        <el-row>
                            <el-col :span="4">
                             <el-button type="text" style="float: left;;color: black; font-size: large;"><i class="el-icon-back"
                @click="goBack()"></i></el-button>
                                <span
                                    style="margin-left: 10px;color: #505050;font-size:200%;font-weight: bold;">操作记录</span>
                            </el-col>


                            <el-col :span="19">
                                <div id="searchdiv">
                                   

                       
                                    <el-input style="float: right; width: 25em; margin-right:1em;"
                                        v-model="searchcontent" size="mini" placeholder="输入关键字搜索" />


                                </div>
                            </el-col>
                        </el-row>
 <div style="background-color:#969696;width: 100%;height: 1px;margin-top: 25px;"></div>
                        <el-table class="projecttable" @filter-change="filterChange" :data="tables"
                            @sort-change="sortChange" :row-style="{ height: '20px' }"
                            :default-sort="{ prop: 'date', order: 'descending' }">
                            <!-- 序号日期名称描述 -->
                            <el-table-column min-width="24%" align="center" label="序号" type="index" width="50">
                            </el-table-column>

                            <!-- :filter-method="filterHandler" -->
                            <el-table-column column-key="type" :filters="[
                                { text: '变化检测', value: '变化检测' },
                                { text: '目标提取', value: '目标提取' },
                                { text: '目标检测', value: '目标检测' },
                                { text: '地物分类', value: '地物分类' },
                            ]" :filter-multiple="false" min-width="24%" align="center" prop="type" label="类型"
                                width="180">
                            </el-table-column>


                            <el-table-column min-width="24%" align="center" prop="startTime" label="创建时间" width="180"
                                sortable='custom'>
                            </el-table-column>
                            <!-- name address -->
                            <el-table-column min-width="24%" align="center" prop="title" label="名称" width="180">
                                <template slot-scope="scope">
                                    <input type="text" v-model="scope.row.title" v-show="scope.row.iseditor" />
                                    <span v-show="!scope.row.iseditor">{{ scope.row.title }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column min-width="24%" prop="detail" align="center" label="项目内容"
                                :data="moredetail">
                                <template slot-scope="scope">

                                    <el-link icon="el-icon-info" @click="todetail(scope.row, scope.$index)">查看详细内容
                                    </el-link>
                                </template>
                            </el-table-column>
                            <el-table-column min-width="24%" align="center" label="操作">
                                <!-- align="right" -->
                                <template slot-scope="scope">
                                    <!--单个编辑按钮-->
                                    <el-button @click="hisedit(scope.row, scope)" type="primary" icon="el-icon-edit"
                                        size="small" circle></el-button>
                                    <!-- <el-button size="mini" type="warning" @click="edit(scope.row, scope)">编辑</el-button> -->

                                    <el-button @click="hissave(scope.row)" type="warning"
                                        icon=" el-icon-document-checked" size="small" circle></el-button>
                                    <!-- <el-button size="mini" type="danger" @click="save(scope.row)">保存</el-button> -->

                                    <el-button @click="hisdelete(scope.$index, tableData, scope.row)" type="danger"
                                        icon="el-icon-delete" size="small" circle></el-button>


                                    <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">Delete -->
                                    <!-- </el-button> -->
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination style="margin-top: 3px;"  @size-change="sizeChange" @current-change="currentChange" :current-page="page"
                            :page-size="size" :page-sizes="pageSizes" layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>


                    </el-card>
                </div>

            </el-col>
        </el-row>



    </div>

</template>
<script>
let id = 1000;

import axios from 'axios'
import service from '@/userinfo/request';
export default {

    name: "Search",

    data() {

        return {
            userID: "",
            projectID: "",

            page: 1, //第几页
            size: 5, //一页多少条
            total: 0, //总条目数
            pageSizes: [3, 5, 10, 20, 50, 100, 200, 300, 400, 500, 1000], //可选择的一页多少条
            tableData: [], //表格绑定的数据
            tempData: [],
            allData: [],
            isfilter: 0,
            moredetail: "查看详情",
            searchcontent: "",

            value: ''
        };
    },
    computed: {
        // 模糊搜索
        tables() {
            const search = this.searchcontent;
            if (search) {
                if (this.isfilter === 0) {
                    return this.allData.filter(data => {
                        return Object.keys(data).some(key => {
                            return String(data[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }
                else if (this.isfilter === 1) {
                    return this.tempData.filter(data => {
                        return Object.keys(data).some(key => {
                            return String(data[key]).toLowerCase().indexOf(search) > -1
                        })
                    })
                }

            }
            return this.tableData
        }
    },


    // },
    methods: {
        goBack() {
            this.$router.go(-1);//返回上一层
        },
        filterChange(filters) {
            // console.log("选择", filters.type)
            if (filters.type.length === 0) {
                this.getTabelData2()
            } else {
                for (const key in filters) {
                    this.tempData = this.allData.filter((item) => item.type === filters[key][0])
                    // console.log("change", this.allData)
                    this.getTabelData()

                }
            }

        },

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
                this.tempData.sort(this.dateData("startTime", true))
                this.getTabelData()
                // this.tableData.sort((a, b) => b[column.prop] - a[column.prop]);
            } else if (column.order === "ascending") {
                this.tempData.sort(this.dateData("startTime", false))
                this.getTabelData()
                // this.tableData.sort((a, b) => a[column.prop] - b[column.prop]);
            }
        },
        //    :data="tableData.filter(data => !searchcontent || data.title.toLowerCase().includes(searchcontent.toLowerCase()))"
        filterHandler(value, row, column) {

            const property = column["property"];
            return row[property] === value;
        },
        hisedit(row) {

            row.iseditor = true;
        },
        hissave(row) {
            let _this = this
            row.iseditor = false;
            if (row.typeid === "3") {
                service
                    .put("http://faye.nat300.top/oeHistorys",
                        {
                            id: row.id,
                            title: row.title,
                            choose: row.choose
                        }

                    )
                    .then((res) => {
                        if (res.code === '0') {
                            _this.$message({
                                type: 'success',
                                message: '保存成功'
                            });
                        } else {
                            _this.$message({
                                type: 'error',
                                message: '出错了请重试'
                            });
                        }
                    });
            } else if (row.typeid === "2") {
                service
                    .put("http://faye.nat300.top/odHistorys",
                        {
                            id: row.id,
                            title: row.title,
                            choose: row.choose
                        }

                    )
                    .then((res) => {
                        if (res.code === '0') {
                            _this.$message({
                                type: 'success',
                                message: '保存成功'
                            });
                        } else {
                            _this.$message({
                                type: 'error',
                                message: '出错了请重试'
                            });
                        }
                    });
            } else if (row.typeid === "1") {
                service
                    .put("http://faye.nat300.top/ocHistorys",
                        {
                            id: row.id,
                            title: row.title,
                            choose: row.choose
                        }

                    )
                    .then((res) => {
                        if (res.code === '0') {
                            _this.$message({
                                type: 'success',
                                message: '保存成功'
                            });
                        } else {
                            _this.$message({
                                type: 'error',
                                message: '出错了请重试'
                            });
                        }
                    });
            } else if (row.typeid === "0") {
                service
                    .put("http://faye.nat300.top/cdHistorys",
                        {
                            id: row.id,
                            title: row.title,
                            choose: row.choose
                        }

                    )
                    .then((res) => {

                        if (res.code === '0') {
                            _this.$message({
                                type: 'success',
                                message: '保存成功'
                            });
                        } else {
                            _this.$message({
                                type: 'error',
                                message: '出错了请重试'
                            });
                        }
                    });
            }
        },
        // 单个删除要判断类型
        hisdelete(index, rows, row) {
            let _this = this;

            _this.$confirm('删除操作不可逆，确定删除该记录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {


                rows.splice(index, 1);
                if (row.typeid === "3") {
                    service
                        .delete("http://faye.nat300.top/oeHistorys/" + row.id,
                            {
                                params: {
                                    id: row.id,
                                }
                            }

                        )
                        .then((res) => {
                            if (res.code === '0') {

                                this.getalldata()
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
                } else if (row.typeid === "2") {
                    service
                        .delete("http://faye.nat300.top/odHistorys/" + row.id,
                            {
                                params: {
                                    id: row.id,
                                }
                            }

                        )
                        .then((res) => {
                            if (res.code === '0') {
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
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
                } else if (row.typeid === "1") {
                    service
                        .delete("http://faye.nat300.top/ocHistorys/" + row.id,
                            {
                                params: {
                                    id: row.id,
                                }
                            }

                        )
                        .then((res) => {
                            if (res.code === '0') {
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
                } else if (row.typeid === "0") {
                    service
                        .delete("http://faye.nat300.top/cdHistorys/" + row.id,
                            {
                                params: {
                                    id: row.id,
                                }
                            }

                        )
                        .then((res) => {
                            if (res.code === '0') {
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
                }


            }).catch(() => {
                //取消操作

                _this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },

        todetail(index) {
            this.$store.commit('CHANGE_ROUTER')
			console.log(index)
            service
                .get("http://faye.nat300.top/boxSelections?pageSize=-1&pageNum=-1&historyId=" + index.id + "&type=" + index.typeid)
                .then((res) => {
                    console.log('res',res)
                    const detailtype = JSON.parse(res.data.records[0].result).type

                    if (detailtype === "road_extraction") {

                        this.$router.push({
                            name: 'extract',
                            params: {
                                sourceImg: index.sourceImg,
                                records: res.data.records,
                            },
                            query: {
                                processType: "road"
                            }
                        })
                    } else if (detailtype === " water_extraction") {
                        this.$router.push({
                            name: 'extract',
                            params: {
                                sourceImg: index.sourceImg,
                                records: res.data.records,
                            },
                            query: {
                                processType: "water"
                            }
                        })
                    } else if (detailtype === "buildup_extraction") {
                        this.$router.push({
                            name: 'extract',
                            params: {
                                sourceImg: index.sourceImg,
                                records: res.data.records,
                                query: {
                                    processType: "buildup"
                                }
                            }
                        })
                    } else if (detailtype === "change_detection") {
                        this.$router.push({
                            name: 'change',
                            params: {
                                sourceImg1: index.sourceImg1,
                                sourceImg2: index.sourceImg2,
                                records: res.data.records,
                            },
                            query: {
                                processType: "build"
                            }
                        })
                    } else if (detailtype === "object_detection_playground") {
                        this.$router.push({
                            name: 'detection',
                            params: {
                                sourceImg: index.sourceImg,
                                records: res.data.records,
                            },
                            query: {
                                processType: "playground"
                            }
                        })
                    } else if (detailtype === "object_detection_overpass") {
                        this.$router.push({
                            name: 'detection',
                            params: {
                                sourceImg: index.sourceImg,
                                records: res.data.records,
                            },
                            query: {
                                processType: "overpass"
                            }
                        })
                    } else if (detailtype === "object_detection_aircraft") {
                        this.$router.push({
                            name: 'detection',
                            params: {
                                sourceImg: index.sourceImg,
                                records: res.data.records,
                            },
                            query: {
                                processType: "aircraft"
                            }
                        })
                    } else if (detailtype === "segmentation_5classes") {
                        this.$router.push({
                            name: 'classification',
                            params: {
                                sourceImg: index.sourceImg,
                                records: res.data.records,
                            },
                            query: {
                                processType: "5"
                            }
                        })
                    } else if (detailtype === "segmentation_15classes") {
                        this.$router.push({
                            name: 'classification',
                            params: {
                                sourceImg: index.sourceImg,
                                records: res.data.records,
                            },
                            query: {
                                processType: "15"
                            }
                        })
                    }


                })
        },

        //获取表格数据，自行分页(slice)
        getTabelData() {
            this.isfilter = 1
            // console.log('获取表格数据', this.allData)
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
            this.isfilter = 0
            // console.log('获取表格数据', this.allData)
            let data = JSON.parse(JSON.stringify(this.allData))
            // console.log('leixing', typeof (data))//data需要object
            this.tableData = data.splice(
                (this.page - 1) * this.size,
                this.size
            );
            // console.log('tabledata', this.tableData)//data需要object
            this.total = this.allData.length
        },
        //page改变时的回调函数，参数为当前页码
        currentChange(val) {
            // console.log("翻页，当前为第几页", val);
            this.page = val;
            if (this.isfilter === 0) {
                this.getTabelData2();
            } else if (this.isfilter === 1) {
                this.getTabelData();
            }
        },
        //size改变时回调的函数，参数为当前的size
        sizeChange(val) {
            // console.log("改变每页多少条，当前一页多少条数据", val);
            this.size = val;
            this.page = 1;
            if (this.isfilter === 0) {
                this.getTabelData2();
            } else if (this.isfilter === 1) {
                this.getTabelData();
            }

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
        },
        getoedata() {
            return service
                .get("http://faye.nat300.top/oeHistorys?projectId="
                    + this.projectID + "&pageSize=-1&pageNum=-1",
                )
        },
        getoddata() {
            return service
                .get("http://faye.nat300.top/odHistorys?projectId="
                    + this.projectID + "&pageSize=-1&pageNum=-1",
                )
        },
        getcddata() {
            return service
                .get("http://faye.nat300.top/cdHistorys?projectId="
                    + this.projectID + "&pageSize=-1&pageNum=-1",
                )
        },
        getocdata() {
            return service
                .get("http://faye.nat300.top/ocHistorys?projectId="
                    + this.projectID + "&pageSize=-1&pageNum=-1",
                )
        },
        getalldata() {
            var _this = this
            _this.$axios.all([_this.getoedata()
                , _this.getoddata(), _this.getocdata(), _this.getcddata()]
            ).then(

                _this.$axios.spread(function (oehis, odhis, ochis, cdhis) {
                    // console.log(odhis.data.records.concat(oehis.data.records), odhis)//会返回3个对象，在控制台中显示
                    odhis.data.records.forEach((item, index) => {

                        _this.$set(item, 'iseditor', false);
                        _this.$set(item, 'typeid', "2");
                        _this.$set(item, 'type', "目标检测");

                    })
                    oehis.data.records.forEach((item, index) => {
                        _this.$set(item, 'typeid', "3");
                        _this.$set(item, 'type', "目标提取");
                        _this.$set(item, 'iseditor', false);
                    })
                    ochis.data.records.forEach((item, index) => {
                        _this.$set(item, 'typeid', "1");
                        _this.$set(item, 'type', "地物分类");
                        _this.$set(item, 'iseditor', false);
                    })
                    cdhis.data.records.forEach((item, index) => {
                        _this.$set(item, 'typeid', "0");
                        _this.$set(item, 'type', "变化检测");
                        _this.$set(item, 'iseditor', false);
                    })
                    _this.allData = oehis.data.records.concat(odhis.data.records.concat(ochis.data.records.concat(cdhis.data.records)))
                    _this.tempData = _this.allData
                    _this.getTabelData2()
                    console.log(_this.allData)

                }))

        }
    },
    created() {
        this.userID = localStorage.getItem("ID")
        this.projectID = localStorage.getItem("proid")
        this.getalldata()

    },
    mounted() {
        // this.tempData = this.tableData











    }

};
</script>

<style scoped>
.el-table-filter__list li:first-child {
    display: none;
}

#searchdiv {
    /* left: 78em; */
    /* position: relative; */
    margin-top: 10px;
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
</style>

