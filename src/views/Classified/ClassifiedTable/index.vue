<template>
    <div class="classified-table-main">
        <div class="classified-table-addBtn">
            <el-button type="primary" v-if="this.classifiedNavData.pid" @click="addHandler">添加{{this.classifiedNavData.name}}数据</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column align="center" label="ID" prop="id"></el-table-column>
            <el-table-column align="center" label="广告名称" prop="name"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip label="链接地址" prop="url"></el-table-column>
            <el-table-column align="center" show-overflow-tooltip label="图片地址" prop="image"></el-table-column>
            <el-table-column
            label="操作"
            width="100"
            align="center"
            >
            <template slot-scope="scope">
                <el-button @click="deleteHandler(scope.$index,scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="添加分类数据"
            :visible.sync="dialogAddVisible"
            width="30%"
        >
            <el-input v-model="submitData.name" placeholder="请输入广告名称"></el-input>
            <el-input v-model="submitData.image" placeholder="请输入图片地址"></el-input>
            <el-input v-model="submitData.link" placeholder="请输入跳转链接"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureAddHandler">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'ClassifiedTable',
    data(){
        return{
            tableData:[],
            classifiedNavData:{},
            submitData:{},
            dialogAddVisible:false
        }
    },
    mounted() {
        this.$bus.$on("classifiedNavData",classifiedNavData=>{
            if(this.classifiedNavData == classifiedNavData){
                return
            }else{
                this.classifiedNavData = classifiedNavData;
                this.http(classifiedNavData.pid);
            }
        });
    },
    methods: {
        /**
         * 请求表格数据
         */
        http(pid){
            this.$api.classifiedTableDataRequest({
                pid
            }).then(res=>{
                if(res.data.status == 200){
                    this.tableData = res.data.data;
                }else{
                    this.tableData = [];
                    // this.$message.error('暂无数据');
                }
            });
        },
        /**
         * 删除事件
         */
        deleteHandler(index,row){
            this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.classifiedTableDeleteRequest({
                    id:row.id
                }).then(res=>{
                    if(res.data.status == 200){
                        this.$message.success(res.data.msg);
                        this.http(this.classifiedNavData.pid);
                    }else{
                        this.$message.error(res.data.msg);
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
         * 添加事件
         */
        addHandler(){
            this.dialogAddVisible = true;
        },
        /**
         * 确定提交添加事件
         */
        sureAddHandler(){
            if(this.submitData.name && this.submitData.link && this.submitData.image && this.classifiedNavData.pid){
                this.$api.classifiedTableAddRequest({
                    name:this.submitData.name,
                    link:this.submitData.link,
                    image:this.submitData.image,
                    pid:this.classifiedNavData.pid
                }).then(res=>{
                    if(res.data.status == 200){
                        this.$message.success(res.data.msg);
                        this.http(this.classifiedNavData.pid);
                        this.dialogAddVisible = false;
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            }else{
                this.$message.error('请填写好相关选择，再进行添加。');
            }
        }
    },
}
</script>
<style lang="less" scoped>
    .classified-table-main{
        .classified-table-addBtn{
            padding: 5px 0 10px 10px;
            border-bottom: 1px solid #f5f5f5;
        }
    }
</style>