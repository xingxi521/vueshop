<template>
    <el-tree
    :props="props"
    :load="loadNode"
    lazy
    @node-click="clickHandler"
    >
    </el-tree>
</template>
<script>
export default {
    name:'ProductTree',
    data(){
        return{
            props:{
                label:'name',//对应数据库里类目的名称字段名
                children: 'zones'
            }
        }
    },
    methods: {
        /**
         * 懒加载处理
         */
        loadNode(node, resolve){
            if(node.level === 0){
                this.$api.productCategoryRequest().then(res=>{
                    if(res.data.status == 200){
                        resolve(res.data.data);
                    }else{
                        this.$message.error(res.data.msg);
                        resolve([]);
                    }
                })
            }
            if(node.level >=1){
                this.$api.productCategoryRequest({
                    id:node.data.cid
                }).then(res=>{
                    if(res.data.status == 200){
                        resolve(res.data.data);
                    }else{
                        this.$message.error(res.data.msg);
                        resolve([]);
                    }
                })
            }
        },
        /**
         * 回传选中类目给调用的组件
         */
        clickHandler(data){
            this.$emit('onCategoryData',data);
        }
    },
}
</script>
