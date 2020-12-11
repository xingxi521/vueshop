<template>
    <div class="add-params-main">
        <div class="add-params-bar">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/product' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/params' }">规格参数</el-breadcrumb-item>
                <el-breadcrumb-item>添加规格参数</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="add-params-content">
            <div class="add-params-btn">
                <el-button type='primary' @click="addGroupHandler">添加分组</el-button>
            </div>
            <div class="add-params-form">
                <el-form :modle="dynamicForm" ref="dynamicForm" label-width="100px">
                    <el-form-item :label="'规格参数'+index+':'" v-for="(group,index) in dynamicForm.paramsArr" :key="index" >
                        <el-input v-model="dynamicForm.paramsArr[index].paramsName"></el-input>
                        <el-button @click.prevent="addChildHandler(index)">添加子规格</el-button>
                        <div class="add-params-child-main" v-for="(child,idx) in dynamicForm.paramsArr[index].children" :key="idx">
                            <el-input v-model="dynamicForm.paramsArr[index].children[idx].childName" size="small" placeholder="请输入子规格参数名称"></el-input>
                            <el-button type="danger" size="small" @click="childDeleteHandler(index,idx)">删除</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">添加</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'AddParams',
    data(){
        return{
            dynamicForm:{
                paramsArr:[
                    {
                        paramsName:'',
                        children:[
                            {
                                childName:''
                            }
                        ]
                    }
                ]
            }
        }
    },
    methods: {
        /**
         * 添加分组
         */
        addGroupHandler(){
            //思路：因为上面视图层是用的v-for那么就直接往数组里push一个就可以生成一个新的item了
            this.dynamicForm.paramsArr.push({
                paramsName:'',
                children:[]
            })
        },
        /**
         * 添加子分类
         */
        addChildHandler(index){
            this.dynamicForm.paramsArr[index].children.push({
                childName:''
            });
        },
        /**
         * 删除子分类
         */
        childDeleteHandler(index,idx){
            this.dynamicForm.paramsArr[index].children.splice(idx,1);
        },
        /**
         * 提交添加
         */
        submitForm(){
            this.$api.paramsAddRequest({
                cid:this.$route.params.cid,
                paramData:JSON.stringify(this.dynamicForm.paramsArr)
            }).then(res=>{
                if(res.data.status == 200){
                    this.$message.success(res.data.msg);
                    this.$router.push('/params');
                }else{
                    this.$message.error(res.data.msg);
                }
            });
        }
    },
}
</script>
<style lang="less" scoped>
    .add-params-main{
        padding: 10px 0 0 0;
        .add-params-bar{
            padding: 10px;
            border-bottom: 1px solid #f5f5f5;
        }
        .add-params-content{
            margin-top: 20px;
            margin-left: 10px;
            .add-params-btn{
                margin-bottom: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #f5f5f5;
            }
            .add-params-form{
                width: 100%;
                .el-input{
                    margin-right: 10px;
                    width: 400px;
                    vertical-align: top;
                }
                .add-params-child-main{
                    margin-left: 20px;
                    margin-top: 5px;
                    .el-input{
                        width: 380px;
                    }
                }
            }
        }
    }
</style>