<template>
    <div class="classified-main">
        <div class="classified-bar">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/product' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>分类管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="classified-content">
            <div class="classified-content-left">
                <ClassifiedTree/>
            </div>
            <div class="classified-content-right">
                <ClassifiedTable/>
            </div>
        </div>
    </div>
</template>
<script>
import ClassifiedTree from './ClassifiedTree'
import ClassifiedTable from './ClassifiedTable'
export default {
    name:'Classified',
    components:{
        ClassifiedTree,
        ClassifiedTable
    }
}
</script>
<style lang="less" scoped>
    .classified-main{
        padding: 10px 0 0 0;
        .classified-bar{
            padding: 10px;
            border-bottom: 1px solid #f5f5f5;
        }
        .classified-content{
            margin-top: 10px;
            .classified-content-left,.classified-content-right{
                float: left;
            }
            .classified-content-left{
                padding: 0 10px;
                border-right: 1px solid #f5f5f5;
                width: 20%;
            }
            .classified-content-right{
                width: 78%;
            }
        }
    }
</style>