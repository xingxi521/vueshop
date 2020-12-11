<template>
    <div id="params-list-main">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/product' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>规格参数</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="add-params">
            <el-button type="primary" size="medium" @click="addParamsHandler">添加规格参数</el-button>
            <el-dialog
                title="类目选择"
                :visible.sync="paramsVisible"
                width="40%"
            >
                <CateGory @onCategoryData="getCategoryData"/>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="paramsVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitHandler">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="params-table">
            <element-table :tableData="paramsData">
                <el-table-column prop="id" align="center" label="规格参数ID" width="150"></el-table-column>
                <el-table-column prop="itemCatId" align="center" label="分类ID" width="150"></el-table-column>
                <el-table-column prop="paramData" align="center" label="规格参数结构" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" align="center" width='200'>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </element-table>
        </div>
        <div class="params-pagination">
            <Pagination @changePageEvent="changePageHandler" :total="total"/>
        </div>
    </div>
</template>
<script>
import ElementTable from '../../../components/ElementTable'
import Pagination from '../../../components/Pagination'
import CateGory from './CategoryTree'
export default {
    name:'ParamsList',
    components:{
        ElementTable,
        Pagination,
        CateGory
    },
    data(){
        return{
            paramsData:[],
            total:0,
            currenPage:1,
            paramsVisible:false,
            cateGoryCid:null
        }
    },
    mounted() {
        this.paramsHttp(1);
        this.$api.paramsCountRequest().then(res=>{
            if(res.data.status == 200){
                this.total = res.data.total;
            }else{
                this.$message.error('获取总条数失败，请联系管理员！');
            }
        });
    },
    methods: {
        /**
         * 规格参数数据网络请求
         */
        paramsHttp(page){
            this.$api.paramsRequest({
                page:page
            }).then(res=>{
                if(res.data.status == 200){
                    this.paramsData = res.data.data;
                    this.currenPage = page;
                }else{
                    this.$message.error(res.data.msg);
                }
            })
        },
        /**
         * 编辑
         */
        handleEdit(index,row){},
        /**
         * 删除
         */
        handleDelete(index,row){
            this.$confirm('此操作将永久删除该规格参数, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.paramsDeleteRequest({
                    id:row.id
                }).then(res=>{
                    if(res.data.status == 200){
                        this.$message({
                            type: 'success',
                            message: res.data.msg
                        });
                        this.paramsHttp(this.currenPage);
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        });
                    }
                });                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        /**
         * 页码切换回调函数
         */
        changePageHandler(page){
            this.paramsHttp(page);//根据页码请求对应的数据
        },
        /**
         * 打开添加规格参数对话框
         */
        addParamsHandler(){
            this.paramsVisible = true;
        },
        /**
         * 回传类目数据
         */
        getCategoryData(data){
            this.cateGoryCid = data.cid;
        },
        /**
         * 选择好类目确定添加规格参数
         */
        submitHandler(){
            if(this.cateGoryCid){
                this.paramsVisible = false;
                this.$router.push('/addparams/'+this.cateGoryCid);
                this.cateGoryCid = null;
            }else{
                this.$message.error('请先选择好类目，再进行添加！');
                this.cateGoryCid = null;
            }

        }
    },
}
</script>
<style lang="less" scoped>
    #params-list-main{
        padding: 20px;
        .params-table{
            margin-top: 15px;
        }
        .add-params{
            margin-top: 10px;
            border-top: 1px solid #f5f5f5;
            padding-top: 10px;
        }
        .params-pagination{
            text-align: center;
            margin-top: 10px;
        }
    }
</style>