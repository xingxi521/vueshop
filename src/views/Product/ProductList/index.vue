<template>
    <div id="product-list-main">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/product' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品查询</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="add-shop">
            <el-button type="primary" size="medium" @click="addShopHandler">添加商品</el-button>
        </div>
        <div class="list-table">
            <element-table :tableData="productData">
                <el-table-column prop="id"  align="center" label="商品ID" width="150"></el-table-column>
                <el-table-column prop="title" align="center" label="商品名称" width="150"></el-table-column>
                <el-table-column prop="image" show-overflow-tooltip align="center" label="商品图片" width="200"></el-table-column>
                <el-table-column prop="sellPoint" show-overflow-tooltip align="center" label="商品卖点" width="250"></el-table-column>
                <el-table-column prop="price" show-overflow-tooltip align="center" label="商品价格" width="100"></el-table-column>
                <el-table-column prop="num" show-overflow-tooltip align="center" label="商品数量" width="100"></el-table-column>
                <el-table-column prop="descs" show-overflow-tooltip align="center" label="商品描述" width="400"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </element-table>
        </div>
        <div class="list-pagination">
            <Pagination @changePageEvent="changePageHandler" :total="total"/>
        </div>
    </div>
</template>
<script>
import ElementTable from '../../../components/ElementTable'
import Pagination from '../../../components/Pagination'
export default {
    name:'ProductList',
    components:{
        ElementTable,
        Pagination
    },
    data(){
        return{
            productData:[],
            currenPage:1,
            total:0
        }
    },
    mounted() {
        this.productRequest(this.currenPage);
        this.$api.productCountRequest().then(res=>{
            if(res.data.status == 200){
                this.total = res.data.total;
            }else{
                this.$message.error('获取总条数失败，请联系管理员！');
            }
        });
    },
    methods: {
        /**
         * 封装请求商品数据
         */
        productRequest(page){
            this.$api.productQueryRequest({
                page:page
            }).then(res=>{
                if(res.data.status == 200){
                    this.productData = res.data.data;
                    this.currenPage = page;
                }else{
                    this.$message.error(res.data.msg);
                }
            });
        },
        //切换页码触发函数
        changePageHandler(page){
            this.productRequest(page);//根据页码请求对应的数据
        },
        //编辑
        handleEdit(index,row){
            this.$router.push('/editorshop/'+row.id);
        },
        //删除
        handleDelete(index,row){
            this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.productDeleteRequest({
                    id:row.id
                }).then(res=>{
                    if(res.data.status == 200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.productRequest(this.currenPage);
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
        //跳转到添加商品页面
        addShopHandler(){
            this.$router.push('/addshop');
        }
    },
}
</script>
<style lang="less" scoped>
    #product-list-main{
        padding: 20px;
        .list-table{
            margin-top: 15px;
        }
        .list-pagination{
            text-align: center;
            margin-top: 10px;
        }
        .add-shop{
            margin-top: 10px;
            border-top: 1px solid #f5f5f5;
            padding-top: 10px;
        }
    }
</style>