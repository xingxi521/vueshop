<template>
    <div id="classified-tree-main" v-if="show">
        <el-tree
        :props="props"
        :load="loadNode"
        lazy
        :render-content="renderContent"
        :highlight-current="true"
        @node-click="nodeClickHandler"
        >
        </el-tree>
        <el-dialog
            title="添加分类"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <el-input v-model="classifiedName" placeholder="请输入分类名字"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureHandler">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改分类"
            :visible.sync="dialogUpdateVisible"
            width="30%"
        >
            <el-input v-model="classifiedUpName" placeholder="请输入分类名字"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureUpdateHandler">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'ClassifiedTree',
    data(){
        return{
            props:{
                label: 'name',
                children: 'children',
            },
            dialogVisible:false,
            dialogUpdateVisible:false,
            classifiedName:'',
            classifiedUpName:'',
            nodeData:{},
            nodeUpdateData:{},
            show:true
        }
    },
    methods: {
        http(id,resolve){
            this.$api.classifiedDataRequest({
                id:id
            }).then(res=>{
                if(res.data.status == 200){
                    return resolve(res.data.data);
                }else{
                    return resolve([]);
                }
            }).catch(error=>{
                return resolve([]);
            });
        },
        loadNode(node, resolve){
            if(node.level === 0){
                this.http(1,resolve);
            }
            if(node.level >= 1){
                this.http(node.data.pid,resolve);
            }
        },
        renderContent(h, { node, data, store }) {
            return (
            <span class="custom-tree-node">
                <span>{node.label}</span>
                <span>
                <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
                <el-button size="mini" type="text" on-click={ () => this.update(node,data) }>修改</el-button>
                <el-button size="mini" type="text" on-click={ () => this.remove(node,data) }>删除</el-button>
                </span>
            </span>);
        },
        /**
         * 添加
         */
        append(data){
            this.dialogVisible = true;
            this.nodeData = data;
        },
        /**
         * 修改
         */
        update(node, data){
            this.dialogUpdateVisible = true;
            this.nodeUpdateData = data;
        },
        /**
         * 删除
         */
        remove(node, data){
            this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.classifiedNavDeleteRequest({
                    pid:data.pid
                }).then(res=>{
                    if(res.data.status == 200){
                        this.$message.success(res.data.msg);
                        this.reload();
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
         * 提交添加分类
         */
        sureHandler(){
            if(this.classifiedName && this.nodeData){
                this.$api.classifiedNavAddRequest({
                    id:this.nodeData.pid,
                    name:this.classifiedName
                }).then(res=>{
                    if(res.data.status == 200){
                        this.$message.success(res.data.msg);
                        this.dialogVisible = false;
                        this.reload();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            }else{
                this.$message.error("请输入内容后再进行修改");
            }
        },
        reload(){
            this.show = false;
            this.$nextTick(()=>this.show=true);
        },
        /**
         * 提交修改
         */
        sureUpdateHandler(){
            if(this.classifiedUpName && this.nodeUpdateData){
                this.$api.classifiedUpdateRequest({
                    pid:this.nodeUpdateData.pid,
                    name:this.classifiedUpName
                }).then(res=>{
                    if(res.data.status == 200){
                        this.$message.success(res.data.msg);
                        this.dialogUpdateVisible = false;
                        this.reload();
                    }else{
                        this.$message.error(res.data.msg);
                    }
                })
            }else{
                this.$message.error("请输入内容后再进行修改");
            }
        },
        /**
         * 点击节点事件
         */
        nodeClickHandler(data){
            this.$bus.$emit('classifiedNavData',data);
        }
    },
}
</script>
<style lang="less">
    #classified-tree-main{
        .custom-tree-node{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
        }
    }
</style>