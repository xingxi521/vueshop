<template>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
    >
    </el-pagination>
</template>
<script>
export default {
    name:'ProductPagination',
    methods: {
        handleCurrentChange(page){
            this.$emit('changePageEvent',page);
        }
    },
    props:{
        total:{
            type:Number,
            default:0
        }
    }
}
</script>