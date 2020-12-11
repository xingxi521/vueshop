<template>
    <div>
        <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
    </div>
</template>
<script>
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
    name:'Ueditor',
    data(){
        return{
            msg:'',
            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 240,
                // 初始容器宽度
                initialFrameWidth: '80%',
                // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！部署在国外的服务器，如果无法访问，请自备梯子）
                // serverUrl: 'http://35.201.165.105:8000/controller.php',
                // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                UEDITOR_HOME_URL: '/UEditor/'
            }
        }
    },
    components:{
        VueUeditorWrap
    },
    watch: {
        msg(value){
            this.$emit('onUeditorHandler',value);
        }
    },
    mounted() {
        this.msg = this.content;
    },
    props:{
        content:{
            type:String,
            default:''
        }
    }
}
</script>