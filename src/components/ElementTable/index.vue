<template>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
    >
        <slot></slot>
    </el-table>
</template>
<script>
export default {
    // 这里是为了展示一下可以对element的一些组件进行二次封装
    name:'ElementTable',
    props:{
        tableData:{
            type:Array,
            default:function(){
                return [];
            }
        }
    }
}
</script>