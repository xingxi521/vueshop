<template>
    <el-upload
    class="upload-demo"
    ref="upload"
    action="http://localhost:3000/api/upload"
    :on-success="uploadSuccessHandler"
    :file-list="fileList"
    :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    </el-upload>
</template>
<script>
export default {
    name:'Upload',
    data(){
        return{
            fileList:[]
        }
    },
    methods: {
        uploadSuccessHandler(response, file, fileList){
            this.$emit('onUploadHandler',response);
        },
        submitUpload(){
            this.$refs.upload.submit();
        }
    },
}
</script>